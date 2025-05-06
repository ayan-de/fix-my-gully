"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { v4 as uuidv4 } from "uuid";

type MarkerType = {
  id: string;
  geocode: [number, number];
  popUp: string;
};

// create custom icon
const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: "/logo.svg",
  iconSize: [38, 38], // size of the icon
});

// markers
const markers: MarkerType[] = [
  {
    id: uuidv4(),
    geocode: [22.5016, 88.3209],
    popUp: "Behala",
  },
  {
    id: uuidv4(),
    geocode: [22.5958, 88.2636],
    popUp: "Howrah",
  },
  {
    id: uuidv4(),
    geocode: [22.8963, 88.2461],
    popUp: "Hoogly",
  },
];

const Map = () => {
  return (
    // <div className="border w-full h-full">
    <div className="flex-1 md:ml-64 overflow-hidden border absolute ">
      <MapContainer
        center={[22.5744, 88.3629]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
