"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const createReviews = async (payload: any) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("Authentication token not found. Please log in.");
    }

    const res = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      cache: "no-store",
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message);
    }

    revalidateTag(`movie-${payload.movieId}`, {});
    revalidateTag("movies", {});

    return result;
  } catch (error: any) {
    console.error("REAL ERROR:", error);
    throw new Error(error.message);
  }
};


export const getReviews = async (payload: any) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("Authentication token not found. Please log in.");
    }

    const res = await fetch(`${BASE_URL}/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      cache: "no-store",
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message);
    }

    revalidateTag(`movie-${payload.movieId}`, {});
    revalidateTag("movies", {});

    return result;
  } catch (error: any) {
    console.error("REAL ERROR:", error);
    throw new Error(error.message);
  }
};
