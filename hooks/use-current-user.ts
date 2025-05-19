//The useSession() React Hook in the NextAuth.js client is the easiest way to check if someone is signed in.
//Make sure that <SessionProvider> is added to pages/_app.js.
import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
    const session = useSession();    
    
    return session.data?.user;
}