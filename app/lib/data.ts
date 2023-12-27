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
