import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { findUserByEmail } from "@/app/lib/data";
import { createUser } from "@/app/lib/actions";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }): Promise<string | boolean> {
      if (account?.provider === "github") {
        const email = user.email;
        let existingUser = await findUserByEmail(email ?? "");
        if (!existingUser) {
          console.log("Creating user:", email);
          existingUser = await createUser(
            email ?? "",
            user.name ?? "",
            user.image ?? ""
          );
        }
        if (existingUser) {
          console.log("User found:", existingUser);
          user.id = existingUser.id;
          return true;
        }
      }
      console.log("Failed to sign in:", user);
      return false;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
