"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

/**
 * Get all meals
 */
// export const getAllMeals = async (params?: Record<string, any>) => {
//   const query = new URLSearchParams(params).toString();
//   try {
//     const res = await fetch(`${BASE_URL}/meals?${query}`, {
//       // next: {
//       //   tags: ["meals"],
//       // },
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch meals");
//     }

//     const result = await res.json();
//     return result;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };


export const getAllMeals = async (params?: Record<string, any>) => {
  const query = params
    ? new URLSearchParams(
        Object.entries(params).reduce((acc: Record<string, string>, [key, value]) => {
          if (value !== undefined) {
            acc[key] = String(value);
          }
          return acc;
        }, {})
      ).toString()
    : "";

  try {
    const res = await fetch(`${BASE_URL}/meals?${query}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch meals");
    }

    return res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Get featured meals
 */
// export const featuredMeals = async () => {
//   try {
//     const res = await fetch(`${BASE_URL}/meals`, {
//       next: {
//         tags: ["meals"],
//       },
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch meals");
//     }

//     const result = await res.json();

//     // Example: filter featured meals
//     const featured = result?.data?.filter((meal: any) => meal.featured);

//     return featured;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

/**
 * Get single meal
 */
export const getSingleMeal = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/meals/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch meal");
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Add new meal
 */
export const addMeal = async (payload: any) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("You are unauthorized");
  }

  try {
    const res = await fetch(`${BASE_URL}/meals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // use `Bearer ${token}` if your backend requires it
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to add meal");
    }

    // Refresh all cached meal data
    revalidateTag("meals", {});

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
