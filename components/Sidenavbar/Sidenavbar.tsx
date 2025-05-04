import { Info, LogIn } from "lucide-react"; // You can swap icons
import Image from "next/image";
import Link from "next/link";

const Sidenavbar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed top-0 left-0 p-4 border-r border-gray-700">
      {/* Logo + Branding */}
      <div className="flex items-center gap-7 mb-10 ">
        <Image
          src="/logo.svg" // Place your logo icon in /public
          alt="FixMyGully logo"
          width={28}
          height={28}
        />
        <span className="text-xl font-bold text-yellow-400">FixMyGully</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-6">
        <Link
          href="/about"
          className="flex items-center gap-2 hover:text-yellow-300"
        >
          <Info size={20} />
          <span>About</span>
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-2 hover:text-yellow-300"
        >
          <LogIn size={20} />
          <span>Login</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidenavbar;
