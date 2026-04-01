"use client";

import { useState, useEffect } from "react";
import { getWatchlist, getWatchlistCount } from "@/services/watchlist";
import type { WatchlistItem } from "@/services/watchlist";
import { WatchlistTable } from "./Table";

const WatchlistPage = () => {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load watchlist from localStorage
    const watchlistItems = getWatchlist();
    setItems(watchlistItems);
    setIsLoading(false);
  }, []);

  const handleRemoveMovie = (movieId: string) => {
    // Update local state after removing from localStorage
    setItems(items.filter((item) => item.id !== movieId));
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          My Watchlist
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {items.length} {items.length === 1 ? "item" : "items"} in your
          watchlist
        </p>
      </div>

      <WatchlistTable items={items} onRemove={handleRemoveMovie} />
    </div>
  );
};

export default WatchlistPage;
