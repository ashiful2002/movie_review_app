"use server";

import { cookies } from "next/headers";

export const addMeal = async (payload: any) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    throw new Error("you are unauthorised");
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/meals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
    });
    console.log(res);

    if (!res.ok) {
      throw new Error("Failed to fetch meals");
    }
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
  }
};

export const getAllMeals = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/meals`, {
      next: {
        revalidate: 20,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch meals");
    }
    const result = await res.json();
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getSingleMeal = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/meals/${id}`,
      {
        cache: "no-store",
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
