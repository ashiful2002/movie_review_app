"use client";

import { EyeIcon } from "lucide-react";
import { toast } from "sonner";
import { ActionButton } from "./ActionButton";
import { addToWatchlist } from "@/services/watchlist";
import { Movie } from "@/types/movie";

const AddWatchlistButton = ({ movie }: { movie: Movie | null }) => {
  const handleAddToWatchlist = (movie: Movie | null) => {
    if (!movie) {
      return
    }
    try {
      const added = addToWatchlist(movie);

      if (!added) {
        toast("Already in your watchlist");
      } else {
        toast.success("Added to watchlist");
      }
    } catch (error) {
      toast.error("Failed to update watchlist");
    }
  };

  return (
    <>
      {
        <ActionButton
          size="xs"
          variant="outline"
          onClick={() => handleAddToWatchlist(movie)}
          className="text-yellow-400 hover:bg-yellow-500 cursor-pointer "
          icon={<EyeIcon />}
          tooltip="click to add Watchlist"
        >
          Add to Watchlist
        </ActionButton>
      }
    </>
  );
};

export default AddWatchlistButton;
