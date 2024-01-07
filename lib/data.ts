import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

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

export async function fetchPinsData(
  category: string | null,
  user: string | null,
  pin_name: string | null
) {
  noStore();
  try {
    const res = await fetch(`/api/pins`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: category,
        user: user,
        pin_name: pin_name,
      }),
    });
    const pins = await res.json();
    return pins;
  } catch (error) {
    console.error("Failed to fetch pins:", error);
  }
}

export async function fetchCategories() {
  noStore();
  try {
    const res = await fetch(`/api/category`, { cache: "no-store" });
    const data = await res.json();
    const categories = data.map((category: { category: string }) => {
      return category.category;
    });
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories", error);
  }
}

export async function fetchUsers() {
  noStore();
  try {
    const res = await fetch(`/api/user`, { cache: "no-store" });
    const data = await res.json();
    const users = data.map((user: { name: string }) => {
      return user.name;
    });
    return users;
  } catch (error) {
    console.error("Failed to fetch users", error);
  }
}

export async function fetchPinsList(
  category: string | null,
  user: string | null,
  pin_name: string | null
) {
  noStore();
  try {
    const res = await fetch(`/api/pinsList`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: category,
        user: user,
        pin_name: pin_name,
      }),
    });
    const pins = await res.json();
    const pinsList = pins.map((pin: { pin_name: string }) => {
      return pin.pin_name;
    });
    return pinsList;
  } catch (error) {
    console.error("Failed to fetch pins:", error);
  }
}
