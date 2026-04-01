"use client";

import { useState } from "react";
import { CircleDollarSign, Check } from "lucide-react";
import { toast } from "sonner";
import { ActionButton } from "@/components/Buttons/movie/ActionButton";
import { createCheckoutSession } from "@/services/payments";

interface SubscriptionPlanCardProps {
  id: string;
  name: string;
  price: number;
  duration: number;
  description?: string;
  stripePriceId?: string;
}

const formatDuration = (days: number) => {
  if (days === 365) return "Yearly";
  if (days === 30) return "Monthly";
  if (days === 7) return "Weekly";
  return `${days} days`;
};

const SubscriptionPlanCard = ({
  id,
  name,
  price,
  duration,
  description,
  stripePriceId,
}: SubscriptionPlanCardProps) => {
  const [loading, setLoading] = useState(false);

  const handleBuyPlan = async () => {
    try {
      console.log("clicked plan id", id);

      setLoading(true);
      const data = await createCheckoutSession(id);
      window.location.href = data.paymentUrl; // Redirect to Stripe Checkout
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const isPopular = duration === 365;

  return (
    <div
      className={`relative flex flex-col border rounded-2xl p-6 w-full max-w-sm shadow-md transition-all duration-300 hover:scale-105
      ${isPopular ? "border-primary shadow-xl" : "border-border"}
      `}
    >
      {/* Badge */}
      {isPopular && (
        <span className="absolute -top-3 right-4 bg-outline bg-yellow-400 text-black text-xs px-3 py-1 rounded-full">
          Best Value
        </span>
      )}

      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm text-muted-foreground">
          {formatDuration(duration)}
        </p>
      </div>

      {/* Price */}
      <div className="mb-4">
        <span className="text-3xl font-extrabold">${price}</span>
        <span className="text-muted-foreground text-sm ml-1">
          / {formatDuration(duration)}
        </span>
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      )}

      {/* Static Features (optional fallback) */}
      <ul className="mb-6 space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <Check className="text-green-500 w-4 h-4" />
          Full access
        </li>
        <li className="flex items-center gap-2">
          <Check className="text-green-500 w-4 h-4" />
          Cancel anytime
        </li>
        <li className="flex items-center gap-2">
          <Check className="text-green-500 w-4 h-4" />
          Priority support
        </li>
      </ul>

      {/* CTA */}
      <ActionButton
        size="sm"
        variant={isPopular ? "outline" : "warning"}
        onClick={handleBuyPlan}
        disabled={loading}
        icon={<CircleDollarSign />}
        className="mt-auto w-full"
      >
        {loading ? "Processing..." : "Get Started"}
      </ActionButton>
    </div>
  );
};

export default SubscriptionPlanCard;
