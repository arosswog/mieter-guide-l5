import Link from "next/link";
import ShoppingMap from "@/components/shopping-map";
import { getLanguageFromSearchParams, withLanguage } from "@/lib/language";

const HOUSE = {
  name: "Haus Lange Str. 5",
  address: "Lange-Str. 5, 71640 Ludwigsburg, Deutschland",
  lat: 48.89596,
  lng: 9.18902,
};

const SHOPPING_LOCATIONS = [
  { id: "bakery-troelsch", name: "Bäckerei Trölsch", category: "Bäcker", lat: 48.89654, lng: 9.18754 },
  { id: "metzgerei-prister", name: "Metzgerei Prister", category: "Metzger", lat: 48.89712, lng: 9.1912 },
  { id: "rewe", name: "REWE", category: "Supermarkt", lat: 48.8938, lng: 9.19235 },
  { id: "aldi-sued", name: "ALDI SÜD", category: "Discounter", lat: 48.89267, lng: 9.18695 },
  { id: "lidl", name: "Lidl", category: "Discounter", lat: 48.90034, lng: 9.18485 },
  { id: "dm", name: "dm-drogerie markt", category: "Drogerie", lat: 48.89445, lng: 9.18588 },
  { id: "denns-biomarkt", name: "denn's Biomarkt", category: "Biomarkt", lat: 48.89918, lng: 9.19262 },
  { id: "wochenmarkt-ludwigsburg", name: "Wochenmarkt Ludwigsburg", category: "Markt", lat: 48.89866, lng: 9.18195 },
];

const EARTH_RADIUS_METERS = 6_371_000; // Earth's radius: 6,371 km in meters

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
          Rund um die Lange Straße 5 finden Sie schnell alles für den Alltag.
          Unten sehen Sie das Haus und wichtige Einrichtungen direkt auf der
          Karte.
        </p>

        <section className="mt-8 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-stone-200 md:p-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
            Karte & Übersicht
          </p>
          <p className="mt-2 text-sm text-stone-600">
            Standort: {HOUSE.address}
          </p>
          <div className="mt-4">
            <ShoppingMap house={HOUSE} locations={LOCATIONS_WITH_DISTANCE} />
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-stone-200 md:p-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Einrichtungen in der Nähe
          </h2>
          <ul className="mt-4 space-y-3">
            {LOCATIONS_WITH_DISTANCE.map((location) => (
              <li
                key={location.id}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-stone-900">{location.name}</p>
                    <p className="text-sm text-stone-600">{location.category}</p>
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
        </section>
      </div>
    </main>
  );
}
