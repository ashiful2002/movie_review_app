import { FeaturedMovies } from "./FeaturedMovies";
import Genre from "./Genre";
import GenreSection from "./Genre/GenreSection";
import { SubscriptionPlans } from "./SubscriptionPlans";
import { Testimonials } from "./Testimonials";

export default function AdvancedHomeSections() {
  return (
    <>
      <GenreSection />
      <FeaturedMovies />
      <SubscriptionPlans />
      <Testimonials />
    </>
  );
}
