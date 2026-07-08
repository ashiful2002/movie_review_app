import HeroCarousel from "@/components/modules/home/HeroCarousel";
import HomeSections from "@/components/modules/home/HomeMoreSections";
import MovieCard from "@/components/modules/movies/MovieCard";
import FloatingChatbot from "@/components/Shared/FloatingChatbot";
import { Button } from "@/components/ui/button";
import { getUser } from "@/services/authentication";
import { getAllMovies } from "@/services/movies";
import Link from "next/link";

export default async function Home() {

  const data = await getAllMovies();
  const movies = data?.data;
  const user = await getUser();
  const premiumUser = user?.isPremium || false;

  return (
    <>
      <HeroCarousel />
      <div className="">
        <div className="mb-12 text-center">
          <h2 className="mt-4 text-4xl font-bold">
            Latest Movies
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Here is 10 Latest Movies
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
          {movies.slice(0, 10).map((product: any, index: number) => (
            <MovieCard premiumUser={premiumUser} movie={product} key={index} />
          ))}
        </div>
        {movies.length && (
          <div className="flex items-center justify-center mt-4">
            <Link href={"/movies"}>
              <Button className="cursor-pointer">View All</Button>
            </Link>
          </div>
        )}
      </div>
      <HomeSections />
    </>
  );
}
