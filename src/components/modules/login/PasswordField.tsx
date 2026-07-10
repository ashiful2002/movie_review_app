"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface PasswordFieldProps {
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export function PasswordField({ register, error }: PasswordFieldProps) {
  return (
    <Field>
      <div className="flex items-center">
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <a
          href="#"
          className="ml-auto text-sm underline-offset-4 hover:underline"
        >
          Forgot password?
        </a>
      </div>

      <Input id="password" type="password" {...register} />

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </Field>
  );
}
