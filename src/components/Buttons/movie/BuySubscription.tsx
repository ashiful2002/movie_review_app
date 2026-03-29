 import { CircleDollarSign } from "lucide-react";
import { toast } from "sonner";
import { ActionButton } from "./ActionButton";

const BuySubscription = ({ movie }: any) => {
  const handleByeSubscription = (movie: any) => {
    try {
      toast("clicked, subscription buying process");
      //  subscription buying process
    } catch (error) {
      toast.error("Failed to update watchlist");
    }
  };

  return (
    <ActionButton
      size="xs"
      variant="warning"
      onClick={() => handleByeSubscription(movie)}
      icon={<CircleDollarSign />}
    >
      Buy Subscription
    </ActionButton>
  );
};

export default BuySubscription;
