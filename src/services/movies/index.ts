"use server";

 import { cookies } from "next/headers";
// services/movies.ts
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const getAllMovies = async (params?: Record<string, any>) => {
  const query = params
    ? new URLSearchParams(
        Object.entries(params).reduce((acc: Record<string, string>, [k, v]) => {
          if (v !== undefined) acc[k] = String(v);
          return acc;
        }, {})
      ).toString()
    : "";

  try {
    const res = await fetch(`${BASE_URL}/movies?${query}`); // default cache
    if (!res.ok) throw new Error("Failed to fetch movies");
    return res.json();
  } catch (err: any) {
    console.error(err);
    return null; // safe fallback
  }
};

export const getSingleMovie = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/movies/${id}`); // default cache
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
      cache: "no-store", // dynamic request required for auth
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to add movie");
    return result;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
};