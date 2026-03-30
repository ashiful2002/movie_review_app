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

      // Navigate to the subscription page with movie details
      router.push(`/dashboard/subscriptions`);
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
      icon={<CircleDollarSign />}
    >
      Buy Subscription
    </ActionButton>
  );
};

export default BuySubscription;
