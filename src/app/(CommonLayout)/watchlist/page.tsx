import MyWatchlist from "@/components/modules/user/watchlist/MyWatchlist";
import { getWatchlist } from "@/services/watchlist";

const WatchlistPage = async () => {
  const { data } = await getWatchlist()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      < MyWatchlist watchlistMovies={data} />
    </div>
  );
};

export default WatchlistPage;
