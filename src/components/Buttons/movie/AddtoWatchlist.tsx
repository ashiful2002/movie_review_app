"use client";

import { EyeIcon, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActionButton } from "./ActionButton";
import { addToWatchlist } from "@/services/watchlist";

interface AddWatchlistButtonProps {
  movieId: string;
}

const AddWatchlistButton = ({ movieId }: AddWatchlistButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddToWatchlist = async () => {
    setLoading(true);

    try {
      const res = await addToWatchlist(movieId);

      if (res?.success) {
        toast.success("Movie added to watchlist");
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to add to watchlist");
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
      className="cursor-pointer text-yellow-400 hover:bg-yellow-500"
      icon={<EyeIcon className="h-4 w-4" />}
      tooltip="Add to watchlist"
    >
      {loading ? "Adding..." : "Add to Watchlist"}
    </ActionButton>
  );
};

export default AddWatchlistButton;