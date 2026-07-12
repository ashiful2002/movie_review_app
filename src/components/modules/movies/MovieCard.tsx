"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Eye, Play } from "lucide-react";
import { motion } from "framer-motion";
import MovieDetails from "@/components/Buttons/movie/ViewDetails";
import { Movie } from "@/types/movie";
import AddWatchlistButton from "@/components/Buttons/movie/AddtoWatchlist";
import AddFavouriteButton from "@/components/Buttons/movie/AddFavourite";

interface MovieCardProps {
  movie: Movie;
  premiumUser: boolean;
}

const formatCompact = (n?: number | null) =>
  typeof n === "number"
    ? new Intl.NumberFormat("en-US", { notation: "compact" }).format(n)
    : "0";

export default function MovieCard({ movie, premiumUser }: MovieCardProps) {
  const userRating =
    movie.reviews && movie.reviews.length > 0
      ? movie.reviews.reduce((a: number, b: any) => a + b.rating, 0) /
        movie.reviews.length
      : movie.averageRating ?? 0;

  const locked = movie.isPremium && !premiumUser;

  return (
    <motion.div
      // initial={{ opacity: 0, y: 16 }}
      // whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full h-full"
    >
      <Card className="group overflow-hidden rounded-sm bg-[#171922] border border-[#2A2C36] p-0 gap-0 transition-shadow hover:shadow-[0_0_0_1px_#D4A24C,0_12px_28px_-8px_rgba(212,162,76,0.25)]">
        <CardHeader className="p-0 relative">
          <div className="relative w-full aspect-[2/3] overflow-hidden">
            <Image
              src={movie.thumbnail}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F13] via-transparent to-transparent" />

            {/* Hover reveal */}
            <div className="absolute inset-0 bg-[#0E0F13]/0 group-hover:bg-[#0E0F13]/50 transition-colors flex items-center justify-center">
              <div className="w-11 h-11 rounded-full bg-yellow-400 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all">
                <Play className="w-4 h-4 fill-[#0E0F13] text-[#0E0F13] ml-0.5" />
              </div>
            </div>

            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
              {movie.isFeatured && (
                <Badge className="rounded-none px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase bg-[#B23A48] text-[#EDEAE3] border-0">
                  Featured
                </Badge>
              )}
              {movie.isPremium && (
                <Badge className="rounded-none px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase bg-[#D4A24C] text-[#0E0F13] border-0">
                  Premium
                </Badge>
              )}
            </div>

            <Badge className="absolute top-2.5 right-2.5 rounded-none px-2 py-0.5 text-[10px] font-mono tracking-widest bg-[#0E0F13]/70 backdrop-blur-sm text-[#EDEAE3] border border-[#4A4C58]">
              {movie.releaseYear}
            </Badge>

            <div className="absolute bottom-10 right-2.5 flex items-center gap-1 bg-gray-700/70 rounded backdrop-blur-sm px-2 py-0.5 text-[11px] font-mono text-[#C9C6BE]">
              <Eye className="w-3 h-3" />
              {formatCompact(movie.views)}
            </div>

            {/* title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-base font-black uppercase tracking-tight leading-tight text-[#EDEAE3] line-clamp-2">
                {movie.title}
              </h3>
            </div>
          </div>

          {/* Ticket punch notches on the seam */}
          <span className="absolute left-3 -bottom-1.5 w-3 h-3 rounded-full bg-[#0E0F13] border border-[#2A2C36] z-10" />
          <span className="absolute right-3 -bottom-1.5 w-3 h-3 rounded-full bg-[#0E0F13] border border-[#2A2C36] z-10" />
        </CardHeader>

        {/* Perforated seam */}
        <div
          className="h-px w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #4A4C58 0, #4A4C58 6px, transparent 6px, transparent 14px)",
          }}
        />

        <CardContent className="px -3.5 pt-3 pb-2 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-1 text-[#D4A24C]">
              <Star className="w-3.5 h-3.5 fill-[#D4A24C]" />
              <span className="font-semibold">{userRating.toFixed(1)}</span>
              <span className="text-[#6E7080]">
                ({movie.reviews?.length ?? 0})
              </span>
            </div>
            {typeof movie.imdbRating === "number" && (
              <span className="text-[#9B9CA6]">
                IMDb {movie.imdbRating.toFixed(1)}
              </span>
            )}
          </div>

          {movie.cast?.length > 0 && (
            <p className="text-xs text-[#9B9CA6] line-clamp-1">
              {movie.cast
                .slice(0, 2)
                .map((c) => c.split(" ")[0])
                .join(", ")}
            </p>
          )}

          {movie.genres?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {movie.genres.slice(0, 2).map((item) => (
                <span
                  key={item.genreId}
                  className="text-[10px] uppercase tracking-wide px-2 py-0.5 bg-[#3E6E68]/20 text-[#7FADA6] border border-[#3E6E68]/40"
                >
                  {item.genre.name}
                </span>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col items-start justify-start space-y-3 mt-2 mb-5">
          <div className="flex justify-start items-start gap-2">
            <AddWatchlistButton text=" " movieId={movie.id} />
            <AddFavouriteButton text=" " movieId={movie.id} />
          </div>
          <MovieDetails movieId={movie.slug} />
        </CardFooter>
      </Card>
    </motion.div>
  );
}
