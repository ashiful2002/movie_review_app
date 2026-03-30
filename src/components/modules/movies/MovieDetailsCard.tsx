"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  Eye,
  Film,
  Clock,
  Users,
  Globe,
  EyeClosed,
  EyeIcon,
} from "lucide-react";
import ReviewSection from "../reviews/ReviewSection";
import BuySubscription from "@/components/Buttons/movie/BuySubscription";
import AddtoWatchlist from "@/components/Buttons/movie/AddtoWatchlist";
import ReviewModal from "../reviews/ReviewModal";

const MovieDetails = ({ movie }: any) => {
  const router = useRouter();

  const averageRating =
    movie?.reviews?.length > 0
      ? movie.reviews.reduce((a: any, b: any) => a + b.rating, 0) /
        movie.reviews.length
      : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Banner */}
      <div className="relative h-100 w-full">
        <Image
          src={movie.banner}
          alt={movie.title}
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 bg-gradient-to-t from-black/80 to-transparent">
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <p className="text-gray-300 mt-2">{movie.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {movie.isPremium && (
              <Badge
                variant={"secondary"}
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  movie.isPremium ? "bg-yellow-400 text-black" : "bg-green-500"
                }`}
              >
                {movie.isPremium && "Premium"}
              </Badge>
            )}
            <Badge className="px-3 py-1 text-xs font-semibold rounded-full  bg-blue-500 text-white">
              {movie.releaseYear}
            </Badge>
            {movie.ageRating && (
              <Badge
                variant={"secondary"}
                className="px-3 py-1 text-xs font-semibold rounded-full b-red-600"
              >
                {movie.ageRating}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="w-full  relative h-125 md:h-full">
          <Image
            src={movie.thumbnail}
            alt={movie.title}
            height={200}
            width={300}
            className=" rounded-xl shadow-2xl"
          />
        </div>

        {/* Details */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <p className="text-gray-300">
                Directed by {movie.director || "Unknown"}
              </p>
              {movie.cast && movie.cast.length > 0 && (
                <p className="text-gray-400 mt-1">
                  Cast: {movie.cast.join(", ")}
                </p>
              )}
            </div>
            <div className="text-3xl font-extrabold text-yellow-400">
              ${movie.price?.toFixed(2) || "0.00"}
            </div>
          </div>

          {/* Rating & Genres */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span className="font-medium">{averageRating.toFixed(1)}</span>
              <span className="text-gray-400">
                ({movie.reviews?.length || 0} reviews)
              </span>
            </div>

            {movie.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {movie.genres.map(({ genre, genreId }: any) => (
                  <Badge key={genreId} className="text-xs px-2 py-1">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Extra Info */}
          <div className="grid grid-cols-2 gap-4 text-gray-400 text-sm">
            {movie.language && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" /> Language: {movie.language}
              </div>
            )}
            {movie.duration && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> Duration: {movie.duration} min
              </div>
            )}
            {movie.country && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" /> Country: {movie.country}
              </div>
            )}
            {movie.budget && (
              <div>Budget: ${movie.budget.toLocaleString()}</div>
            )}
            {movie.boxOffice && (
              <div>Box Office: ${movie.boxOffice.toLocaleString()}</div>
            )}
            {movie.status && <div>Status: {movie.status}</div>}
          </div>

          <AddtoWatchlist movie={movie} />
          <BuySubscription movie={movie} />
        </div>
      </div>
      <div className="flex  justify-center ">
        <ReviewSection movie={movie} /> <ReviewModal movieId={movie?.id} />
      </div>
    </div>
  );
};

export default MovieDetails;
