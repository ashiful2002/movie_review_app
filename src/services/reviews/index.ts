"use server";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const createReviews = async (payload: any) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify(payload),
    });
    console.log(res);

    if (!res.ok) {
      const error = await res.json();
      console.log("Backend error:", error);
      throw new Error(error.message);
    }

    return res.json();
  } catch (error: any) {
    console.error("🔥 REAL ERROR:", error);
  }
};

export const getReviewsByMeals = async (mealId: string) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/reviews/meal/${mealId}`, {
      method: "GET",
      headers: {
        Authorization: token!,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    return res.json();
  } catch (error: any) {
    console.log(error);
    console.log(error.message);
    // console.log(err);
  }
};

export const getSingleReview = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  try {
    const res = await fetch(`${BASE_URL}/reviews/${id}`, {
      method: "GET",
      headers: {
        Authorization: token!,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
