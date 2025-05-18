"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificaionEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  //if fields invalid
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  //if fields are not invalid we will extract the fields
  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already taken!" };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
  
  //on registering we generate verification token with that email
  const verificationToken = await generateVerificationToken(email);
  //we send verification token to that email
  await sendVerificaionEmail(verificationToken.email, verificationToken.token);

  //TODO: Send verification token email
  return { success: "Verification email sent!" };
};
