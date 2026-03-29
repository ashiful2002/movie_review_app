// =========================
// Example: MealsFilter.tsx (now reusable)
// =========================
"use client";

import { FilterInput } from "./FilterInput";
import { FilterGroup } from "./FilterGroup";
import { useFilters } from "@/hooks/useFilters";

const MovieFilter = () => {
  const { filters, updateFilter } = useFilters([
    "name",
    "minPrice",
    "maxPrice",
  ]);

  return (
    <FilterGroup>
      <FilterInput
        type="number"
        placeholder="Min price"
        value={filters.minPrice}
        onChange={(v) => updateFilter("minPrice", v)}
        className="w-[140px]"
      />

      <FilterInput
        type="number"
        placeholder="Max price"
        value={filters.maxPrice}
        onChange={(v) => updateFilter("maxPrice", v)}
        className="w-[140px]"
      />

      <FilterInput
        placeholder="Search meals..."
        value={filters.name}
        onChange={(v) => updateFilter("name", v)}
        className="w-[250px]"
      />
    </FilterGroup>
  );
};

export default MovieFilter;
