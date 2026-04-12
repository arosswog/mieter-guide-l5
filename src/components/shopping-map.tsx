"use client";

import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

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

export default function ShoppingMap({ house, locations }: ShoppingMapProps) {
  return (
    <MapContainer
      center={[house.lat, house.lng]}
      zoom={14}
      scrollWheelZoom={false}
      className="h-[420px] w-full rounded-2xl shadow-sm"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <CircleMarker
        center={[house.lat, house.lng]}
        radius={11}
        pathOptions={{ color: "#0f766e", fillColor: "#14b8a6", fillOpacity: 0.9 }}
      >
        <Popup>
          <strong>{house.name}</strong>
          <br />
          {house.address}
        </Popup>
      </CircleMarker>

      {locations.map((location) => (
        <CircleMarker
          key={location.id}
          center={[location.lat, location.lng]}
          radius={8}
          pathOptions={{
            color: markerColors[location.category] ?? "#475569",
            fillColor: markerColors[location.category] ?? "#64748b",
            fillOpacity: 0.9,
          }}
        >
          <Popup>
            <strong>{location.name}</strong>
            <br />
            {location.category}
            <br />
            ca. {location.distanceMeters} m entfernt
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
