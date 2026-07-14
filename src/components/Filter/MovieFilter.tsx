"use client";

import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useQueryFilters } from "@/hooks/useQueryFilters";

export type Genre = {
  id: string;
  name: string;
  slug: string;
};
type MovieFilterProps = {
  genres?: Genre[];
};

const LANGUAGES = [
  "English",
  "Hindi",
  "French",
  "Spanish",
  "Korean",
  "Japanese",
  "German",
  "Italian",
];
const AGE_RATINGS = ["G", "PG", "PG-13", "R", "NC-17"];
const STATUSES = ["released", "upcoming", "in-production"];
const SORT_OPTIONS = [
  { label: "Newest first", value: "releaseYear_desc" },
  { label: "Oldest first", value: "releaseYear_asc" },
  { label: "Highest rated", value: "rating_desc" },
  { label: "Lowest rated", value: "rating_asc" },
  // { label: "Price: Low → High", value: "price_asc" },
  // { label: "Price: High → Low", value: "price_desc" },
  { label: "Title A–Z", value: "title_asc" },
  { label: "Title Z–A", value: "title_desc" },
];

// ─── All filter keys managed by this component ───────────────────────────────
const FILTER_KEYS = [
  "search",
  "genre",
  "language",
  "ageRating",
  "status",
  "isPremium",
  "minRating",
  "maxRating",
  "minPrice",
  "maxPrice",
  "sort",
];

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
    {children}
  </span>
);

type SelectProps = {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  placeholder: string;
};

const FilterSelect = ({
  value,
  onChange,
  options,
  placeholder,
}: SelectProps) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-3 py-2
                 text-sm text-slate-200 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500
                 hover:bg-white/10 transition-colors cursor-pointer"
    >
      <option value="" className="bg-slate-900 text-slate-400">
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-slate-900">
          {o.label}
        </option>
      ))}
    </select>
    <ChevronDown
      size={14}
      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
    />
  </div>
);

type RangeProps = {
  minValue: string;
  maxValue: string;
  onMinChange: (v: string) => void;
  onMaxChange: (v: string) => void;
  minPlaceholder: string;
  maxPlaceholder: string;
};

const RangeInput = ({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  minPlaceholder,
  maxPlaceholder,
}: RangeProps) => (
  <div className="flex items-center gap-2">
    <input
      type="number"
      value={minValue}
      onChange={(e) => onMinChange(e.target.value)}
      placeholder={minPlaceholder}
      min={0}
      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200
                 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500
                 hover:bg-white/10 transition-colors"
    />
    <span className="text-slate-500 text-xs shrink-0">to</span>
    <input
      type="number"
      value={maxValue}
      onChange={(e) => onMaxChange(e.target.value)}
      placeholder={maxPlaceholder}
      min={0}
      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200
                 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500
                 hover:bg-white/10 transition-colors"
    />
  </div>
);

