import SubscriptionPlanCard from "@/components/modules/Subscriptions/card/SubscriptionPlanCard";
import { getUser } from "@/services/authentication";
import { getSubscriptionPlans } from "@/services/subscriptions";

const page = async () => {
  const { data: plans } = await getSubscriptionPlans();
  const user = await getUser();

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
