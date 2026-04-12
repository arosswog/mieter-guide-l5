"use client";

import { useState } from "react";
import { CircleF, GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from "@react-google-maps/api";

type HouseLocation = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

type ShoppingLocation = {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  distanceMeters: number;
};

type ShoppingMapProps = {
  house: HouseLocation;
  locations: ShoppingLocation[];
  radiusMeters: number;
};

const markerColors: Record<string, string> = {
  Bäcker: "#f97316",
  Metzger: "#dc2626",
  Supermarkt: "#16a34a",
  Discounter: "#2563eb",
  Drogerie: "#7c3aed",
  Biomarkt: "#15803d",
  Markt: "#ca8a04",
};

const createCircleMarkerIcon = (fillColor: string, strokeColor: string, scale: number) => ({
  path: 0 as google.maps.SymbolPath,
  scale,
  fillColor,
  fillOpacity: 0.9,
  strokeColor,
  strokeWeight: 2,
});

export default function ShoppingMap({
  house,
  locations,
  radiusMeters,
}: ShoppingMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [activeMarkerId, setActiveMarkerId] = useState<string | "house" | null>(null);
  const { isLoaded, loadError } = useJsApiLoader({
    id: "shopping-map-script",
    googleMapsApiKey: apiKey ?? "",
  });

  if (!apiKey) {
    return (
      <div className="flex h-[420px] w-full items-center justify-center rounded-2xl bg-stone-100 px-6 text-center text-sm text-stone-600 shadow-sm">
        Google Maps kann nicht geladen werden: Bitte setzen Sie zur Build-Zeit die Umgebungsvariable
        {" "}
        <code className="rounded bg-stone-200 px-1 py-0.5 text-xs">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>.
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex h-[420px] w-full items-center justify-center rounded-2xl bg-stone-100 px-6 text-center text-sm text-stone-600 shadow-sm">
        Google Maps konnte nicht geladen werden.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-[420px] w-full items-center justify-center rounded-2xl bg-stone-100 px-6 text-center text-sm text-stone-600 shadow-sm">
        Karte wird geladen…
      </div>
    );
  }

  return (
    <GoogleMap
      center={{ lat: house.lat, lng: house.lng }}
      zoom={18}
      options={{
        scrollwheel: false,
        mapTypeControl: false,
        streetViewControl: false,
      }}
      mapContainerClassName="h-[420px] w-full rounded-2xl shadow-sm"
    >
      <CircleF
        center={{ lat: house.lat, lng: house.lng }}
        radius={radiusMeters}
        options={{
          strokeColor: "#0f766e",
          fillColor: "#14b8a6",
          fillOpacity: 0.12,
          strokeWeight: 2,
        }}
      />

      <MarkerF
        position={{ lat: house.lat, lng: house.lng }}
        icon={createCircleMarkerIcon("#14b8a6", "#0f766e", 9)}
        onClick={() => setActiveMarkerId("house")}
      />
      {activeMarkerId === "house" ? (
        <InfoWindowF
          position={{ lat: house.lat, lng: house.lng }}
          onCloseClick={() => setActiveMarkerId(null)}
        >
          <div>
            <strong>{house.name}</strong>
            <br />
            {house.address}
          </div>
        </InfoWindowF>
      ) : null}

      {locations.map((location) => (
        <MarkerF
          key={location.id}
          position={{ lat: location.lat, lng: location.lng }}
          icon={createCircleMarkerIcon(
            markerColors[location.category] ?? "#64748b",
            markerColors[location.category] ?? "#475569",
            7,
          )}
          onClick={() => setActiveMarkerId(location.id)}
        />
      ))}

      {locations.map((location) =>
        activeMarkerId === location.id ? (
          <InfoWindowF
            key={`${location.id}-info`}
            position={{ lat: location.lat, lng: location.lng }}
            onCloseClick={() => setActiveMarkerId(null)}
          >
            <div>
              <strong>{location.name}</strong>
              <br />
              {location.category}
              <br />
              ca. {location.distanceMeters} m entfernt
            </div>
          </InfoWindowF>
        ) : null,
      )}
    </GoogleMap>
  );
}
