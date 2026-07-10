 import { cookies } from "next/headers";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
  name?: string;
  role: "ADMIN" | "USER" | "SUPER_ADMIN";
  avatar?: string | null;
  isPremium?: boolean;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        { authenticated: false, message: "No token found" },
        { status: 401 }
      );
    }

    const decoded = jwtDecode<DecodedToken>(token);

    return Response.json({
      authenticated: true,
      user: {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
        avatar: decoded.avatar,
        isPremium: decoded.isPremium,
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return Response.json(
      { authenticated: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}
