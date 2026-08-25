"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Clock,
  Globe,
  Play,
  Eye,
  Award,
  Calendar,
  DollarSign,
  Captions,
  MapPin,
  Ticket,
  X,
} from "lucide-react";
import ReviewSection from "../reviews/ReviewSection";
import BuySubscription from "@/components/Buttons/movie/BuySubscription";
import ReviewModal from "../reviews/ReviewModal";
import AddWatchlistButton from "@/components/Buttons/movie/AddtoWatchlist";
import AddFavouriteButton from "@/components/Buttons/movie/AddFavourite";
import { Movie } from "@/types/movie";

// export async function generateMetadata({ params }: any) {
//   const movie = await getSingleMovie(params.slug);

//   return {
//     title: movie.title,
//     description: movie.description,
//   };
// }

interface MovieDetailsProps {
  movie: Movie;
  premiumUser: boolean;
}

const formatCompact = (n?: number | null) =>
  typeof n === "number"
    ? new Intl.NumberFormat("en-US", { notation: "compact" }).format(n)
    : null;

const formatCurrency = (n?: number | null) =>
  typeof n === "number"
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(n)
    : null;

const formatDate = (iso?: string) =>
  iso
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
      }).format(new Date(iso))
    : null;

// Pulls a video ID out of watch?v=, youtu.be/, embed/, and shorts/ URLs.
const getYouTubeId = (url?: string) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

const Perforation = ({ className = "" }: { className?: string }) => (
  <div
    className={`hidden md:block w-px self-stretch relative text-[#D8D5CC] dark:text-[#4A4C58] ${className}`}
    style={{
      backgroundImage:
        "repeating-linear-gradient(to bottom, currentColor 0, currentColor 6px, transparent 6px, transparent 14px)",
    }}
  >
    <span className="absolute -top-3 -left-[7px] w-3.5 h-3.5 rounded-full bg-[#F5F3EE] dark:bg-[#0E0F13] border border-[#D8D5CC] dark:border-[#2A2C36]" />
    <span className="absolute -bottom-3 -left-[7px] w-3.5 h-3.5 rounded-full bg-[#F5F3EE] dark:bg-[#0E0F13] border border-[#D8D5CC] dark:border-[#2A2C36]" />
  </div>
);

