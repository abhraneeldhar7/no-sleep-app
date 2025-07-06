
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { v4 as uuidv4 } from "uuid";
import { userType } from "@/lib/types";



export const options: NextAuthOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  pages: {
    // signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {

    async signIn({ user, account, profile }) {
      
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role || "user";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

}

