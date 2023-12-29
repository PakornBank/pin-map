import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  try {
    const query = new URL(request.url).searchParams;
    console.log(query.get("category"));
    const category = query.get("category");
    if (!category) {
      const data = await sql`SELECT * FROM pins`;
      return Response.json(data.rows);
    }
    const data = await sql`SELECT * FROM pins WHERE category = ${category}`;
    return Response.json(data.rows);
  } catch (error) {
    return Response.json([]);
  }
}
