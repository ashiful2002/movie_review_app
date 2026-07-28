"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser, initiateGoogleLogin } from "@/services/authentication";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DemoAccountSelect } from "./DemoAccountSelect";
import { EmailField } from "./EmailField";
import { PasswordField } from "./PasswordField";
import { LoginFormButtons } from "./LoginFormButtons";
import { loginSchema } from "./login.schema";

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps extends React.ComponentProps<"div"> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleDemoSelect = (email: string, password: string) => {
    setValue("email", email);
    setValue("password", password);
  };

  const handleGoogleLogin = async () => {
    try {
      await initiateGoogleLogin();
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to initiate Google login");
    }
  };

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setServerError(null);
      setIsLoading(true);

      const result = await loginUser(data);

      if (result?.success) {
        toast.success("Login successful!", { position: "top-center" });
        router.push("/dashboard");
      } else {
        setServerError(result?.message || "Login failed");
        toast.error(result?.message || "Login failed");
      }
    } catch (error: any) {
      const errorMessage = error?.message || "An unexpected error occurred";
      setServerError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="">
        
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <DemoAccountSelect onSelectRole={handleDemoSelect} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <EmailField register={register("email")} error={errors.email} />
              <PasswordField
                register={register("password")}
                error={errors.password}
              />

              {serverError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
                  {serverError}
                </div>
              )}

              <LoginFormButtons
                isSubmitting={isSubmitting || isLoading}
                onGoogleLogin={handleGoogleLogin}
              />
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
