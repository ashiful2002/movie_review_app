"use client";


import { toast } from "sonner";
import { useRouter } from "next/navigation";
 import { WatchlistRow } from "./WatchListRow";
import { useState } from "react";
import { removeFromWatchlist } from "@/app/_actions/watchlist.actions";

interface WatchlistItem {
  id: string;
  movieId: string;
  createdAt: string;
  movie: {
    id: string;
    title: string;
    thumbnail: string;
    releaseYear: number;
    rating: number;
  };
}

interface Props {
  items: WatchlistItem[];
}

export function CommonTable({ watchlistMovies }: any) {
  const [isloading, setIsLoading] = useState(false)
  const items = watchlistMovies;


  const router = useRouter();

  const handleRemove = async (
    movieId: string,
    title: string
  ) => {
    try {
      const res = await removeFromWatchlist(movieId);

      if (res?.success) {
        toast.success(`${title} removed from watchlist`);
        setIsLoading(true)
        router.refresh();
        setIsLoading(false)
      } else {
        toast.error("Failed to remove movie");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };


  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-5 py-3 text-left">Poster</th>
            <th className="px-5 py-3 text-left">Movie</th>
            <th className="px-5 py-3 text-left">Year</th>
            <th className="px-5 py-3 text-left">Rating</th>
            <th className="px-5 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {items?.map((item: any) => (
            <WatchlistRow
              key={item.id}
              item={item}
              onRemove={handleRemove}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}