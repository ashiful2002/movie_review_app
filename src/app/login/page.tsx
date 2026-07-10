"use client";

import { LoginForm } from "@/components/modules/login/LoginForm";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      toast.error(`Login failed: ${decodeURIComponent(error)}`);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>{" "}
    </div>
  );
}
