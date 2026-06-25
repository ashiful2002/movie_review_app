"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface EmailFieldProps {
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export function EmailField({ register, error }: EmailFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input
        id="email"
        type="email"
        placeholder="m@example.com"
        {...register}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </Field>
  );
}
