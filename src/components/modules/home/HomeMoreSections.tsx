import FloatingChatbot from "@/components/Shared/FloatingChatbot";
import { FeaturedMovies } from "./FeaturedMovies";
import GenreSection from "./Genre/GenreSection";
import { SubscriptionPlans } from "./SubscriptionPlans";
import { Testimonials } from "./Testimonials";
import MovieSection from "./MovieSection";
import HeroCarousel from "./HeroCarousel";

export default function AdvancedHomeSections() {
  return (
    <>
      <HeroCarousel />
      <MovieSection />
      <FloatingChatbot />
      <GenreSection />
      <FeaturedMovies />
      <SubscriptionPlans />
      <Testimonials />
    </>
  );
}
