type WasteType = "BT" | "RT" | "PT" | "LT" | "GT" | "UNKNOWN";

export type WasteEvent = {
  title: string;
  wasteType: WasteType;
  date: string;
  isoDate: string;
};

const WASTE_LABELS: Record<WasteType, string> = {
  BT: "Bioabfall",
  RT: "Restmüll",
  PT: "Papier",
  LT: "Leichtverpackung",
  GT: "Grüngut / Glas",
  UNKNOWN: "Abholung",
};

function detectWasteType(summary: string): WasteType {
  const upper = summary.toUpperCase();

  if (upper.includes("BIO")) return "BT";
  if (upper.includes("REST")) return "RT";
  if (upper.includes("PAPIER")) return "PT";
  if (upper.includes("LEICHT") || upper.includes("VERPACKUNG")) return "LT";
  if (upper.includes("GRUEN") || upper.includes("GRÜN")) return "GT";
  if (upper.includes("GLAS")) return "GT";

  return "UNKNOWN";
}

function formatGermanDate(date: Date): string {
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function parseICalDate(value: string): Date | null {
  const cleaned = value.trim();
  const match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (!match) return null;

  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export async function getWasteEvents(limit = 8): Promise<WasteEvent[]> {
  const url = process.env.AVL_ICS_URL;

  if (!url) {
    throw new Error("AVL_ICS_URL is not set.");
  }

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ICS: ${response.status}`);
  }

  const text = await response.text();
  const eventsRaw = text.split("BEGIN:VEVENT").slice(1);

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const events: WasteEvent[] = eventsRaw
    .map((block) => {
      const summaryMatch = block.match(/SUMMARY[^:]*:(.+)/);
      const dateMatch = block.match(/DTSTART[^:]*:(\d{8})/);

      if (!summaryMatch || !dateMatch) return null;

      const summary = summaryMatch[1].trim();
      const date = parseICalDate(dateMatch[1]);

      if (!date) return null;

      const wasteType = detectWasteType(summary);

      return {
        title: WASTE_LABELS[wasteType],
        wasteType,
        date: formatGermanDate(date),
        isoDate: date.toISOString(),
        _dateObj: date,
      };
    })
    .filter((event): event is WasteEvent & { _dateObj: Date } => !!event)
    .filter((event) => event._dateObj >= now)
    .sort((a, b) => a._dateObj.getTime() - b._dateObj.getTime())
    .slice(0, limit)
    .map(({ _dateObj, ...event }) => event);

  return events;
}
