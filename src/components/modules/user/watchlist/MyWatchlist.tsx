
import { removeFromWatchlist } from "@/app/_actions/watchlist.actions";
import { MovieTable } from "@/components/Shared/MovieTable";
import { getWatchlist } from "@/services/watchlist";

const MyWatchlist = async () => {
  const result = await getWatchlist();
  const watchlistMovies = result?.data ?? [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          My Watchlist
        </h1>
        <p className="text-muted-foreground">
          {watchlistMovies.length} movie
          {watchlistMovies.length !== 1 ? "s" : ""} saved
        </p>
      </div>

      <MovieTable
        items={watchlistMovies}
        onRemove={removeFromWatchlist}
        emptyMessage="Your watchlist is empty. Add movies to get started!"
      />
    </div>
  );
};

export default MyWatchlist;
