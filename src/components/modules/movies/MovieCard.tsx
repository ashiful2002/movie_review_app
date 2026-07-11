"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import MovieDetails from "@/components/Buttons/movie/ViewDetails";
import BuySubscription from "@/components/Buttons/movie/BuySubscription";
import AddtoWatchlist from "@/components/Buttons/movie/AddtoWatchlist";
import { Movie } from "@/types/movie";
import ReviewModal from "../reviews/ReviewModal";
import AddWatchlistButton from "@/components/Buttons/movie/AddtoWatchlist";
import AddFavouriteButton from "@/components/Buttons/movie/AddFavourite";

interface MovieCardProps {
  movie: Movie;
  premiumUser: boolean;
}

export default function MovieCard({ movie, premiumUser }: MovieCardProps) {
  const averageRating =
    movie.reviews && movie.reviews.length > 0
      ? movie.reviews.reduce((a: any, b: any) => a + b.rating, 0) /
        movie.reviews.length
      : 0;
  console.log(movie);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm mx-auto"
    >
      <Card className="overflow-hidden rounded-2xl shadow-2xl border">
        <CardHeader className="p-0 relative">
          <div className="relative h-64 w-full">
            <Image
              src={movie.thumbnail}
              alt={movie.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {movie.isPremium && (
                <Badge
                  variant={"secondary"}
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    movie.isPremium ? "bg-yellow-400  " : "bg-green-500"
                  }`}
                >
                  {movie.isPremium && "Premium"}
                </Badge>
              )}
              <Badge className="px-3 py-1 text-xs font-semibold rounded-full  bg-blue-500 text-white">
                {movie.releaseYear}
              </Badge>
            </div>
            <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm">
              <Eye className="w-4 h-4" />
              {movie.views || 0}
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-5 space-y-2">
          <h3 className="text-xl font-bold leading-tight">{movie.title}</h3>
          <p className="text-sm line-clamp-2">
            {movie.description.slice(0, 50)}
          </p>
          {movie.cast.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              <span>
                Casts:{" "}
                {movie.cast.slice(0, 2).map((cast: string) => (
                  <span key={cast} className="">
                    {cast.split(" ")[0]}
                  </span>
                ))}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 pt-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-400">
              ({movie.reviews?.length || 0})
            </span>
          </div>
          {movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {movie.genres.slice(0, 2).map((item) => (
                <span
                  className="border border-amber-400 rounded px-2"
                  key={item.genreId}
                >
                  {item.genre.name}
                </span>
              ))}
            </div>
          )}
          <span className="text-sm font-medium">
            IMDB Rating: {movie.imdbRating}
          </span>
        </CardContent>
        <Separator />

        <CardFooter className="flex flex-col gap-3 justify-start items-start">
          <div className="flex gap-4">
            <AddWatchlistButton text=" " movieId={movie.id} />
            <AddFavouriteButton text=" " movieId={movie.id} />
          </div>
          <MovieDetails movieId={movie.slug} />
          {premiumUser ? (
            // <AddtoWatchlist movie={movie} />
            ""
          ) : (
            <>{/* <BuySubscription movie={movie} /> */}</>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
