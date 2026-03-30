"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

/**
 * Get all genres
 */
export const getAllGenres = async (params?: Record<string, any>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    throw new Error("You are unauthorized");
  }

  try {
    const res = await fetch(`${BASE_URL}/genres`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
    });
 
    if (!res.ok) {
      throw new Error("Failed to fetch genres");
    }

    return res.json();
  } catch (error: any) {
    console.log(error);
  }
};

/**
 * Get single genre
 */
export const getSingleGenre = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/genres/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch genre");
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Add new genre
 */
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

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to add genre");
    }

    revalidateTag("genre", {});

    return result;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * Update genre
 */
export const updateGenre = async (id: string, payload: { name?: string }) => {
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

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to update genre");
    }

    revalidateTag("genre", {});

    return result;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * Delete genre
 */
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

    if (!res.ok) {
      const result = await res.json();
      throw new Error(result.message || "Failed to delete genre");
    }

    revalidateTag("genre", {});

    return true;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
