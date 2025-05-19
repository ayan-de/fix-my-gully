"use client";

import { Info, LogIn, Menu } from "lucide-react"; // You can swap icons
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LoginButton } from "@/components/auth/login-button";

const Sidenavbar = () => {
  //hooks to track navbar
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Sidebar (Desktop only) */}
      <div className="h-screen w-64 bg-gray-900 text-white fixed top-0 left-0 p-4 border-r border-gray-700 hidden md:block">
        {/* Logo + Branding */}
        <div className="flex items-center gap-7 mb-10">
          <Image src="/logo.svg" alt="FixMyGully logo" width={28} height={28} />
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
          {/* <Link
            href="/auth/login"
            className="flex items-center gap-2 hover:text-yellow-300"
          > */}
          <div className="flex items-center gap-2 hover:text-yellow-300">
            <LogIn size={20} />
            {/* <LoginButton mode="modal" asChild> */}
            <LoginButton>
              <span>Login</span>
            </LoginButton>
          </div>
          {/* </Link> */}
          <Link
            href="/settings"
            className="flex items-center gap-2 hover:text-yellow-300"
          >
            <LogIn size={20} />
            <span>Dashboard</span>
          </Link>
        </nav>
      </div>

      {/* Mobile Top Navbar */}
      <div className="md:hidden w-full z-51 bg-gray-900 text-white p-4 flex items-center justify-between fixed top-0 left-0 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="FixMyGully logo" width={24} height={24} />
          <span className="font-bold text-yellow-400">FixMyGully</span>
        </div>
        <button onClick={() => setOpen(!open)} className="text-yellow-400">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="absolute z-52 top-14 left-0 w-full bg-gray-800 text-white p-4 flex flex-row justify-evenly gap-4  md:hidden">
          <Link
            href="/about"
            className="flex items-center gap-2 hover:text-yellow-300"
          >
            <Info size={20} />
            <span>About</span>
          </Link>
          <Link
            href="/auth/login"
            className="flex items-center gap-2 hover:text-yellow-300"
          >
            <LogIn size={20} />
            <span>Login</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-2 hover:text-yellow-300"
          >
            <LogIn size={20} />
            <span>Dashboard</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default Sidenavbar;
