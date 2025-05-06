// import BorderLayout from "@/components/BorderLayout";
"use client";

import Map from "@/components/Map";
import Searchbar from "@/components/Searchbar";
import Sidenavbar from "@/components/Sidenavbar/Sidenavbar";

export default function Home() {
  // return (
  //   <div className="flex h-screen">
  //     <div className=" bg-slate-900 text-white">
  //       <Sidenavbar />
  //     </div>
  //     <div className="flex-1 flex flex-col relative">
  //       <Searchbar />
  //       <div className="flex-1">
  //         <Map />
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-black">
      <Sidenavbar />
      <div className="flex flex-col">
        <Searchbar />
        <Map />
      </div>
    </div>
  );
}
