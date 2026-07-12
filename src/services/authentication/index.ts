"use server";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface DecodedToken extends JwtPayload {
  id: string;
  name?: string;
  email: string;
  role: "ADMIN" | "USER" | "SUPER_ADMIN";
  avatar?: string | null;
  isPremium?: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  role: "ADMIN" | "USER" | "SUPER_ADMIN";
  avatar?: string | null;
  isPremium?: boolean;
}

export const registerUser = async (data: any): Promise<AuthResponse> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Registration failed");
    }

    return {
      success: true,
      message: "Registration successful",
    };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (data: LoginPayload): Promise<AuthResponse> => {
  const cookieStore = await cookies();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      return {
        success: false,
        message: error.message || "Login failed",
      };
    }

    const result = await res.json();

    if (result.success && result.data?.token) {
      cookieStore.set("token", result.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });

      return {
        success: true,
        message: "Login successful",
      };
    }

    return {
      success: false,
      message: "No token received from server",
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    };
  }
};

// ========== GOOGLE OAUTH LOGIN ==========

/**
 * Initiate Google OAuth login
 * Redirects to backend's Google OAuth endpoint
 */
export const initiateGoogleLogin = async () => {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API;
    const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

    if (!backendUrl) {
      throw new Error("NEXT_PUBLIC_BACKEND_API is not configured");
    }

    if (!frontendUrl) {
      throw new Error("NEXT_PUBLIC_FRONTEND_URL is not configured");
    }

    // Redirect to backend's Google OAuth endpoint
    const googleAuthUrl = `${backendUrl}/auth/login/google?redirect_uri=${frontendUrl}/auth/callback`;

    redirect(googleAuthUrl);
  } catch (error) {
    console.error("Google login initiation error:", error);
    throw error;
  }
};

/**
 * Handle Google OAuth callback
 * Called by callback route after user authenticates with Google
 */
export const handleGoogleCallback = async (
  token: string
): Promise<AuthResponse> => {
  try {
    if (!token) {
      return {
        success: false,
        message: "No token received from Google OAuth",
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return {
      success: true,
      message: "Google login successful",
    };
  } catch (error) {
    console.error("Google callback error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Google login failed",
    };
  }
};

export const getUser = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      avatar: decoded.avatar,
      isPremium: decoded.isPremium,
    };
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
};

export const checkAuth = async (): Promise<{
  authenticated: boolean;
  user?: User;
}> => {
  const user = await getUser();

  if (!user) {
    return { authenticated: false };
  }

  return { authenticated: true, user };
};

export const logoutUser = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
};