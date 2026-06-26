"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

export type FilterValues = Record<string, string>;

type UseQueryFiltersOptions = {
  keys: string[];
  debounce?: number;
};

export const useQueryFilters = ({ keys, debounce = 200 }: UseQueryFiltersOptions) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const initialValues = keys.reduce<FilterValues>((acc, key) => {
    acc[key] = searchParams.get(key) ?? "";
    return acc;
  }, {});

  const [filters, setFilters] = useState<FilterValues>(initialValues);


  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pushToUrl = (values: FilterValues) => {
    const params = new URLSearchParams(searchParams.toString());

    // Apply managed keys
    keys.forEach((key) => {
      const val = values[key];
      if (val) {
        params.set(key, val);
      } else {
        params.delete(key);
      }
    });

    // Always reset to page 1 when filters change
    params.set("page", "1");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Debounced effect — fires whenever `filters` state changes
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      pushToUrl(filters);
    }, debounce);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [filters]);

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const updateFilterImmediate = (key: string, value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const next = { ...filters, [key]: value };
    setFilters(next);
    pushToUrl(next);
  };

  const clearFilter = (key: string) => {
    updateFilterImmediate(key, "");
  };

  const clearAll = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const cleared = keys.reduce<FilterValues>((acc, key) => {
      acc[key] = "";
      return acc;
    }, {});
    setFilters(cleared);
    pushToUrl(cleared);
  };

  const hasActiveFilters = keys.some((key) => !!filters[key]);

  return {
    filters,
    updateFilter,
    updateFilterImmediate,
    clearFilter,
    clearAll,
    hasActiveFilters,
    isPending,
  };
};
