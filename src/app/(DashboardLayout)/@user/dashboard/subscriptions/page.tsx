import SubscriptionPlanCard from "@/components/modules/Subscriptions/card/SubscriptionPlanCard";
import { getSubscriptionPlans } from "@/services/subscriptions";

export const dynamic = "force-dynamic";

const page = async () => {
  let plans: any[] = [];

  try {
    const res = await getSubscriptionPlans();
    plans = res?.data ?? [];
  } catch (error) {
    console.error("Failed to load subscription plans:", error);
  }

  if (!plans.length) {
    return <div>Unable to load subscriptions.</div>;
  }

  return (
    <div className="min-h-screen bg-muted/20 p-6 md:p-10 flex justify-center">
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan: any) => (
          <SubscriptionPlanCard
            key={plan.id}
            id={plan.id}
            name={plan.name}
            price={plan.price}
            duration={plan.duration}
            description={plan.description}
            stripePriceId={plan.stripePriceId}
          />
        ))}
      </div>
    </div>
  );
};

export default page;