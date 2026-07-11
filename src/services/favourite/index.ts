"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const getFavourite = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${BASE_URL}/favourite`, {
      headers: {
        Authorization: token || "",
      },
      next: {
        tags: [CACHE_TAGS.FAVOURITE],
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

export const addToFavourite = async (movieId: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${BASE_URL}/favourite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
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
    revalidateTag(CACHE_TAGS.FAVOURITE, {});

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const removeFromfavourite = async (movieId: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${BASE_URL}/favourite/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: token || "",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message,
      };
    }
    revalidateTag(CACHE_TAGS.FAVOURITE, {});

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
