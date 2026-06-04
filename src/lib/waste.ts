export type WasteType = "BT" | "RT" | "PT" | "LT" | "GT" | "UNKNOWN";

export const WASTE_TYPE_ORDER: WasteType[] = ["RT", "BT", "PT", "LT", "GT", "UNKNOWN"];

export type WasteEvent = {
  /** Detected waste category. */
  wasteType: WasteType;
  /** Local pickup date as YYYY-MM-DD (date only, no timezone shift). */
  date: string;
  /** Original calendar summary as provided by the AVL. */
  summary: string;
};

// AVL Ludwigsburg waste calendar (ICS) for the Lange Str. 5 address.
// Can be overridden via the AVL_ICS_URL environment variable.
const DEFAULT_AVL_ICS_URL =
  "https://kundenportal.avl-lb.de/WasteManagementLudwigsburg/WasteManagementServiceServlet?ApplicationName=Calendar&SubmitAction=sync&StandortID=984025001&AboID=551488&Fra=BT;RT;PT;LT;GT";

function detectWasteType(summary: string): WasteType {
  const upper = summary.toUpperCase();

  if (upper.includes("BIO")) return "BT";
  if (upper.includes("REST")) return "RT";
  if (upper.includes("PAPIER") || upper.includes("PAPPE")) return "PT";
  if (
    upper.includes("LEICHT") ||
    upper.includes("VERPACKUNG") ||
    upper.includes("GELBE") ||
    upper.includes("GELBER")
  )
    return "LT";
  if (upper.includes("GRUEN") || upper.includes("GRÜN") || upper.includes("GLAS")) return "GT";

  return "UNKNOWN";
}

function toLocalDateString(year: number, month: number, day: number): string {
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

/**
 * Parses an iCalendar DTSTART value into {date, ms}.
 * Supports date-only (YYYYMMDD) and date-time (YYYYMMDDTHHMMSS[Z]) values.
 */
function parseICalDate(value: string): { date: string; ms: number } | null {
  const cleaned = value.trim();
  const match = cleaned.match(/^(\d{4})(\d{2})(\d{2})/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!month || !day) return null;

  // Use local midnight so the displayed calendar day is stable regardless of timezone.
  const ms = new Date(year, month - 1, day).getTime();
  if (Number.isNaN(ms)) return null;

  return { date: toLocalDateString(year, month, day), ms };
}

/**
 * Unfolds RFC 5545 line folding (continuation lines start with a space or tab).
 */
function unfoldIcs(text: string): string {
  return text.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "");
}

/**
 * Fetches and parses the AVL waste calendar, returning all pickup events that
 * fall within the next `withinDays` days (today inclusive), sorted ascending.
 */
export async function getWasteEvents(withinDays = 60): Promise<WasteEvent[]> {
  const url = process.env.AVL_ICS_URL || DEFAULT_AVL_ICS_URL;

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to fetch AVL calendar: ${response.status}`);
  }

  const text = unfoldIcs(await response.text());
  const blocks = text.split("BEGIN:VEVENT").slice(1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startMs = today.getTime();
  const endMs = startMs + withinDays * 24 * 60 * 60 * 1000;

  const events = blocks
    .map((block): (WasteEvent & { ms: number }) | null => {
      const summaryMatch = block.match(/\nSUMMARY[^:\n]*:(.+)/);
      const dateMatch = block.match(/\nDTSTART[^:\n]*:([0-9TZ]+)/);

      if (!summaryMatch || !dateMatch) return null;

      const summary = summaryMatch[1].trim();
      const parsed = parseICalDate(dateMatch[1]);
      if (!parsed) return null;

      return {
        wasteType: detectWasteType(summary),
        date: parsed.date,
        summary,
        ms: parsed.ms,
      };
    })
    .filter((event): event is WasteEvent & { ms: number } => event !== null)
    .filter((event) => event.ms >= startMs && event.ms <= endMs)
    .sort((a, b) => a.ms - b.ms)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ ms, ...event }) => event);

  return events;
}
