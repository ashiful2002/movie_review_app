"use client";

import { EyeIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActionButton } from "./ActionButton";
import { addToWatchlist } from "@/app/_actions/watchlist.actions";

interface AddWatchlistButtonProps {
  movieId: string;
  text?: string;
}

const AddWatchlistButton = ({ movieId, text }: AddWatchlistButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddToWatchlist = async () => {
    setLoading(true);

    try {
      const res = await addToWatchlist(movieId);

      if (res?.success) {
        toast.success("Movie added to watchlist", { position: "top-center" });
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to add to watchlist", {
          position: "top-center",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ActionButton
      disabled={loading}
      size="xs"
      variant="outline"
      onClick={handleAddToWatchlist}
      className="cursor-pointer  text-yellow-400 font-light"
      icon={<EyeIcon className="h-4 w-4" />}
      tooltip="Add to watchlist"
    >
      {loading ? "Adding..." : text ? text : "Add to Watchlist"}
    </ActionButton>
  );
};

export default AddWatchlistButton;
