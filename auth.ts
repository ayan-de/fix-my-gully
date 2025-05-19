import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ///api/auth/signin(default) → redirects to /auth/login (my custom page)
  pages:{
    signIn:"/auth/login",
    error:"/auth/error",
  },
  //Sent when an account in a given provider is linked to a user in our user database. 
  //For example, when a user signs up with Twitter or when an existing user links their Google account.
  events:{
    async linkAccount({user}) {
        await db.user.update({
          where:{id: user.id},
          data: {emailVerified:new Date()}
        })
    },
  },
  callbacks: {
    //Using the signIn() method ensures the user ends back on the page they started on after completing a sign in flow. 
    //It will also handle CSRF Tokens for you automatically when signing in with email.

    async signIn({ user ,account }) {
      //Allow OAuth without email verification
    if(account?.provider !== "credentials") return true;

    const existingUser = await getUserById(user.id!);

    //Preventing signin without email verification
    if(!existingUser?.emailVerified) return false;
    //TODO:Add 2FA check
      return true;
    },
    //this is the session getting shown in /settings route
    async session({ token, session }) {
      if (token.sub && session.user) {
        //passing sub(user id from token to session)
        session.user.id = token.sub;
      }

      //passing role from token to session
      if(token.role && session.user){
        session.user.role = token.role as UserRole;
      }
      
      return session;
    },
    async jwt({ token }) {
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if(!existingUser) return token;
      token.role = existingUser.role;
      return token
    },
  },
  //telling auth.ts that we are using prismaadapter, passing the db file containing instances of PrismaClient 
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
