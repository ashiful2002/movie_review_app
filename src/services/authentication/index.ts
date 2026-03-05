"use server";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { cookies } from "next/headers";
interface DecodedToken extends JwtPayload {
  role: "ADMIN" | "CUSTOMER" | "PROVIDER";
  email: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginPayload) => {
  const cookieStore = await cookies();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Login failed");
    }

    const result = await res.json();

    if (result.success) {
      cookieStore.set("token", result.data.token);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  return jwtDecode<DecodedToken>(token);
};
// log out user
export const UserLogOut = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
};
