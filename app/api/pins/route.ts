import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function GET(request: Request) {
  noStore();
  try {
    const query = new URL(request.url).searchParams;
    const category = query.get("category");
    if (!category) {
      const data =
        await sql`SELECT pins.*, users.name FROM pins INNER JOIN users ON pins.user_id = users.id;`;
      return Response.json(data.rows);
    }
    const data = await sql`SELECT pins.*, users.name FROM pins INNER JOIN 
    users ON pins.user_id = users.id WHERE category = ${category}`;
    return Response.json(data.rows);
  } catch (error) {
    return Response.json([]);
  }
}
