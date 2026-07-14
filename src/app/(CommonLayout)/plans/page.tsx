import SubscriptionPlanCard from "@/components/modules/Subscriptions/card/SubscriptionPlanCard";
import { getSubscriptionPlans } from "@/services/subscriptions";

const page = async () => {
  const { data: plans } = await getSubscriptionPlans();
  if (!plans) {
    return <div>no plans found</div>;
  }
  return (
    <div>
      <div className="container mx-auto bg-muted/20 p-6 md:p-10 flex justify-center">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </div>
  );
};

export default page;
