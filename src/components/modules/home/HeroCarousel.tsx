"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { s } from "framer-motion/client";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  text_color?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Discover. Review. Love Movies.",
    description:
      "Explore thousands of movies, share your honest reviews, build your watchlist, and connect with a community of passionate movie lovers.",
    image: "https://i.ibb.co.com/twKcrcGr/19-b.webp",
    text_color: "text-yellow-400",
  },
  {
    id: 2,
    title: "Every Great Movie Deserves Your Voice.",
    description:
      "From timeless classics to the latest blockbusters, rate, review, and discover your next unforgettable cinematic experience.",
    image: "https://i.ibb.co.com/mVv9b5p1/bb-b.webp",
    text_color: "text-yellow-400",
  },
  {
    id: 3,
    title: "Where Movie Lovers Share Their Stories.",
    description:
      "Read trusted reviews, write your own opinions, save your favorites, and uncover hidden gems from every genre.",
    image: "https://i.ibb.co/4nc6sVvC/int-b.webp",
    text_color: "text-white",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="relative w-full mx-auto mt-2 overflow-hidden rounded shadow-xl">
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
      <div className="pl-2 absolute bottom-4   -translate -x-1/2 z-10">
        <h1
          className={`text-4xl md:text-5xl font-extrabold text-yellow-400 ${
            slides[current].text_color && slides[current].text_color
          } `}
        >
          {slides[current].title}
        </h1>
        <p className="hidden md:block text-md md:text-xl">
          {slides[current].description}
        </p>
      </div>
    </div>
  );
}
