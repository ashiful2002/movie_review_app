import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MultiInputField({ control, name, label }: any) {
  const [input, setInput] = useState("");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Add ${label}`}
            />
            <Button
              type="button"
              onClick={() => {
                if (!input) return;
                field.onChange([...(field.value || []), input]);
                setInput("");
              }}
            >
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {field.value?.map((item: string, i: number) => (
              <span key={i} className="bg-muted px-2 py-1 rounded text-sm">
                {item}
              </span>
            ))}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
