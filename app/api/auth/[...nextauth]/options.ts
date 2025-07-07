
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { v4 as uuidv4 } from "uuid";
import { userType } from "@/lib/types";
import { getUserDetails } from "@/app/actions/supabaseFunctions";
import { supabase } from "@/utils/supabase/client";

export const options: NextAuthOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {

    async signIn({ user, account, profile }) {
      const res = await getUserDetails({ email: user.email as string });
      const userDetails: userType = res[0];

      if (!userDetails) {
        const newUser: userType = {
          user_id: uuidv4(),
          name: user.name as string,
          email: user.email as string,
          created_at: Date.now()
        }
        await supabase
          .from("users")
          .insert(newUser);

        user.id = newUser.user_id
        user.name = newUser.name
        user.email = newUser.email
      }
      else {
        user.id = userDetails.user_id
        user.name = userDetails.name
        user.email = userDetails.email
      }


      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = "user";
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

