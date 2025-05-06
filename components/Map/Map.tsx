"use client";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import { v4 as uuidv4 } from "uuid";
import MarkerClusterGroup from "react-leaflet-cluster";

interface Cluster {
  getChildCount: () => number;
}

type MarkerType = {
  id: string;
  geocode: [number, number];
  popUp: string;
};

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

const markers: MarkerType[] = [
  { id: uuidv4(), geocode: [22.5016, 88.3209], popUp: "Behala" },
  { id: uuidv4(), geocode: [22.5958, 88.2636], popUp: "Howrah" },
  { id: uuidv4(), geocode: [22.8963, 88.2461], popUp: "Hoogly" },
];

export default function MapClient() {
  return (
    <div className="flex-1 md:ml-64 overflow-hidden border absolute">
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
            <Marker key={marker.id} position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
