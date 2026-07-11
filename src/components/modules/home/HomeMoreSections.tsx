import FloatingChatbot from "@/components/Shared/FloatingChatbot";
import { FeaturedMovies } from "./FeaturedMovies";
import GenreSection from "./Genre/GenreSection";
import { SubscriptionPlans } from "./SubscriptionPlans";
import { Testimonials } from "./Testimonials";

export default function AdvancedHomeSections() {
  return (
    <>
      <FloatingChatbot />
      <GenreSection />
      <FeaturedMovies />
      <SubscriptionPlans />
      <Testimonials />
    </>
  );
}
