import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function POST(request: Request) {
  noStore();
  try {
    const req = await request.json();
    const category = req.category || "";
    const user = req.user || "";
    const pin_name = req.pin_name || "";
    const data = await sql`
    SELECT DISTINCT pins.pin_name
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
