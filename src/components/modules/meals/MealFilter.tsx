"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const MealsFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState(searchParams.get("name") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();

      if (name) params.set("name", name);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);

      router.replace(`/meals?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [name, minPrice, maxPrice, router]);

  return (
    <div className="flex items-center justify-center flex-wrap gap-4 mt-4 mb-6">
    

    {/* can open a drower and filter options on there.  */}
      {/* Min Price */}
      <div className="relative w-[140px]">
        <Input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="pr-8"
        />
        {minPrice && (
          <X
            className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer text-muted-foreground hover:text-black"
            onClick={() => setMinPrice("")}
          />
        )}
      </div>

      {/* Max Price */}
      <div className="relative w-[140px]">
        <Input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="pr-8"
        />
        {maxPrice && (
          <X
            className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer text-muted-foreground hover:text-black"
            onClick={() => setMaxPrice("")}
          />
        )}
      </div>
      {/* Search */}
      <div className="relative w-[250px]">
        <Input
          placeholder="Search meals..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="pr-8"
        />
        {name && (
          <X
            className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer text-muted-foreground hover:text-black"
            onClick={() => setName("")}
          />
        )}
      </div>
    </div>
  );
};

export default MealsFilter;
