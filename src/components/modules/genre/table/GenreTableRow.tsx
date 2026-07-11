"use client";

import { CheckCircle, XCircle, Edit2, Trash2, Loader2 } from "lucide-react";
import { Genre } from "../types";

interface GenreTableRowProps {
  genre: Genre;
  isSelected: boolean;
  isDeleting: boolean;
  onToggleSelect: (id: string) => void;
  onEdit: (genre: Genre) => void;
  onDeleteRequest: (genre: Genre) => void;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function GenreTableRow({
  genre,
  isSelected,
  isDeleting,
  onToggleSelect,
  onEdit,
  onDeleteRequest,
}: GenreTableRowProps) {
  return (
    <tr className="hover:bg-gray-50/5 transition-colors">
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(genre.id)}
          className="w-4 h-4 cursor-pointer"
        />
      </td>
      <td className="px-6 py-4 font-medium">{genre.name}</td>
      <td className="px-6 py-4">
        <img
          src={genre.image}
          alt={genre.name}
          className="w-10 h-10 rounded object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%23e5e7eb' width='40' height='40'/%3E%3C/svg%3E";
          }}
        />
      </td>
      <td className="px-6 py-4">
        <span className="inline-block  px-3 py-1 rounded-full text-sm font-medium">
          {genre.movies?.length || 0}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {genre.isActive ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-700 font-medium">Active</span>
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-700 font-medium">Inactive</span>
            </>
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-sm">{formatDate(genre.createdAt)}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onEdit(genre)}
            className="inline-flex items-center gap-1 bg-transparent border border-yellow-400 text-yellow-400 hover:text-yellow-500 hover:bg-yellow-400/10 cursor-pointer px-3 py-1 rounded transition-colors"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onDeleteRequest(genre)}
            disabled={isDeleting}
            className="inline-flex items-center gap-1 bg-transparent border border-red-400 text-red-400 hover:text-red-500 hover:bg-yellow-400/10 cursor-pointer px-3 py-1 rounded transition-colors"
            title="Delete"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}
