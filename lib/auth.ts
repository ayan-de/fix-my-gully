import { auth } from "@/auth";
import { User } from "next-auth";


export const currentUser = async (): Promise<User | null>  => {
  const session = await auth();
  return session?.user ?? null;
};
