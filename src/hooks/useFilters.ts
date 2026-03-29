// =========================
// useFilters.ts (hook)
// =========================
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useFilters = (keys: string[], debounce = 400) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialState = keys.reduce((acc, key) => {
    acc[key] = searchParams.get(key) || "";
    return acc;
  }, {} as Record<string, string>);

  const [filters, setFilters] = useState<Record<string, string>>(initialState);

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilter = (key: string) => {
    setFilters((prev) => ({ ...prev, [key]: "" }));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });

      router.replace(`?${params.toString()}`);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [filters, router, debounce]);

  return { filters, updateFilter, clearFilter };
};