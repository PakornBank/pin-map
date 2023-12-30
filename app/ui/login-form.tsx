"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginForm() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  if (status === "loading") {
    return <p>Hang on there...</p>;
  }

  if (status === "authenticated") {
    return redirect("/map");
  }

  return (
    <>
      <p>Not signed in.</p>
      <button onClick={() => signIn("github")}>Sign in</button>
    </>
  );
}
