// import BorderLayout from "@/components/BorderLayout";
import Searchbar from "@/components/Searchbar";
import Sidenavbar from "@/components/Sidenavbar/Sidenavbar";

export default function Home() {
  return (
    <div>
      {/* <BorderLayout> */}
      <Sidenavbar />
      <h1 className="text-white text-2xl">Hello FixMyGali</h1>
      <Searchbar />
      {/* </BorderLayout> */}
    </div>
  );
}
