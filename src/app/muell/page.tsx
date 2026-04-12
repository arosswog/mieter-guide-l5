import Link from "next/link";
import { getWasteEvents } from "@/lib/waste";
import { FaLeaf, FaTrash, FaRecycle, FaGlassWhiskey, FaRegLemon } from "react-icons/fa";
import { getLanguageFromSearchParams, withLanguage } from "@/lib/language";

export const dynamic = "force-dynamic";

export default async function WastePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const language = await getLanguageFromSearchParams(searchParams);
  const events = await getWasteEvents(8);

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 text-stone-800">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href={withLanguage("/", language)}
              className="text-sm text-stone-500 transition hover:text-stone-800"
            >
              ← Zur Übersicht
            </Link>
            <p className="mt-4 text-sm uppercase tracking-[0.25em] text-stone-500">
              Apartment Guide
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">
              Müllabholung
            </h1>
            <p className="mt-2 max-w-2xl text-stone-600">
              Hier finden Sie die nächsten geplanten Abholtermine für die Adresse
              Lange Str. 5 in Ludwigsburg.
            </p>
          </div>
        </header>

        <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-stone-200">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Nächste Termine</h2>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-600">
              automatisch aktualisiert am {new Date().toLocaleDateString("de-DE")}
            </span>
          </div>

          {events.length === 0 ? (
            <p className="text-stone-600">Aktuell wurden keine Termine gefunden.</p>
          ) : (
            <div className="grid gap-4">
              {events.map((event) => {
  let icon = null;
  let color = "#888";
  if (event.wasteType === "PT") { icon = <FaRecycle className="text-2xl" style={{ color: '#22c55e' }} />; color = "#22c55e"; } // Papier grün
  else if (event.wasteType === "BT") { icon = <FaLeaf className="text-2xl" style={{ color: '#a16207' }} />; color = "#a16207"; } // Bio braun
  else if (event.wasteType === "RT") { icon = <FaTrash className="text-2xl" style={{ color: '#222' }} />; color = "#222"; } // Rest schwarz
  else if (event.wasteType === "GT") { icon = <FaGlassWhiskey className="text-2xl" style={{ color: '#2563eb' }} />; color = "#2563eb"; } // Glas blau
  else if (event.wasteType === "LT") { icon = <FaRegLemon className="text-2xl" style={{ color: '#facc15' }} />; color = "#facc15"; } // Verpackung gelb
  else { icon = <FaTrash className="text-2xl" style={{ color: '#888' }} />; }
  return (
    <div
      key={`${event.isoDate}-${event.wasteType}`}
      className="rounded-2xl border border-stone-200 bg-stone-50 p-5"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <p className="text-lg font-semibold" style={{ color }}>{event.title}</p>
        </div>
        <div className="text-sm font-medium text-stone-700">
          {event.date}
        </div>
      </div>
    </div>
  );
})}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
