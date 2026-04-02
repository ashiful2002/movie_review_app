"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Fresh Strawberries",
    description: "Juicy, organic, and straight from the farm.",
    image: "https://i.ibb.co.com/twKcrcGr/19-b.webp",
  },
  {
    id: 2,
    title: "Tasty Burgers",
    description: "Mouthwatering burgers for every craving.",
    image: "https://i.ibb.co.com/mVv9b5p1/bb-b.webp",
  },
  {
    id: 3,
    title: "Delicious Smoothies",
    description: "Healthy and refreshing smoothies every day.",
    image:
      "https://i.ibb.co.com/hxSGjsT0/ferrari-sf-26-2026-3840x1080-25433.jpg",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="relative w-full mx-auto mt-2 overflow-hidden rounded shadow-xl">
      {/* Slides */}
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px]">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="bg-black/30 hover:bg-black/60 text-white cursor-pointer"
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="bg-black/30 hover:bg-black/60 text-white cursor-pointer"
        >
          <ChevronRight size={24} />
        </Button>
      </div>

      {/* Dots Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === current ? "bg-white w-4" : "bg-white/50"
            }`}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
}