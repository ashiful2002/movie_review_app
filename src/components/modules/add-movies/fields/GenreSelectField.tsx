"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export default function GenreSelectField({
  control,
  name,
  label,
  options,
}: any) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selected: string[] = field.value || [];

        const toggle = (id: string) => {
          if (selected.includes(id)) {
            field.onChange(selected.filter((i) => i !== id));
          } else {
            field.onChange([...selected, id]);
          }
        };

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="flex flex-wrap gap-2">
                {options?.map((genre: any) => (
                  <button
                    type="button"
                    key={genre.id}
                    onClick={() => toggle(genre.id)}
                    className={`px-3 py-1 rounded border cursor-pointer ${
                      selected.includes(genre.id) ? "border-yellow-400" : ""
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
