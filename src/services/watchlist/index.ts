// services/watchlist/index.ts

export interface WatchlistItem {
  id: string;
  title: string;
  poster: string;
}

const WATCHLIST_KEY = "watchlist";

/**
 * Get all items from watchlist
 */
export const getWatchlist = (): WatchlistItem[] => {
  try {
    const watchlist = localStorage.getItem(WATCHLIST_KEY) || "[]";
    return JSON.parse(watchlist);
  } catch (error) {
    console.error("Failed to get watchlist:", error);
    return [];
  }
};

/**
 * Add item to watchlist
 */
export const addToWatchlist = (movie: any): boolean => {
  try {
    const watchlist = getWatchlist();
    const exists = watchlist.find((item) => item.id === movie.id);

    if (exists) {
      return false; // Already exists
    }

    watchlist.push({
      id: movie.id,
      title: movie.title,
      poster: movie.thumbnail,
    });

    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
    return true; // Successfully added
  } catch (error) {
    console.error("Failed to add to watchlist:", error);
    throw error;
  }
};

/**
 * Remove item from watchlist
 */
export const removeFromWatchlist = (movieId: string): boolean => {
  try {
    const watchlist = getWatchlist();
    const filtered = watchlist.filter((item) => item.id !== movieId);

    if (filtered.length === watchlist.length) {
      return false; // Item not found
    }

    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(filtered));
    return true; // Successfully removed
  } catch (error) {
    console.error("Failed to remove from watchlist:", error);
    throw error;
  }
};

/**
 * Check if movie is in watchlist
 */
export const isInWatchlist = (movieId: string): boolean => {
  try {
    const watchlist = getWatchlist();
    return watchlist.some((item) => item.id === movieId);
  } catch (error) {
    console.error("Failed to check watchlist:", error);
    return false;
  }
};

/**
 * Clear entire watchlist
 */
export const clearWatchlist = (): void => {
  try {
    localStorage.removeItem(WATCHLIST_KEY);
  } catch (error) {
    console.error("Failed to clear watchlist:", error);
    throw error;
  }
};

/**
 * Get watchlist count
 */
export const getWatchlistCount = (): number => {
  return getWatchlist().length;
};