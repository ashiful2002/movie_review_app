"use client";

import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";

interface ToggleFieldProps {
  control: any;
  name: string;
  label: string;
  description?: string;
}

export default function ToggleField({
  control,
  name,
  label,
  description,
}: ToggleFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex items-center justify-between p-4  ">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>

          <Button
            type="button"
            onClick={() => field.onChange(!field.value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              field.value ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                field.value ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </Button>
        </div>
      )}
    />
  );
}
