"use client";

import "leaflet/dist/leaflet.css";
// import "leaflet.markercluster/dist/MarkerCluster.css";
// import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
//removed cluster so removed the below line
// import { Icon, divIcon, point } from "leaflet";
import { Icon } from "leaflet";

import { v4 as uuidv4 } from "uuid";
// import MarkerClusterGroup from "react-leaflet-cluster";
import Cards from "../Cards";
import PinMarkerDialog from "@/components/PinMarkerDialog";
import PinPopup from "../PinMarkerDialog/PinPopup";
// interface Cluster {
//   getChildCount: () => number;
// }

interface ClickHandlerProps {
  markMode: boolean;
  onMarkerAdded: (lat: number, lng: number) => void;
}

const customIcon = new Icon({
  iconUrl: "/marker.png",
  iconSize: [38, 38],
});

const userLocationIcon = new Icon({
  iconUrl: "/mylocation.png",
  iconSize: [28, 38],
});
// custom cluster icon
// const createClusterCustomIcon = function (cluster: Cluster) {
//   return divIcon({
//     html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
//     className: "custom-marker-cluster",
//     iconSize: point(33, 33, true),
//   });
// };

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
  const [markers, setMarkers] = useState<
    {
      lat: number;
      lng: number;
      label: string;
      imageUrl: string | null;
      id: string;
    }[]
  >([]);
  const [markMode, setMarkMode] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingCoords, setPendingCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleMarkerClick = (lat: number, lng: number) => {
    setPendingCoords({ lat, lng });
    setDialogOpen(true);
  };

  const handleDialogSave = (label: string, imageUrl: string | null) => {
    if (pendingCoords) {
      setMarkers((prev) => [
        ...prev,
        {
          ...pendingCoords,
          label,
          imageUrl,
          id: uuidv4(),
        },
      ]);
    }
    setDialogOpen(false);
    setMarkMode(false);
  };

  const toggleMarkMode = () => {
    setMarkMode((prev) => {
      const next = !prev;
      console.log(`Mark mode: ${next ? "ON" : "OFF"}`);
      return next;
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.warn("Geolocation not supported by this browser.");
    }
  }, []);

  //fetching all markers from /api/markers route and displaying on map
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const res = await fetch("/api/markers");
        if (!res.ok) throw new Error("Failed to fetch markers");
        const data = await res.json();
        setMarkers(
          data.map((m: any) => ({
            id: m.id,
            lat: m.latitude,
            lng: m.longitude,
            label: m.label,
            imageUrl: m.imageUrl || null,
          }))
        );
      } catch (err) {
        console.error("Error fetching markers:", err);
      }
    };

    fetchMarkers();
  }, []);

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
        center={userLocation ?? [22.5744, 88.3629]}
        zoom={16}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        > */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={customIcon}
          >
            <Popup minWidth={250}>
              <Cards
                imageUrl={marker.imageUrl || "/dirtyImage.webp"}
                description={marker.label}
                likes={100}
                comments={100}
              />
            </Popup>
          </Marker>
        ))}
        {/* </MarkerClusterGroup> */}
        <ClickHandler markMode={markMode} onMarkerAdded={handleMarkerClick} />
      </MapContainer>
      {/* <PinMarkerDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleDialogSave}
      /> */}
      <PinPopup
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleDialogSave}
        coords={pendingCoords}
      >
        <button style={{ display: "none" }} /> {/* Invisible trigger */}
      </PinPopup>
    </div>
  );
}
