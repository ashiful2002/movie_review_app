"use client";

import { Button } from "@/components/ui/button";
import { FieldDescription } from "@/components/ui/field";
import Link from "next/link";

interface LoginFormButtonsProps {
  isSubmitting: boolean;
  onGoogleLogin: () => void;
}

export function LoginFormButtons({
  isSubmitting,
  onGoogleLogin,
}: LoginFormButtonsProps) {
  return (
    <div className="space-y-2">
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full cursor-pointer"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>

      <Button
        onClick={onGoogleLogin}
        variant="outline"
        type="button"
        className="w-full"
      >
        Login with Google
      </Button>

      <FieldDescription className="text-center">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </FieldDescription>
    </div>
  );
}
