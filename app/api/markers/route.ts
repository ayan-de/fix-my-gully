import { db } from "@/lib/db";

//api routes will contains all the markers
export async function GET() {
  const markers = await db.marker.findMany();
  return Response.json(markers);
}