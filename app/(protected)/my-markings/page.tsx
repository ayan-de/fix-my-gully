"use client";

import { currentUser } from "@/lib/auth";

const MarkingsPage = async () => {
  //using session in client component
  const user = await currentUser();

  return (
    <div className="bg-white p-10 rounded-xl">
      {JSON.stringify(user)}
      {/* <button className="cursor-pointer" onClick={onClick} type="submit">
        Sign out
      </button> */}
    </div>
  );
};

export default MarkingsPage;
