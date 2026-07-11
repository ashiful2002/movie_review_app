"use client";

import { Search } from "lucide-react";

interface GenreFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: "all" | "active" | "inactive";
  onFilterChange: (value: "all" | "active" | "inactive") => void;
  filteredCount: number;
  totalCount: number;
}

export default function GenreFilters({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
  filteredCount,
  totalCount,
}: GenreFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5" />
        <input
          type="text"
          placeholder="Search genres..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <select
        value={filterStatus}
        onChange={(e) =>
          onFilterChange(e.target.value as "all" | "active" | "inactive")
        }
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
      >
        <option value="all">All Status</option>
        <option value="active">Active Only</option>
        <option value="inactive">Inactive Only</option>
      </select>

      <div className="flex items-center justify-end px-4 py-2 border border-gray-300 rounded-lg">
        <span className="text-sm text-gray-600">
          {filteredCount} of {totalCount} genres
        </span>
      </div>
    </div>
  );
}
