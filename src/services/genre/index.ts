"use server";

import { CACHE_TAGS } from "@/lib/cache-tags";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const getAllGenres = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/genres`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      next: {
        tags: [CACHE_TAGS.GENRES],
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
  } catch (error: any) {
    console.log(error);
  }
};

export const getGenreById = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/genres/${id}`, {
      next: {
        tags: [`genre-${id}`],
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
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const addGenre = async (payload: { name: string }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("You are unauthorized");
  }

  try {
    const res = await fetch(`${BASE_URL}/genres`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message,
      };
    }
    revalidateTag(CACHE_TAGS.GENRES, {});

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const updateGenre = async (id: string, payload: { name?: string; isActive?: boolean }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("You are unauthorized");
  }

  try {
    const res = await fetch(`${BASE_URL}/genres/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message,
      };
    }
    revalidateTag(CACHE_TAGS.GENRES, {});

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const deleteGenre = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("You are unauthorized");
  }

  try {
    const res = await fetch(`${BASE_URL}/genres/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message,
      };
    }
    revalidateTag(CACHE_TAGS.GENRES, {});

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
