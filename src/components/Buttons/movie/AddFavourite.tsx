import React, { useState } from "react";
import { ActionButton } from "./ActionButton";
import { EyeIcon, Heart } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addToFavourite } from "@/services/favourite";

interface AddFavouriteButtonProps {
  movieId: string;
  text?: string;
}

const AddFavouriteButton = ({ movieId, text }: AddFavouriteButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddToFavourite = async () => {
    setLoading(true);

    try {
      const res = await addToFavourite(movieId);

      if (res?.success) {
        toast.success("Movie added to favourite", { position: "top-center" });
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to add to favourite", {
          position: "top-center",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <ActionButton
      size="xs"
      variant="outline"
      className=" text-yellow-400  cursor-pointer"
      icon={<Heart />}
      tooltip="click to add to your favourite movie"
      onClick={handleAddToFavourite}
    >
      {loading ? "Adding..." : text ? text : "Add to favourite"}
    </ActionButton>
  );
};

export default AddFavouriteButton;
