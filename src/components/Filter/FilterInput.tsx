
// =========================
// FilterInput.tsx
// =========================
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}

export const FilterInput = ({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "w-[200px]",
}: Props) => {
  return (
    <div className={`relative ${className}`}>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pr-8"
      />

      {value && (
        <X
          className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer text-muted-foreground hover:text-black"
          onClick={() => onChange("")}
        />
      )}
    </div>
  );
};
