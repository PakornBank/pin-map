import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { findUserByEmail } from "@/app/lib/data";
import { createUser } from "@/app/lib/actions";
import { Session } from "next-auth";

// interface ExtendedUser {
//   id: string;
//   name?: string | null;
//   email?: string | null;
//   image?: string | null;
// }

// interface ExtendedSession extends Session {
//   user: ExtendedUser;
// }

const authOptions: NextAuthOptions = {
  // session: {
  //   strategy: "jwt",
  // },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log(profile);
      if (account?.provider === "github") {
        const email = user.email;
        let existingUser = await findUserByEmail(email ?? "");
        if (!existingUser) {
          // console.log("Creating user:", email);
          existingUser = await createUser(
            email ?? "",
            user.name ?? "",
            user.image ?? ""
          );
        }
        if (existingUser) {
          // console.log("User found:", existingUser);
          user.id = existingUser.id;
          return true;
        }
      }
      // console.log("Failed to sign in:", user);
      return false;
    },

    async session({ session, user }) {
      // const extendedSession = session as ExtendedSession;
      const existingUser = await findUserByEmail(session?.user?.email ?? "");
      if (existingUser) {
        session.user.id = existingUser.id;
      }
      console.log("Session user:", session.user);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
