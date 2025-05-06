"use client";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import { v4 as uuidv4 } from "uuid";
import MarkerClusterGroup from "react-leaflet-cluster";

interface Cluster {
  getChildCount: () => number;
}

interface ClickHandlerProps {
  markMode: boolean;
  onMarkerAdded: (lat: number, lng: number) => void;
}

// type MarkerType = {
//   id: string;
//   geocode: [number, number];
//   popUp: string;
// };

// type MarkerData = {
//   id: string;
//   lat: number;
//   lng: number;
//   label: string;
// };

const customIcon = new Icon({
  iconUrl: "/marker.png",
  iconSize: [38, 38],
});

// custom cluster icon
const createClusterCustomIcon = function (cluster: Cluster) {
  return divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

function ClickHandler({ markMode, onMarkerAdded }: ClickHandlerProps) {
  useMapEvents({
    click: (e) => {
      console.log("markMode:", markMode); // <-- Add this
      if (markMode) {
        console.log("Map clicked at:", e.latlng); // also helpful
        onMarkerAdded(e.latlng.lat, e.latlng.lng);
      } else {
        console.log("Mark mode is OFF");
      }
    },
  });

  return null;
}

export default function Map() {
  // const [markers, setMarkers] = useState<MarkerType[]>([
  //   { id: uuidv4(), geocode: [22.5016, 88.3209], popUp: "Behala" },
  //   { id: uuidv4(), geocode: [22.5958, 88.2636], popUp: "Howrah" },
  //   { id: uuidv4(), geocode: [22.8963, 88.2461], popUp: "Hoogly" },
  // ]);

  // function AddMarkerOnClick() {
  //   useMapEvents({
  //     click(e) {
  //       const newMarker: MarkerType = {
  //         id: uuidv4(),
  //         geocode: [e.latlng.lat, e.latlng.lng],
  //         popUp: "Custom Location",
  //       };
  //       setMarkers((prev) => [...prev, newMarker]);
  //     },
  //   });
  //   return null;
  // }

  const [markers, setMarkers] = useState<
    { lat: number; lng: number; label: string; id: string }[]
  >([]);
  const [markMode, setMarkMode] = useState(false);

  const addMarker = (lat: number, lng: number) => {
    setMarkers((prev) => [
      ...prev,
      {
        lat,
        lng,
        label: "Custom Marker",
        id: uuidv4(),
      },
    ]);
    setMarkMode(false); // auto-disable after one marker (optional)
  };

  const toggleMarkMode = () => {
    setMarkMode((prev) => {
      const next = !prev;
      console.log(`Mark mode: ${next ? "ON" : "OFF"}`);
      return next;
    });
  };

  return (
    <div className={"flex-1 md:ml-64 overflow-hidden border absolute inset-0"}>
      {/* Mark Button */}
      <div className="absolute top-15 w-full z-51 flex flex-row gap-2 justify-center lg:top-5 md:top-5">
        {/* searchbox */}
        <div className="flex lg:w-100 md:w-90">
          <form className="flex-1">
            <label htmlFor="default-search" className="sr-only">
              Search
            </label>
            <input
              type="search"
              id="default-search"
              placeholder="Search Locations..."
              className="block w-full p-4 ps-10 text-sm text-white border rounded-lg bg-gray-800"
            />
          </form>
        </div>
        {/* butotn */}
        <div className="flex ">
          <button
            onClick={toggleMarkMode}
            className={`px-4 py-2 rounded-lg text-white cursor-pointer
               ${markMode ? "bg-red-600" : "bg-yellow-600"}`}
          >
            {markMode ? "Mark Mode: ON" : "Enable Marking"}
          </button>
        </div>
      </div>

      <MapContainer
        className="markercluster-map"
        center={[22.5744, 88.3629]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={customIcon}
            >
              <Popup>{marker.label}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <ClickHandler markMode={markMode} onMarkerAdded={addMarker} />
      </MapContainer>
    </div>
  );
}
