import Link from "next/link";
import ShoppingMap from "@/components/shopping-map";
import { getLanguageFromSearchParams, withLanguage } from "@/lib/language";

const HOUSE = {
  name: "Zentrales Haus",
  address: "Zentrales Haus, Oßweil, 71640 Ludwigsburg",
  lat: 48.893725,
  lng: 9.227668,
};

const SHOPPING_LOCATIONS = [
  { id: "rewe-ossweiler-strasse", name: "REWE", category: "Supermarkt", lat: 48.8938, lng: 9.2258 },
  { id: "baeckerei-clement", name: "Bäckerei Clement", category: "Bäcker", lat: 48.89377, lng: 9.22588 },
  { id: "netto-ossweiler", name: "Netto Marken-Discount", category: "Discounter", lat: 48.89133, lng: 9.23388 },
  { id: "dm-bottwartalstrasse", name: "dm-drogerie markt", category: "Drogerie", lat: 48.89841, lng: 9.21506 },
];

const categorySymbols: Record<string, string> = {
  Bäcker: "🥖",
  Metzger: "🥩",
  Supermarkt: "🛒",
  Discounter: "🏷️",
  Drogerie: "🧴",
  Biomarkt: "🌿",
  Markt: "🧺",
};

const EARTH_RADIUS_METERS = 6_371_000; // Earth's radius in meters
const MAX_DISTANCE_METERS = 400;

function distanceInMeters(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
) {
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const dLat = toRadians(to.lat - from.lat);
  const dLng = toRadians(to.lng - from.lng);
  const fromLat = toRadians(from.lat);
  const toLat = toRadians(to.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(fromLat) * Math.cos(toLat) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(EARTH_RADIUS_METERS * c);
}

const LOCATIONS_WITH_DISTANCE = SHOPPING_LOCATIONS.map((location) => ({
  ...location,
  distanceMeters: distanceInMeters(HOUSE, location),
})).sort((a, b) => a.distanceMeters - b.distanceMeters);

const LOCATIONS_IN_RADIUS = LOCATIONS_WITH_DISTANCE.filter(
  (location) => location.distanceMeters <= MAX_DISTANCE_METERS,
);

export default async function EinkaufPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const language = await getLanguageFromSearchParams(searchParams);

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 text-stone-800">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link
          href={withLanguage("/", language)}
          className="text-sm text-stone-500 transition hover:text-stone-800"
        >
          ← Zur Übersicht
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Einkaufsmöglichkeiten
        </h1>
        <p className="mt-3 text-stone-600">
          Rund um das zentrale Haus finden Sie schnell alles für den Alltag.
          Unten sehen Sie das Haus und ausgewählte Geschäfte in der Umgebung
          direkt auf der Karte.
        </p>

        <section className="mt-8 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-stone-200 md:p-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
            Karte & Übersicht
          </p>
          <p className="mt-2 text-sm text-stone-600">
            Standort: {HOUSE.address}
          </p>
          <div className="mt-4">
            <ShoppingMap
              house={HOUSE}
              locations={LOCATIONS_IN_RADIUS}
              radiusMeters={MAX_DISTANCE_METERS}
            />
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-stone-200 md:p-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Einrichtungen im Umkreis von {MAX_DISTANCE_METERS} m
          </h2>
          {LOCATIONS_IN_RADIUS.length === 0 ? (
            <p className="mt-4 text-sm text-stone-600">
              Aktuell sind keine Geschäfte innerhalb von {MAX_DISTANCE_METERS} m
              hinterlegt.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {LOCATIONS_IN_RADIUS.map((location) => (
                <li
                  key={location.id}
                  className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-stone-900">{location.name}</p>
                      <p className="text-sm text-stone-600">
                        <span className="mr-1">
                          {categorySymbols[location.category] ?? "📍"}
                        </span>
                        <span>{location.category}</span>
                      </p>
                    </div>
                    <p className="rounded-full bg-white px-3 py-1 text-sm font-medium text-stone-800 ring-1 ring-stone-200">
                      ca. {location.distanceMeters} m
                    </p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex text-sm text-blue-700 transition hover:text-blue-900"
                  >
                    In Google Maps öffnen →
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
