"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { MarkerSchema } from "@/schemas";

export const addMarker = async (values: z.infer<typeof MarkerSchema>) => {
  const validatedFields = MarkerSchema.safeParse(values);
  if (!validatedFields.success) {
    console.log("invalid marker data");
    
    return { error: "Invalid marker data!" };
  }

  const user = await currentUser();
  if (!user?.id) {
    return { error: "Not logged in or user ID missing." };
  }

  // const { latitude, longitude, label, imageUrl } = validatedFields.data;
    const { latitude, longitude, label } = validatedFields.data;


  await db.marker.create({
    data: {
      latitude,
      longitude,
      label,
      // imageUrl: imageUrl === "" ? null : imageUrl, // handle empty string
      userId: user.id,
    },
  });

  return { success: "Marker added!" };
};
