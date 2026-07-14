import FloatingChatbot from "@/components/Shared/FloatingChatbot";

import GenreSection from "./Genre/GenreSection";
import { FeaturedMovies } from "./FeaturedMovies";
import { SubscriptionPlans } from "./SubscriptionPlans";
import { Testimonials } from "./Testimonials";
import RevealSection from "@/components/Shared/RevealSection";
import ParallaxWrapper from "@/components/Shared/ParallaxWrapper";
import HeroCarousel from "./HeroCarousel";
import MovieSection from "./MovieSection";

export default function AdvancedHomeSections() {
  return (
    <>
      <FloatingChatbot />
      
      <HeroCarousel />
      <MovieSection />


      <RevealSection>
        <ParallaxWrapper speed={80}>
          <GenreSection />
        </ParallaxWrapper>
      </RevealSection>

      <RevealSection delay={0.1}>
        <ParallaxWrapper speed={150}>
          <FeaturedMovies />
        </ParallaxWrapper>
      </RevealSection>

      <RevealSection delay={0.2}>
        <ParallaxWrapper speed={100}>
          <SubscriptionPlans />
        </ParallaxWrapper>
      </RevealSection>

      <RevealSection delay={0.3}>
        <ParallaxWrapper speed={180}>
          <Testimonials />
        </ParallaxWrapper>
      </RevealSection>
    </>
  );
}
