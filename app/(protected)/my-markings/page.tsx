"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
// import { logout } from "@/actions/logout";
import { signOut } from "next-auth/react";

const MarkingsPage = () => {
  //using session in client component
  const user = useCurrentUser();

  const onClick = () => {
    // logout();
    signOut();
  };

  return (
    <div className="bg-white p-10 rounded-xl">
      <button className="cursor-pointer" onClick={onClick} type="submit">
        Sign out
      </button>
    </div>
  );
};

export default MarkingsPage;
