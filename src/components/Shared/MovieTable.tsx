"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface WatchlistItem {
  id: string;
  movieId: string;
  createdAt: string;
  movie: {
    id: string;
    title: string;
    thumbnail: string;
    releaseYear: number;
    rating: number;
    imdbRating: number;
  };
}

interface MovieTableProps {
  items: WatchlistItem[];
  onRemove: (movieId: string) => Promise<{ success: boolean }>;
  emptyMessage?: string;
  isLoading?: boolean;
}

export function MovieTable({
  items,
  onRemove,
  emptyMessage = "No movies found",
  isLoading = false,
}: MovieTableProps) {
  console.log(items);

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handleRemove = async (movieId: string, title: string) => {
    try {
      setLoadingId(movieId);
      const res = await onRemove(movieId);

      if (res?.success) {
        toast.success(`${title} removed`, { position: "top-center" });
        router.refresh();
      } else {
        toast.error("Failed to remove", { position: "top-center" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full">
        <thead className="bg-muted px-20">
          <tr className="">
            <th className="px-5 py-3 text-left text-sm font-semibold">
              Thumbnail
            </th>
            <th className="px-5 py-3 text-left text-sm font-semibold">Movie</th>
            <th className="px-5 py-3 text-left text-sm font-semibold">Year</th>
            <th className="px-5 py-3 text-left text-sm font-semibold">
              Rating
            </th>
            <th className="px-5 py-3 text-right text-sm font-semibold">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t hover:bg-muted/50 transition">
              {/* Thumbnail */}
              <td className="px-5 py-4">
                <div className="relative h-20 w-14 overflow-hidden rounded">
                  <Image
                    src={item.movie.thumbnail}
                    alt={item.movie.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 56px, 56px"
                  />
                </div>
              </td>

              {/* Title */}
              <td className="px-5 py-4 font-medium">
                <p className="line-clamp-2">{item.movie.title}</p>
              </td>

              {/* Year */}
              <td className="px-5 py-4 text-sm text-muted-foreground">
                {item.movie.releaseYear}
              </td>

              {/* Rating */}
              <td className="px-5 py-4">
                <span className="inline-flex items-center gap-1">
                  <span>⭐</span>
                  <span className="font-medium">
                    {item.movie?.imdbRating
                      ? item.movie.imdbRating.toFixed(1)
                      : "N/A"}
                  </span>
                </span>
              </td>

              {/* Action */}
              <td className="px-5 py-4 text-right">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleRemove(item.movieId, item.movie.title)}
                  disabled={loadingId === item.movieId || isLoading}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {loadingId === item.movieId ? "Removing..." : "Remove"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
