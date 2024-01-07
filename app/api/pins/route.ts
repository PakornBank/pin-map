import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function GET(request: Request) {
  noStore();
  try {
    const query = new URL(request.url).searchParams;
    const category: string = query.get("category") || "";
    const user: string = query.get("user") || "";
    const pin_name: string = query.get("pin_name") || "";
    const data = await sql`
    SELECT pins.*, users.name 
    FROM pins 
    INNER JOIN users ON pins.user_id = users.id 
    WHERE LOWER(category) LIKE LOWER(${"%" + category + "%"})
    AND LOWER(pin_name) LIKE LOWER(${"%" + pin_name + "%"})
    AND LOWER(users.name) LIKE LOWER(${"%" + user + "%"})
    `;
    return Response.json(data.rows);
  } catch (error) {
    console.error("Failed to fetch pins:", error);
    return Response.json([]);
  }
}
