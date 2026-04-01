"use client";

import { EyeIcon } from "lucide-react";
import { toast } from "sonner";
import { ActionButton } from "./ActionButton";
import { addToWatchlist } from "@/services/watchlist";

const AddtoWatchlist = ({ movie }: any) => {
  const handleAddToWatchlist = (movie: any) => {
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
          className="text-yellow-400 hover:bg-yellow-500"
          icon={<EyeIcon />}
        >
          Add to Watchlist
        </ActionButton>
      }
    </>
  );
};

export default AddtoWatchlist;
