"use server"

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const getWatchlist = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${BASE_URL}/watchlist`, {
      headers: {
        Authorization: token || "",
      },
      next: {
        tags: ["watchlist"],
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch watchlist");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addToWatchlist = async (movieId: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${BASE_URL}/watchlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
      body: JSON.stringify({ movieId }),
    });

    if (!res.ok) {
      throw new Error("Failed to add movie");
    }

    revalidateTag("watchlist", {});

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const removeFromWatchlist = async (movieId: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${BASE_URL}/watchlist/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: token || "",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to remove movie");
    }

    revalidateTag("watchlist", {});

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};