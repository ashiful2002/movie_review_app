import { FeaturedMovies } from "./FeaturedMovies";
import Genre from "./Genre";
import { SubscriptionPlans } from "./SubscriptionPlans";
import { Testimonials } from "./Testimonials";

export default function AdvancedHomeSections() {
  return (
    <>
      <FeaturedMovies />
      <Genre />
      <SubscriptionPlans />
      <Testimonials />
    </>
  );
}
