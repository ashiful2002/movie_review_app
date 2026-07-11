"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alexandra Chen",
    role: "Film Critic & Author",
    rating: 5,
    text: "The curation on MMDB is unmatched. I&apos;ve discovered masterpieces I would never have found elsewhere. Worth every penny.",
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    badge: "Cinema Premium",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Documentary Enthusiast",
    rating: 5,
    text: "The personalized recommendations powered by their AI are remarkably accurate. It&apos;s like having your own film concierge.",
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    badge: "Studio Pass",
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    role: "Independent Filmmaker",
    rating: 5,
    text: "Finally, a platform that respects cinema as art. The reviews are thoughtful and the community is incredible.",
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    badge: "Cinema Premium",
  },
  {
    id: 4,
    name: "James Mitchell",
    role: "Movie Marathon Fan",
    rating: 5,
    text: "The 4K streaming quality is exceptional. No buffering, no interruptions. Pure cinema magic.",
    image: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    badge: "Studio Pass",
  },
  {
    id: 5,
    name: "Elena Vasquez",
    role: "Student & Cinephile",
    rating: 5,
    text: "Best investment I&apos;ve made in my film education. The curated collections helped shape my taste in cinema.",
    image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    badge: "Cinema Premium",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-background via-background to-secondary/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by Film Enthusiasts{" "}
          </h2>
          <p className="text-lg text-muted-foreground">
            Subscribers discovering their new favorite films
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {visibleTestimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-secondary/30 border-secondary/50 p-8 flex flex-col transition-all duration-300 hover:border-primary/50 hover:bg-secondary/40"
            >
              {/* Avatar */}
              <div className="mb-6">
                <div
                  className="w-16 h-16 rounded-full mb-4"
                  style={{ background: testimonial.image }}
                />
                <h3 className="text-lg font-bold text-foreground">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {testimonial.role}
                </p>
                <span className="inline-block px-3 py-1 bg-primary/15 text-primary text-xs font-medium rounded-full">
                  {testimonial.badge}
                </span>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground flex-1 mb-6 leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-8">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="border-secondary/50 hover:bg-secondary/30 h-12 w-12"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "bg-primary w-8 h-2"
                    : "bg-secondary/50 w-2 h-2 hover:bg-secondary"
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="border-secondary/50 hover:bg-secondary/30 h-12 w-12"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Call to Action */}
        {/* <div className="mt-16 text-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
          >
            Join Our Community Today
          </Button>
        </div> */}
      </div>
    </section>
  );
}
