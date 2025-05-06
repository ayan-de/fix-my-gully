"use client";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
  // markers

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
        <Marker position={[22.5016, 88.3209]}>
          <Popup>
            This is. <br /> Behala.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
