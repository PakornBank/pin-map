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
    const updateUser =
      await sql`UPDATE users SET pin_ids = array_append(pin_ids, ${data.rows[0].id}) WHERE id = ${user_id};`;
    console.log("uploaded pin:", data.rows[0]);
    console.log("updated user:", updateUser.rows[0]);
    return data.rows[0];
  } catch (error) {
    console.error("Failed to create pin:", error);
    return null;
  }
}

export async function deletePin(pin_id: number, user_id: string) {
  try {
    const data =
      await sql`DELETE FROM pins WHERE id = ${pin_id} AND user_id = ${user_id}`;
    return data;
  } catch (error) {
    console.error("Failed to delete pin:", error);
    return null;
  }
}
