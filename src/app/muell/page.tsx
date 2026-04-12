import Link from "next/link";
import { getWasteEvents } from "@/lib/waste";

export const dynamic = "force-dynamic";

export default async function WastePage() {
  const events = await getWasteEvents(8);

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 text-stone-800">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/"
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
              automatisch aktualisiert
            </span>
          </div>

          {events.length === 0 ? (
            <p className="text-stone-600">Aktuell wurden keine Termine gefunden.</p>
          ) : (
            <div className="grid gap-4">
              {events.map((event) => (
                <div
                  key={`${event.isoDate}-${event.wasteType}`}
                  className="rounded-2xl border border-stone-200 bg-stone-50 p-5"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-lg font-semibold">{event.title}</p>
                      <p className="text-sm text-stone-500">{event.wasteType}</p>
                    </div>
                    <div className="text-sm font-medium text-stone-700">
                      {event.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
