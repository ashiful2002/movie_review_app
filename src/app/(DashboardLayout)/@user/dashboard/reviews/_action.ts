"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

async function getToken() {
  return (await cookies()).get("token")?.value;
}

export async function getReviews() {
  const token = await getToken();

  const res = await fetch(`${API}/users/reviews`, {
    headers: {
      Authorization: token ?? "",
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: data.message,
    };
  }

  return data;
}
