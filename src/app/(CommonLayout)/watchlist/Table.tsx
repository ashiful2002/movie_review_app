"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { removeFromWatchlist } from "@/services/watchlist";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface WatchlistItem {
  id: string;
  title: string;
  poster: string;
}

interface WatchlistTableProps {
  items: WatchlistItem[];
  onRemove: (movieId: string) => void;
}

export const WatchlistTable = ({ items, onRemove }: WatchlistTableProps) => {
  const handleRemove = (movieId: string, title: string) => {
    try {
      const success = removeFromWatchlist(movieId);
      if (success) {
        toast.success(`Removed "${title}" from watchlist`);
        onRemove(movieId);
      }
    } catch (error) {
      toast.error("Failed to remove from watchlist");
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Your watchlist is empty</p>
        <p className="text-gray-400 text-sm mt-2">Add movies to get started!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Poster
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Title
            </th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((movie, index) => (
            <tr
              key={movie.id}
              className={`border-b border-gray-200 dark:border-gray-700 transition ${
                index % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              } hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              {/* Poster */}
              <td className="px-6 py-4">
                <div className="h-16 w-12 relative rounded overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </td>

              {/* Title */}
              <td className="px-6 py-4">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {movie.title}
                </p>
              </td>

              {/* Action */}
              <td className="px-6 py-4 text-right">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleRemove(movie.id, movie.title)}
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};