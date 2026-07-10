"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const getAllMovies = async (params?: Record<string, any>) => {
  try {
    const query = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          query.set(key, String(value));
        }
      });
    }

    const queryString = query.toString();
    const url = queryString
      ? `${BASE_URL}/movies?${queryString}`
      : `${BASE_URL}/movies`;

    const res = await fetch(url, {
      next: { tags: ["movies"] },
    });


    if (!res.ok) throw new Error("Failed to fetch movies");
    return res.json();
  } catch (err: any) {
    console.error(err);
    return null;
  }
};

export const getSingleMovie = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/movies/${id}`, {
      next: {
        tags: [`movie-${id}`],
      },
    });
    if (!res.ok) throw new Error("Failed to fetch movie");
    return res.json();
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
};

export const addMovie = async (payload: any) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("You are unauthorized");

  try {
    const res = await fetch(`${BASE_URL}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      cache: "no-store",
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to add movie");

    revalidateTag("movies", {});

    return result;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
};
