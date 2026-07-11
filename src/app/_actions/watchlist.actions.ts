"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const addToWatchlist = async (movieId: string) => {
  try {
    const token = (await cookies()).get("token")?.value;

    const res = await fetch(`${BASE_URL}/watchlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ?? "",
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

    revalidateTag(CACHE_TAGS.WATCHLIST, {});

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const removeFromWatchlist = async (movieId: string) => {
  try {
    const token = (await cookies()).get("token")?.value;

    const res = await fetch(`${BASE_URL}/watchlist/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: token ?? "",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message,
      };
    }

    revalidateTag(CACHE_TAGS.WATCHLIST, {});

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
