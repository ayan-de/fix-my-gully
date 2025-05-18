"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[350px] shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Setting</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/my-markings" ? "default" : "outline"}
        >
          <Link href="/my-markings">My Markings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};

export default Navbar;
