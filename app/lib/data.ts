import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchPinsData() {
  noStore();
  try {
    const data = await sql`SELECT 
    pins.*, 
    users.name 
    FROM pins 
    INNER JOIN 
    users ON pins.user_id = users.id;`;
    return data.rows;
  } catch (error) {
    console.error("Failed to fetch pins:", error);
    return [];
  }
}

export async function fetchPinDataById(id: number) {
  noStore();
  try {
    const data = await sql`SELECT * FROM pins WHERE id = ${id}`;
    return data.rows[0];
  } catch (error) {
    console.error("Failed to fetch pin:", error);
    return null;
  }
}

export async function findUserByEmail(email: string) {
  noStore();
  try {
    const data = await sql`SELECT * FROM users WHERE email = ${email}`;
    return data.rows[0];
  } catch (error) {
    console.error("Failed to find user:", error);
    return null;
  }
}
