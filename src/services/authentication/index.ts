"use server";
import { User } from "@/types";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { cookies } from "next/headers";

interface DecodedToken extends JwtPayload {
  sub: string;
  role: "ADMIN" | "CUSTOMER" | "PROVIDER";
  email: string;
  name?: string;
  avatar?: string | null;
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

export const getUser = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const decoded = jwtDecode<DecodedToken>(token);

  return {
    id: decoded.sub,
    name: decoded.name ?? "User",
    email: decoded.email,
    avatar: decoded.avatar ?? null,
    role: decoded.role,
  };
};
// log out user
export const UserLogOut = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
};
