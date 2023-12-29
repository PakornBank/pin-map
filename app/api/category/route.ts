import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  try {
    const data = await sql`SELECT DISTINCT category FROM pins`;
    return Response.json(data.rows);
  } catch (error) {
    return Response.json([]);
  }
}
