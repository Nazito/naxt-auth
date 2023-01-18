import { login, db, register, logout } from "./../../../../firebase/firebase";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { Session } from "next-auth";
import { addDoc, collection } from "firebase/firestore";

interface ExtendedSession extends Session {
  accessToken: unknown;
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        if (credentials?.type === "register") {
          console.log(555);
          // try {
          const { user } = await register(
            credentials?.email,
            credentials?.password
          );
          console.log(333, user);
          await addDoc(collection(db, "users"), {
            _id: user.uid,
            name: credentials?.name || "Incognito",
            email: credentials?.email,
            image: null,
          });

          console.log(333, user?.uid);
          return {
            id: user?.uid,
            name: credentials?.name || "Incognito",
            email: credentials?.email,
            image: null,
          };

          // } catch (e: any) {
          //   alert(e.message);
          //   return null;
        } else {
          console.log("vvv");
          logout();
          // try {
          const { user } = await login(
            credentials?.email,
            credentials?.password
          );

          return {
            id: user?.uid,
            email: credentials?.email,
            image: null,
          };
          // } catch (e: any) {
          //   e.message;
          //   return null;
          // }
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    redirect: async (url) => {
      console.log(url);
      return "/";
      // return Promise.resolve(url);
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      (session as ExtendedSession).accessToken = token.accessToken;
      return session;
    },
  },
};
export default NextAuth(authOptions);
