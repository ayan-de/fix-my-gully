"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { MarkerSchema } from "@/schemas";

export const addMarker = async (values: z.infer<typeof MarkerSchema>) => {
  const validated = MarkerSchema.safeParse(values);
  if (!validated.success) {
    return { error: "Invalid marker data!" };
  }

  const user = await currentUser();
  if (!user?.id) {
    return { error: "Not logged in or user ID missing." };
  }

  const { latitude, longitude, label, imageUrl } = validated.data;

  await db.marker.create({
    data: {
      latitude,
      longitude,
      label,
      imageUrl,
      userId: user.id,
    },
  });

  return { success: "Marker added!" };
};
