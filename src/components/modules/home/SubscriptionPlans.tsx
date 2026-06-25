"use client";

import { Card } from "@/components/ui/card";
import { ActionButton } from "@/components/Buttons/movie/ActionButton";

const plans = [
  {
    id: "basic",
    name: "Film Explorer",
    description: "Perfect for casual movie enthusiasts",
    price: "$4.99",
    period: "/month",
    features: [
      "Access to 1,000+ movies",
      "HD streaming",
      "1 device at a time",
      "Ad-supported",
      "Standard customer support",
    ],
    cta: "Get Started",
    recommended: false,
  },
  {
    id: "pro",
    name: "Cinema Premium",
    description: "For serious film critics and daily watchers",
    price: "$12.99",
    period: "/month",
    features: [
      "Access to 5,000+ movies",
      "4K streaming",
      "4 devices simultaneously",
      "Ad-free experience",
      "Priority customer support",
      "Exclusive curated collections",
      "Early access to new releases",
    ],
    cta: "Start Free Trial",
    recommended: true,
  },
  {
    id: "studio",
    name: "Studio Pass",
    description: "Ultimate cinephile experience",
    price: "$19.99",
    period: "/month",
    features: [
      "Unlimited movie access",
      "8K streaming",
      "Unlimited devices",
      "Ad-free forever",
      "Concierge support",
      "Exclusive director&apos;s cuts",
      "Personal recommendations AI",
      "Community reviews access",
    ],
    cta: "Upgrade Now",
    recommended: false,
  },
];

export function SubscriptionPlans() {
  return (
    <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-secondary/5 via-background to-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-muted-foreground">
            Flexible subscription tiers designed for every level of movie
            passion. Start watching instantly.
          </p>
        </div>
        <div>
          <ActionButton href={"/plans"} className="cursor-pointer">
            Discover <span className="text-yellow-400">Plans</span> to Enjoy
            Exclusive Features
          </ActionButton>
        </div>
        {/* Trust Indicators */}
        <Card className="bg-secondary/20 border-secondary/40 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100K+</div>
              <p className="text-muted-foreground">Active Subscribers</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <p className="text-muted-foreground">Satisfaction Rating</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Customer Support</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
