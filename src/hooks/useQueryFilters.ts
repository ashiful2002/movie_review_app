"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

export type FilterValues = Record<string, string>;

type UseQueryFiltersOptions = {
  /** Keys to manage. All other URL params are preserved as-is. */
  keys: string[];
  /** Debounce delay in ms for text inputs. Default: 400 */
  debounce?: number;
};

/**
 * Generic URL-driven filter hook.
 *
 * - Reads initial values from the current URL search params
 * - Debounces URL updates for text/number inputs
 * - Resets `page` to 1 whenever any filter changes
 * - Preserves all other URL params (e.g. `limit`) untouched
 * - Exposes `isPending` from useTransition so callers can show a loading state
 */
export const useQueryFilters = ({ keys, debounce = 400 }: UseQueryFiltersOptions) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Initialise state from URL so filters survive a page refresh / direct link
  const initialValues = keys.reduce<FilterValues>((acc, key) => {
    acc[key] = searchParams.get(key) ?? "";
    return acc;
  }, {});

  const [filters, setFilters] = useState<FilterValues>(initialValues);

  // Track if we are currently mid-debounce so we can flush immediately for
  // non-text controls (selects, toggles) when debounce is 0.
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  /** Update a single filter key */
  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  /** Immediately update a key without waiting for the debounce (useful for selects/toggles) */
  const updateFilterImmediate = (key: string, value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const next = { ...filters, [key]: value };
    setFilters(next);
    pushToUrl(next);
  };

  /** Clear a single key */
  const clearFilter = (key: string) => {
    updateFilterImmediate(key, "");
  };

  /** Reset all managed keys */
  const clearAll = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const cleared = keys.reduce<FilterValues>((acc, key) => {
      acc[key] = "";
      return acc;
    }, {});
    setFilters(cleared);
    pushToUrl(cleared);
  };

  /** Whether any filter is currently active */
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
