import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { findUserByEmail } from "@/lib/data";
import { createUser } from "@/lib/actions";

const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github") {
        const email = user.email;
        let existingUser = await findUserByEmail(email ?? "");
        if (!existingUser) {
          existingUser = await createUser(
            email ?? "",
            user.name ?? "",
            user.image ?? ""
          );
        }
        if (existingUser) {
          user.id = existingUser.id;
          return true;
        }
      }
      return false;
    },

    async session({ session, user }) {
      console.log("session", session, "user", user);
      const existingUser = await findUserByEmail(session?.user?.email ?? "");
      if (existingUser) {
        session.user.id = existingUser.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
