import { NextRequest, NextResponse } from "next/server";
import { handleGoogleCallback } from "@/services/authentication";


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const token = searchParams.get("token");
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      const errorDescription = searchParams.get("error_description") || error;
      console.error("Google OAuth error:", errorDescription);
      
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(errorDescription)}`, request.url)
      );
    }

    // If backend returned token directly
    if (token) {
      const result = await handleGoogleCallback(token);

      if (result.success) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else {
        return NextResponse.redirect(
          new URL(`/login?error=${encodeURIComponent(result.message)}`, request.url)
        );
      }
    }

    // If only code is returned, you'd need to exchange it for token
    if (code) {
      // This depends on your backend setup
      // Some backends require frontend to send code to exchange for token
      // Others handle everything server-side
      
      // For now, redirect to login with error
      return NextResponse.redirect(
        new URL("/login?error=invalid_response", request.url)
      );
    }

    return NextResponse.redirect(
      new URL("/login?error=missing_token", request.url)
    );
  } catch (error) {
    console.error("Callback route error:", error);
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent("Authentication failed")}`,
        request.url
      )
    );
  }
}
