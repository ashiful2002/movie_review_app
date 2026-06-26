"use client";

import { Controller } from "react-hook-form";
import {
  FormControl,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

interface TextAreaFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
}

export default function TextAreaField({
  control,
  name,
  label,
  placeholder = "",
  rows = 4,
}: TextAreaFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <textarea
              {...field}
              placeholder={placeholder}
              rows={rows}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
            />
          </FormControl>
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
}
