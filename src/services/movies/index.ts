"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const getAllMovies = async (params?: Record<string, any>) => {
  const query = params
    ? new URLSearchParams(
        Object.entries(params).reduce(
          (acc: Record<string, string>, [key, value]) => {
            if (value !== undefined) {
              acc[key] = String(value);
            }
            return acc;
          },
          {}
        )
      ).toString()
    : "";

  try {
    const res = await fetch(`${BASE_URL}/movies?${query}`, {
      next: {
        revalidate: 20,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch meals");
    }

    return res.json();
  } catch (error: any) {
    console.log(error);
  }
};

export const getSingleMovie = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/movies/${id}`, {
      cache: "no-store",
    });
    // console.log(res);

    if (!res.ok) {
      throw new Error("Failed to fetch meal");
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};

/**
 * Add new movie
 */
export const addMovie = async (payload: any) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("You are unauthorized");
  }

  try {
    const res = await fetch(`${BASE_URL}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to add movie");
    }

    revalidateTag("movie", {});

    return result;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};
