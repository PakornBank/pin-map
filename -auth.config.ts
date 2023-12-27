import type { NextAuthConfig } from "next-auth";
import { signIn } from "next-auth/react";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnMapPage = nextUrl.pathname.startsWith("/map");
      if (isOnMapPage) {
        if (isLoggedIn) {
          return true;
        }
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/map", nextUrl));
      }
      return false;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
