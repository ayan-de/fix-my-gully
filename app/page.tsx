// import BorderLayout from "@/components/BorderLayout";
import Sidenavbar from "@/components/Sidenavbar/Sidenavbar";

export default function Home() {
  return (
    <div className="md:flex">
      {/* <BorderLayout> */}
      <Sidenavbar />
      <h1 className="text-white text-2xl">Hello FixMyGali</h1>
      {/* </BorderLayout> */}
    </div>
  );
}
