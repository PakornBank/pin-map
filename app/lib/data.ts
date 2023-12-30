import { sql } from "@vercel/postgres";

export async function fetchPinsData() {
  try {
    const data = await sql`SELECT * FROM pins`;
    return data.rows;
  } catch (error) {
    console.error("Failed to fetch pins:", error);
    return [];
  }
}

export async function findUserByEmail(email: string) {
  try {
    const data = await sql`SELECT * FROM users WHERE email = ${email}`;
    return data.rows[0];
  } catch (error) {
    console.error("Failed to find user:", error);
    return null;
  }
}
