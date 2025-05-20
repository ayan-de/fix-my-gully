import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { User } from "next-auth";

const MarkingsPage = async () => {
  //using session in client component
  const user: User | null = await currentUser();

  if (!user?.id) {
    return <div>Please log in to view your markings.</div>;
  }

  // Fetch all markers where userId === current user's id
  const userMarkers = await db.marker.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="bg-white p-10 rounded-xl">
      {/* {JSON.stringify(user)} */}
      {/* <button className="cursor-pointer" onClick={onClick} type="submit">
        Sign out
      </button> */}
      <h2 className="text-xl font-bold">Your Markings</h2>
      {userMarkers.length === 0 ? (
        <p>No markers yet.</p>
      ) : (
        <ul className="space-y-2">
          {userMarkers.map((marker) => (
            <li key={marker.id} className="border p-4 rounded">
              <div>
                <strong>Label:</strong> {marker.label}
              </div>
              <div>
                <strong>Latitude:</strong> {marker.latitude}
              </div>
              <div>
                <strong>Longitude:</strong> {marker.longitude}
              </div>
              {marker.imageUrl && (
                <img
                  src={marker.imageUrl}
                  alt="Marker"
                  className="w-32 h-32 object-cover mt-2 rounded"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MarkingsPage;
