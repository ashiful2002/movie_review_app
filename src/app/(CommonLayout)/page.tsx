import HeroCarousel from "@/components/modules/home/HeroCarousel";
import MovieCard from "@/components/modules/movies/MovieCard";
import { Button } from "@/components/ui/button";
import { getUser } from "@/services/authentication";
import { getAllMovies } from "@/services/movies";
import Link from "next/link";

export default async function Home() {
  const { data } = await getAllMovies();
  const movies = data.data || [];
  // const user  = await getUser()

  return (
    <>
      {/* <HeroCarousel /> */}
      <div className="">
        <h2 className="text-2xl font-semibold text-center my-5 ">
          Recently Added Meals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
          {movies?.slice(0, 6).map((product: any, index: number) => (
            <MovieCard movie={product} key={index} />
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
