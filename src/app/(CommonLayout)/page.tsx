// app/(commonLayout)/page.tsx
export const revalidate = 60; // rebuild every 60 seconds

import HeroCarousel from "@/components/modules/home/HeroCarousel";
import MovieCard from "@/components/modules/movies/MovieCard";
import { Button } from "@/components/ui/button";
import { getUser } from "@/services/authentication";
import { getAllMovies } from "@/services/movies";
import Link from "next/link";

export default async function Home() {
  let movies: any[] = [];
  let user: any = null;
  let premiumUser = false;

  try {
    const moviesResponse = await getAllMovies();
    // safely get data, default to empty array if undefined
    movies = moviesResponse?.data?.data || [];
  } catch (err) {
    console.error("Failed to fetch movies:", err);
    movies = [];
  }

  try {
    user = await getUser();
    premiumUser = user?.isPremium || false;
  } catch (err) {
    console.error("Failed to fetch user:", err);
    premiumUser = false;
  }

  return (
    <>
      <HeroCarousel />
      <div className="">
        <h2 className="text-2xl font-semibold text-center my-5 ">
          Latest Movies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
          {movies.slice(0, 10).map((product: any, index: number) => (
            <MovieCard premiumUser={premiumUser} movie={product} key={index} />
          ))}
        </div>
        <div className="flex items-center justify-center mt-4">
          <Link href={"/movies"}>
            <Button className="cursor-pointer">View All</Button>
          </Link>
        </div>
      </div>
    </>
  );
}