// Full-bleed backdrop modal with a 16:9 YouTube embed inside.
export const TrailerModal = ({
  videoId,
  onClose,
}: {
  videoId: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 md:top-8 md:right-8 text-[#EDEAE3] hover:text-[#D4A24C] transition-colors"
        aria-label="Close trailer"
      >
        <X className="w-7 h-7" />
      </button>
      <div
        className="w-full max-w-4xl aspect-video border border-[#2A2C36] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="Trailer"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} hour${hours > 1 ? "s" : ""}`;

  return `${hours} hour${hours > 1 ? "s" : ""} ${mins} min`;
};
const MovieDetails = ({ movie, premiumUser }: MovieDetailsProps) => {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const shouldTruncate = movie?.description.length > 250;

  const userRating =
    movie?.reviews?.length > 0
      ? movie.reviews.reduce((a: number, b: any) => a + b.rating, 0) /
        movie.reviews.length
      : movie?.averageRating ?? 0;

  const canWatch = movie?.streamingLink && (!movie?.isPremium || premiumUser);
  const trailerId = getYouTubeId(movie?.trailerLink);

  return (
    <div className="min-h-screen bg-[#F5F3EE] dark:bg-[#0E0F13] text-[#1A1B22] dark:text-[#EDEAE3]">
      {/* Hero */}
      <div className="relative h-[28rem] md:h-[34rem] w-full">
        <Image
          src={movie?.banner}
          alt={movie?.title}
          fill
          priority
          className="object-cover brightness-[0.55]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#232323] dark:from-[#0E0F13] via-[#F5F3EE]/60 dark:via-[#0E0F13]/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {movie?.isFeatured && (
              <Badge className="rounded-none px-2.5 py-1 text-[11px] font-mono tracking-widest uppercase bg-[#B23A48] text-[#EDEAE3] border-0">
                Featured
              </Badge>
            )}
            {movie?.isPremium && (
              <Badge className="rounded-none px-2.5 py-1 text-[11px] font-mono tracking-widest uppercase bg-[#D4A24C] text-[#0E0F13] border-0">
                Premium
              </Badge>
            )}
          </div>

          {/* Text sits over the image, always needs to stay light regardless of theme */}
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] max-w-4xl text-[#EDEAE3]">
            {movie?.title}
          </h1>

          <p className="mt-1 max-w-2xl leading-relaxed text-[#C9C6BE]">
            {expanded || !shouldTruncate
              ? movie?.description
              : `${movie?.description.slice(0, 250)}...`}

            {shouldTruncate && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="ml-2 font-medium text-primary hover:underline"
              >
                {expanded ? "Show Less" : "Show More"}
              </button>
            )}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Badge className="rounded-none px-2.5 py-1 text-[11px] font-mono tracking-widest uppercase bg-[#EDEAE3] dark:bg-[#171922] text-[#4A4B54] dark:text-[#9B9CA6] border border-[#D8D5CC] dark:border-[#2A2C36]">
              {movie?.status}
            </Badge>{" "}
            {trailerId && (
              <button
                onClick={() => setTrailerOpen(true)}
                className="flex items-center gap-2 bg-yellow-400 text-[#0E0F13] px-5 py-2.5 font-semibold text-sm hover:bg-yellow-500 transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4" />
                Trailer
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content — ticket layout */}
      <div className="container mx-auto py-10 md:py-14">
        <div className="flex flex-col md:flex-row gap-0 bg-white dark:bg-[#171922] border border-[#D8D5CC] dark:border-[#2A2C36] shadow-2xl">
          {/* Poster / stub */}
          <div className="w-full md:w-[280px] shrink-0 p-6 flex flex-col gap-5">
            <div
              className="relative w-full aspect-[2/3] group cursor-pointer"
              onClick={() => trailerId && setTrailerOpen(true)}
            >
              <Image
                src={movie?.thumbnail}
                alt={movie?.title}
                fill
                className="object-cover rounded-sm"
              />
              {trailerId && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <Play className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity fill-white" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[#B8863A] dark:text-[#D4A24C]">
              <Star className="w-4 h-4 fill-[#B8863A] dark:fill-[#D4A24C]" />
              <span className="font-mono text-sm font-semibold">
                {userRating.toFixed(1)}
              </span>
              <span className="text-xs text-[#6B6C76] dark:text-[#9B9CA6] font-mono">
                / {movie?.reviews?.length ?? 0} reviews
              </span>
            </div>

            {typeof movie?.imdbRating === "number" && (
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#6B6C76] dark:text-[#9B9CA6] border-t border-dashed border-[#D8D5CC] dark:border-[#2A2C36] pt-3">
                <span>IMDb</span>
                <span className="text-[#1A1B22] dark:text-[#EDEAE3]">
                  {movie.imdbRating.toFixed(1)} / 10
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#6B6C76] dark:text-[#9B9CA6]">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> Views
              </span>
              <span className="text-[#1A1B22] dark:text-[#EDEAE3]">
                {formatCompact(movie?.views) ?? "—"}
              </span>
            </div>

            {typeof movie?.rating === "number" && (
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#6B6C76] dark:text-[#9B9CA6]">
                <span className="flex items-center gap-1">
                  <Ticket className="w-3.5 h-3.5" /> Rated
                </span>
                <span className="text-[#1A1B22] dark:text-[#EDEAE3]">
                  {movie.rating}
                </span>
              </div>
            )}

            <div className="flex flex-col gap-2 pt-2 border-t border-dashed border-[#D8D5CC] dark:border-[#2A2C36]">
              <AddWatchlistButton movieId={movie?.id} />
              <AddFavouriteButton movieId={movie?.id} />
              <ReviewModal movieId={movie?.id} />
            </div>
          </div>

          <Perforation />

          {/* Details */}
          <div className="w-full p-6 md:p-8 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="space-y-1.5">
                <p className="text-sm">
                  <span className="text-[#6B6C76] dark:text-[#9B9CA6]">
                    Director{" "}
                  </span>
                  <span className="font-medium">
                    {movie?.director || "Unknown"}
                  </span>
                </p>
                {movie?.cast?.length > 0 && (
                  <p className="text-sm">
                    <span className="text-[#6B6C76] dark:text-[#9B9CA6]">
                      Cast{" "}
                    </span>
                    {movie.cast.join(", ")}
                  </p>
                )}
              </div>

              {!movie?.isPremium || premiumUser
                ? movie?.price > 0 && (
                    <div className="font-mono text-2xl font-bold text-[#B8863A] dark:text-[#D4A24C]">
                      ${movie.price.toFixed(2)}
                    </div>
                  )
                : ""}
            </div>

            {movie?.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(({ genre, genreId }) => (
                  <Badge
                    key={genreId}
                    className="rounded-full text-xs px-3 py-1 bg-[#3E6E68]/10 dark:bg-[#3E6E68]/20 text-[#2F5D57] dark:text-[#7FADA6] border border-[#3E6E68]/30 dark:border-[#3E6E68]/40"
                  >
                    {genre?.name}
                  </Badge>
                ))}
              </div>
            )}

            <Separator className="bg-[#D8D5CC] dark:bg-[#2A2C36]" />

            {/* Data grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 text-sm font-mono">
              {movie?.language?.length > 0 && (
                <div className="flex items-start gap-2">
                  <Globe className="w-4 h-4 mt-0.5 text-[#6B6C76] dark:text-[#9B9CA6]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#6B6C76] dark:text-[#9B9CA6]">
                      Language
                    </div>
                    {movie.language.join(", ")}
                  </div>
                </div>
              )}
              {movie?.subtitles?.length > 0 && (
                <div className="flex items-start gap-2">
                  <Captions className="w-4 h-4 mt-0.5 text-[#6B6C76] dark:text-[#9B9CA6]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#6B6C76] dark:text-[#9B9CA6]">
                      Subtitles
                    </div>
                    {movie.subtitles.join(", ")}
                  </div>
                </div>
              )}
              {movie?.duration && (
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 text-[#6B6C76] dark:text-[#9B9CA6]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#6B6C76] dark:text-[#9B9CA6]">
                      Duration
                    </div>
                    {formatDuration(movie.duration)}
                  </div>
                </div>
              )}
              {movie?.country && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#6B6C76] dark:text-[#9B9CA6]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#6B6C76] dark:text-[#9B9CA6]">
                      Country
                    </div>
                    {movie.country}
                  </div>
                </div>
              )}
              {formatCurrency(movie?.budget) && (
                <div className="flex items-start gap-2">
                  <DollarSign className="w-4 h-4 mt-0.5 text-[#6B6C76] dark:text-[#9B9CA6]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#6B6C76] dark:text-[#9B9CA6]">
                      Budget
                    </div>
                    {formatCurrency(movie.budget)}
                  </div>
                </div>
              )}
              {formatCurrency(movie?.boxOffice) && (
                <div className="flex items-start gap-2">
                  <DollarSign className="w-4 h-4 mt-0.5 text-[#B8863A] dark:text-[#D4A24C]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#6B6C76] dark:text-[#9B9CA6]">
                      Box Office
                    </div>
                    {formatCurrency(movie.boxOffice)}
                  </div>
                </div>
              )}
              {formatDate(movie?.createdAt) && (
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 mt-0.5 text-[#6B6C76] dark:text-[#9B9CA6]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#6B6C76] dark:text-[#9B9CA6]">
                      Added
                    </div>
                    {formatDate(movie.createdAt)}
                  </div>
                </div>
              )}
            </div>

            {movie?.awards?.length > 0 && (
              <>
                <Separator className="bg-[#D8D5CC] dark:bg-[#2A2C36]" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#6B6C76] dark:text-[#9B9CA6] font-mono mb-2">
                    Awards
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {movie.awards.map((award, i) => (
                      <Badge
                        key={i}
                        className="rounded-full text-xs px-3 py-1 bg-[#B23A48]/10 dark:bg-[#B23A48]/15 text-[#A13A46] dark:text-[#D98A93] border border-[#B23A48]/30 dark:border-[#B23A48]/40 gap-1"
                      >
                        <Award className="w-3 h-3" />
                        {award}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto pb-6">
        <ReviewSection movie={movie} />
      </div>

      {trailerOpen && trailerId && (
        <TrailerModal
          videoId={trailerId}
          onClose={() => setTrailerOpen(false)}
        />
      )}
    </div>
  );
};

export default MovieDetails;