const MovieFilter = ({ genres = [] }: MovieFilterProps) => {
  const [expanded, setExpanded] = useState(false);

  const {
    filters,
    updateFilter,
    updateFilterImmediate,
    clearAll,
    hasActiveFilters,
    isPending,
  } = useQueryFilters({ keys: FILTER_KEYS });

  const genreOptions = genres.map((g) => ({
    label: g.name,
    value: g.slug,
  }));
  const languageOptions = LANGUAGES.map((l) => ({ label: l, value: l }));
  const ageRatingOptions = AGE_RATINGS.map((r) => ({ label: r, value: r }));
  const statusOptions = STATUSES.map((s) => ({
    label: s.charAt(0).toUpperCase() + s.slice(1),
    value: s,
  }));

  // Calculate active filter count excluding search
  const activeCount = FILTER_KEYS.filter(
    (k) => k !== "search" && !!filters[k]
  ).length;

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
      {/* ── Top bar (Search always visible full-width) ──────────────────── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 p-4">
        {/* Search input - takes full width */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 flex items-center pointer-events-none">
            <Search size={16} className="text-slate-400" />
          </div>

          <input
            type="text"
            value={filters.search || ""}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search by title, director, cast…"
            className="w-full ml-5 rounded-lg border border-white/10 bg-white/5 pl-10  pr-10 py-2.5 text-sm
                       text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2
                       focus:ring-yellow-400 hover:bg-white/10 transition-colors"
          />

          {/* Right spinner/clear indicator centered vertically */}
          <div className="absolute inset-y-0 right-3 flex items-center gap-2">
            {isPending && (
              <Loader2 size={15} className="text-indigo-400 animate-spin" />
            )}
            {filters.search && !isPending && (
              <button
                type="button"
                onClick={() => updateFilterImmediate("search", "")}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Buttons section */}
        <div className="flex items-center gap-2">
          {/* Toggle advanced filters */}
          <button
            type="button"
            onClick={() => setExpanded((p) => !p)}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 shrink-0 select-none cursor-pointer
              ${
                expanded
                  ? "bg-yellow-400 border-yellow-500 text-white shadow-lg shadow-indigo-600/30"
                  : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
          >
            <SlidersHorizontal size={14} />
            <span>Filters</span>
            {activeCount > 0 && (
              <span className="flex items-center justify-center h-4.5 w-4.5 px-1 rounded-full bg-indigo-400 text-[10px] font-bold text-white leading-none">
                {activeCount}
              </span>
            )}
          </button>

          {/* Clear all */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-red-500/30
                         bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition-all duration-200 shrink-0 select-none"
            >
              <X size={14} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Advanced panel (collapsible filters) ─────────────────────────── */}
      {expanded && (
        <div className="border-t border-white/10 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 bg-white/[0.01]">
          {/* Sort Order */}
          <div>
            <Label>Sort by</Label>
            <FilterSelect
              value={filters.sort || ""}
              onChange={(v) => updateFilterImmediate("sort", v)}
              options={SORT_OPTIONS}
              placeholder="Newest first"
            />
          </div>

          {/* Genre */}
          {genres.length > 0 && (
            <div>
              <Label>Genre</Label>
              <FilterSelect
                value={filters.genre || ""}
                onChange={(v) => updateFilterImmediate("genre", v)}
                options={genreOptions}
                placeholder="All genres"
              />
            </div>
          )}

          {/* Language */}
          <div>
            <Label>Language</Label>
            <FilterSelect
              value={filters.language || ""}
              onChange={(v) => updateFilterImmediate("language", v)}
              options={languageOptions}
              placeholder="All languages"
            />
          </div>

          {/* Age Rating */}
          {/* <div>
            <Label>Age Rating</Label>
            <FilterSelect
              value={filters.ageRating || ""}
              onChange={(v) => updateFilterImmediate("ageRating", v)}
              options={ageRatingOptions}
              placeholder="Any rating"
            />
          </div> */}

          {/* Status */}
          {/* <div>
            <Label>Status</Label>
            <FilterSelect
              value={filters.status || ""}
              onChange={(v) => updateFilterImmediate("status", v)}
              options={statusOptions}
              placeholder="Any status"
            />
          </div> */}

          {/* Rating range */}
          {/* <div>
            <Label>Rating</Label>
            <RangeInput
              minValue={filters.minRating || ""}
              maxValue={filters.maxRating || ""}
              onMinChange={(v) => updateFilter("minRating", v)}
              onMaxChange={(v) => updateFilter("maxRating", v)}
              minPlaceholder="Min (0)"
              maxPlaceholder="Max (5)"
            />
          </div> */}

          {/* Price range */}
          {/* <div>
            <Label>Price ($)</Label>
            <RangeInput
              minValue={filters.minPrice || ""}
              maxValue={filters.maxPrice || ""}
              onMinChange={(v) => updateFilter("minPrice", v)}
              onMaxChange={(v) => updateFilter("maxPrice", v)}
              minPlaceholder="Min"
              maxPlaceholder="Max"
            />
          </div> */}

          {/* Premium toggle */}
          {/* <div className="flex flex-col justify-end">
            <Label>Premium only</Label>
            <button
              type="button"
              onClick={() =>
                updateFilterImmediate("isPremium", filters.isPremium === "true" ? "" : "true")
              }
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all select-none h-[38px]
                ${filters.isPremium === "true"
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                  : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
            >
              <span
                className={`h-4 w-8 rounded-full transition-colors relative flex items-center shrink-0
                  ${filters.isPremium === "true" ? "bg-amber-500" : "bg-white/10"}`}
              >
                <span
                  className={`absolute h-3 w-3 rounded-full bg-white shadow transition-all duration-200
                    ${filters.isPremium === "true" ? "left-4" : "left-0.5"}`}
                />
              </span>
              <span className="truncate">{filters.isPremium === "true" ? "Premium" : "All"}</span>
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default MovieFilter;
