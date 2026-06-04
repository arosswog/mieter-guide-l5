// Geodaten der Restaurants und Hilfsfunktionen, um die Laufstrecke und
// Gehzeit von der Lange Str. 5, 71640 Ludwigsburg aus zu schätzen.

export const ORIGIN = {
  lat: 48.9042,
  lon: 9.2124,
  address: 'Lange Str. 5, 71640 Ludwigsburg',
};

export type RestaurantInfo = {
  lat: number;
  lon: number;
  address: string;
  icon: 'pizza' | 'beer' | 'plate';
};

// Schlüssel passen zu den Namens-Keys im messages/<locale>.json (restaurants).
export const RESTAURANTS: Record<string, RestaurantInfo> = {
  fsv: {
    lat: 48.8967,
    lon: 9.2282,
    address: 'Walter-Flex-Str. 71, 71640 Ludwigsburg-Oßweil',
    icon: 'plate',
  },
  asv: {
    lat: 48.8965,
    lon: 9.2285,
    address: 'Walter-Flex-Str. 75, 71640 Ludwigsburg-Oßweil',
    icon: 'beer',
  },
  blutsbrueder: {
    lat: 48.9066,
    lon: 9.2163,
    address: 'Hanseatenstraße 54, 71640 Ludwigsburg-Oßweil',
    icon: 'plate',
  },
  kleintier: {
    lat: 48.9084,
    lon: 9.2174,
    address: 'Poppenweilerstraße 91, 71640 Ludwigsburg-Oßweil',
    icon: 'beer',
  },
  pizzeria: {
    lat: 48.8927,
    lon: 9.2257,
    address: 'Rudolf-Greiner-Straße 6, 71640 Ludwigsburg-Oßweil',
    icon: 'pizza',
  },
};

// Luftlinie zwischen zwei Punkten (Haversine) in Metern.
function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// Umwegfaktor für reale Fußwege gegenüber der Luftlinie.
const DETOUR_FACTOR = 1.35;
// Durchschnittliche Gehgeschwindigkeit in km/h.
const WALK_SPEED_KMH = 4.8;

export type WalkEstimate = {
  km: number;
  minutes: number;
};

export function estimateWalk(info: RestaurantInfo): WalkEstimate {
  const meters =
    haversine(ORIGIN.lat, ORIGIN.lon, info.lat, info.lon) * DETOUR_FACTOR;
  const km = meters / 1000;
  const minutes = Math.max(1, Math.round((km / WALK_SPEED_KMH) * 60));
  return { km, minutes };
}

// Google-Maps Fußweg-Route von der Lange Str. 5 zum Restaurant.
export function mapsRouteUrl(info: RestaurantInfo): string {
  const params = new URLSearchParams({
    api: '1',
    origin: ORIGIN.address,
    destination: info.address,
    travelmode: 'walking',
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
