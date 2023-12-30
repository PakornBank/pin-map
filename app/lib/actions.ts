"use server";

import { sql } from "@vercel/postgres";

export async function createUser(email: string, name: string, image: string) {
  try {
    const data =
      await sql`INSERT INTO users (email, name, image) VALUES (${email}, ${name}, ${image}) RETURNING *`;
    return data.rows[0];
  } catch (error) {
    console.error("Failed to create user:", error);
    return null;
  }
}
