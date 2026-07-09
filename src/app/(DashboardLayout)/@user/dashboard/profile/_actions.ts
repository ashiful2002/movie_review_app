"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

async function getToken() {
  return (await cookies()).get("token")?.value;
}

export async function getProfile() {
  const token = await getToken();

  const res = await fetch(`${API}/users/me`, {
    headers: {
      Authorization: token ?? "",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
}
//UpdateProfilePayload
export async function updateProfile(data: any) {
  const token = await getToken();

  const res = await fetch(`${API}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ?? "",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (result.success) {
    revalidatePath("/dashboard/profile");
  }

  return result;
}
