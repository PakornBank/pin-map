import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function GET(request: Request) {
  noStore();
  try {
    const data = await sql`SELECT DISTINCT category FROM pins`;
    return Response.json(data.rows);
  } catch (error) {
    return Response.json([]);
  }
}
