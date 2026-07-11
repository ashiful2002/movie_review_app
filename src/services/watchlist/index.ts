"use server";

import { cookies } from "next/headers";
import { CACHE_TAGS } from "@/lib/cache-tags";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const getWatchlist = async () => {
  try {
    const token = (await cookies()).get("token")?.value;

    const res = await fetch(`${BASE_URL}/watchlist`, {
      headers: {
        Authorization: token ?? "",
      },
      next: {
        tags: [CACHE_TAGS.WATCHLIST],
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message,
      };
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
