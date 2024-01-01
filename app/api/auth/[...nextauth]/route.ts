import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { findUserByEmail } from "@/app/lib/data";
import { createUser } from "@/app/lib/actions";
import { Session } from "next-auth";

interface ExtendedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface ExtendedSession extends Session {
  user: ExtendedUser;
}

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }): Promise<string | boolean> {
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

    async session({ session, user }): Promise<ExtendedSession> {
      const extendedSession = session as ExtendedSession;
      const existingUser = await findUserByEmail(session?.user?.email ?? "");
      if (existingUser) {
        extendedSession.user.id = existingUser.id;
      }
      return extendedSession;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
