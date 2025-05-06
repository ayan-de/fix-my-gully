"use client";

import dynamic from "next/dynamic";

// index.tsx re-exports the actual map component with SSR turned off.
// load the map only on client
const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function MapWrapper() {
  return <Map />;
}
