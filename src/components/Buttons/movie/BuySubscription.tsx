"use client";

import { CircleDollarSign } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ActionButton } from "./ActionButton";

interface BuySubscriptionProps {
  movie: any;
}

const BuySubscription = ({ movie }: BuySubscriptionProps) => {
  const router = useRouter();

  const handleBuySubscription = (movie: any) => {
    try {
      toast("Redirecting to subscription page...");
      router.push(`/plans`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to navigate to subscription page");
    }
  };

  return (
    <ActionButton
      size="xs"
      variant="warning"
      onClick={() => handleBuySubscription(movie)}
      tooltip="Buy subscription to unlock premium Features"
      className="cursor-pointer"
    >
      Buy Subscription
    </ActionButton>
  );
};

export default BuySubscription;
