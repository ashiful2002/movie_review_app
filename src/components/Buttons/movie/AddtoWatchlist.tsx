import { EyeIcon } from "lucide-react";
import { toast } from "sonner";
import { ActionButton } from "./ActionButton";

const AddtoWatchlist = ({ movie }: any) => {
  const handleAddToWatchlist = (movie: any) => {
    try {
      const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
      const exists = watchlist.find((item: any) => item.id === movie.id);

      if (exists) {
        toast("Already in your watchlist");
      } else {
        watchlist.push({
          id: movie.id,
          title: movie.title,
          poster: movie.thumbnail,
        });
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        toast.success("Added to watchlist");
      }
    } catch (error) {
      toast.error("Failed to update watchlist");
    }
  };
  return (
    <>
      {movie.isPremium && (
        <ActionButton
          size="xs"
          variant="outline"
          onClick={() => handleAddToWatchlist(movie)}
          className="text-yellow-400 hover:bg-yellow-500"
          icon={<EyeIcon />}
        >
          Add to Watchlist
        </ActionButton>
      )}
    </>
  );
};

export default AddtoWatchlist;
