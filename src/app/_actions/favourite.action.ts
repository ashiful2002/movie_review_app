"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;
export async function addToFavouriteAction(movieId: string) {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(`${BASE_URL}/favourite`, {
    method: "POST",
    headers: {
      Authorization: token ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movieId }),
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: data.message,
    };
  }

  revalidateTag("favourite", {});

  return data;
} 


