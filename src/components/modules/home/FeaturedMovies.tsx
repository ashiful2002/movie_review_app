"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Crown,
  Clock,
  Film,
} from "lucide-react";

type Movie = {
  id: string;
  title: string;
  releaseYear: number;
  director: string;
  duration: number;
  rating: number;
  isPremium: boolean;
  thumbnail: string;
  banner: string;
  genres?: { name: string }[];
};

const movies: Movie[] = [
  {
    id: "b5dff2cb-8851-48b7-8b1e-d2f8f70d7c10",
    title: "The Prestige",
    releaseYear: 2024,
    director: "Christopher Nolan",
    duration: 130,
    rating: 8.5,
    isPremium: true,
    thumbnail: "https://i.ibb.co/9HBGM8Vk/the-prestige.webp",
    banner:
      "https://i.ibb.co/LDPg4Rb2/apple-touch-icon-cfba7699efe7a742de25c28e08c38525f19381d31087c69e89d6bcb8e3c0ddfa.png",
    genres: [{ name: "Drama" }, { name: "Mystery" }],
  },
  {
    id: "d3ad1ff0-ac44-438e-aa8c-d05c7bff56f5",
    title: "Dunkirk",
    releaseYear: 2017,
    director: "Christopher Nolan",
    duration: 106,
    rating: 8.0,
    isPremium: true,
    thumbnail: "https://i.ibb.co/bgfKgNCY/dunk-t.webp",
    banner: "https://i.ibb.co/TMyVYt7X/dunk-b.webp",
    genres: [{ name: "War" }, { name: "History" }],
  },
  {
    id: "cc684a07-fdf6-4d50-8bcd-845ae6a5d0ac",
    title: "Tenet",
    releaseYear: 2020,
    director: "Christopher Nolan",
    duration: 150,
    rating: 7.3,
    isPremium: true,
    thumbnail: "https://i.ibb.co/5X32pVVh/tenet-thumb.webp",
    banner: "https://i.ibb.co/F4bh69y4/tenet-b.webp",
    genres: [{ name: "Sci-Fi" }, { name: "Action" }],
  },
  {
    id: "63c1b2cd-c700-4add-87da-2868018e1c53",
    title: "The Matrix",
    releaseYear: 1999,
    director: "Wachowski Sisters",
    duration: 136,
    rating: 8.7,
    isPremium: true,
    thumbnail: "https://i.ibb.co/B2p5600B/tm-t.webp",
    banner: "https://i.ibb.co/QF4gNyym/tm-b.webp",
    genres: [{ name: "Sci-Fi" }],
  },
  {
    id: "41887df8-f835-42b8-9d05-f7869d099271",
    title: "Fight Club",
    releaseYear: 1999,
    director: "David Fincher",
    duration: 139,
    rating: 8.8,
    isPremium: true,
    thumbnail: "https://i.ibb.co/Nn1M7sfh/fc-t.webp",
    banner: "https://i.ibb.co/WWk6171t/fc-b.webp",
    genres: [{ name: "Drama" }],
  },
];

export function FeaturedMovies() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const visibleMovies = [
    movies[currentIndex],
    movies[(currentIndex + 1) % movies.length],
    movies[(currentIndex + 2) % movies.length],
  ];

  const mainMovie = visibleMovies[0];

  return (
    <section className="py-24 px-4 md:px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Movies
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover our curated selection of critically acclaimed films.
          </p>
        </div>

        {/* Main Featured Movie */}
        <div className="mb-12">
          <Card className="overflow-hidden group cursor-pointer">
            <div className="relative h-[400px] md:h-[520px]">
              <Image
                src={mainMovie.banner}
                alt={mainMovie.title}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0  bg-linear-to-t from-background via-background/10 to-transparent" />

              {/* Content */}
              <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end h-full max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {mainMovie.isPremium && (
                    <Badge>
                      <Crown className="w-3 h-3 mr-1 " />
                      Premium
                    </Badge>
                  )}
                  {mainMovie.genres?.map((genre, index) => (
                    <Badge key={index} variant="secondary">
                      {genre.name}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-3xl md:text-5xl font-bold mb-4">
                  {mainMovie.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    {mainMovie.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Film className="w-4 h-4" />
                    {mainMovie.releaseYear}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {mainMovie.duration} min
                  </span>
                </div>

                <p className="text-muted-foreground mb-6">
                  Directed by {mainMovie.director}
                </p>

                {/* <Button size="lg">Watch Now</Button> */}
              </div>
            </div>
          </Card>
        </div>

        {/* Secondary Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {visibleMovies.slice(1).map((movie) => (
            <Card
              key={movie.id}
              className="overflow-hidden group cursor-pointer"
            >
              <div className="relative h-64">
                <Image
                  src={movie.thumbnail}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/10 to-transparent" />

                <div className="absolute bottom-0 p-4 w-full">
                  <h4 className="text-lg font-bold">{movie.title}</h4>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{movie.releaseYear}</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      {movie.rating}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" size="icon" onClick={handlePrev}>
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex gap-2">
            {movies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? "bg-primary w-8" : "bg-muted w-2"
                }`}
              />
            ))}
          </div>

          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
