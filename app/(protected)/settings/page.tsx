"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
// import { logout } from "@/actions/logout";
import { signOut } from "next-auth/react";

const SettingPage = () => {
  //using session in client component
  const user = useCurrentUser();

  const onClick = () => {
    // logout();
    signOut();
  };

  return (
    <div className="bg-white p-0 rounded-xl">
      <button
        className="cursor-pointer bg-black text-white px-4 py-2 rounded-md hover:text-yellow-500 transition-colors duration-200"
        onClick={onClick}
        type="submit"
      >
        Sign out
      </button>
    </div>
  );
};

export default SettingPage;
