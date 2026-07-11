import { useState } from "react";
import { ActionButton } from "./ActionButton";
import { EyeIcon, Heart } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addToFavourite } from "@/services/favourite";
import { addToFavouriteAction } from "@/app/_actions/favourite.action";

interface AddFavouriteButtonProps {
  movieId: string;
  text?: string;
}

const AddFavouriteButton = ({ movieId, text }: AddFavouriteButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddToFavourite = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await addToFavouriteAction(movieId);

      if (res.success) {
        toast.success(res.message, { position: "top-center" });
        router.refresh();
      } else {
        toast.error(res.message, { position: "top-center" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ActionButton
      size="xs"
      variant="outline"
      className=" text-yellow-400  cursor-pointer font-thin"
      icon={<Heart />}
      tooltip="click to add to your favourite movie"
      onClick={handleAddToFavourite}
    >
      {loading ? "Adding..." : text ? text : "Add to favourite"}
    </ActionButton>
  );
};

export default AddFavouriteButton;
