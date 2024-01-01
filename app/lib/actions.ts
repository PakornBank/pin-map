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

export async function createPin({
  image_url,
  pin_name,
  category,
  is_active,
  description,
  user_id,
  latitude,
  longitude,
}: {
  image_url: string;
  pin_name: string;
  category: string;
  is_active: boolean;
  description: string;
  latitude: number;
  longitude: number;
  user_id: number;
}) {
  try {
    const data =
      await sql`INSERT INTO pins (image_url, pin_name, category, is_active, description, user_id, latitude, longitude) VALUES (${image_url}, ${pin_name}, ${category}, ${is_active}, ${description}, ${user_id}, ${latitude}, ${longitude}) RETURNING *`;
    console.log(data);
    return data.rows[0];
  } catch (error) {
    console.error("Failed to create pin:", error);
    return null;
  }
}
