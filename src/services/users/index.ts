"use server";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;


export const getAAllUsers = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/admin/users`, {
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
  }
};

export const getSingleUser = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  try {
    const res = await fetch(`${BASE_URL}/admin/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: token!,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export async function updateUserRole(userId: string, role: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/users/${userId}/role`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify({ role }),
    }
  );

  // console.log("STATUS:", res.status);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update role");
  }

  return res.json();
}
