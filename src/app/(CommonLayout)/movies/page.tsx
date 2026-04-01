export const revalidate = 60; // rebuild every 60 seconds
import { getAllMovies } from "@/services/meals";
import Pagination from "@/components/Shared/Pagination";
import MovieCard from "@/components/modules/movies/MovieCard";
import MovieFilter from "@/components/Filter/MovieFilter";
import { getUser } from "@/services/authentication";
import { UserTypes } from "@/types";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const params = await searchParams;
  const { data } = await getAllMovies(params);
  const user = await getUser();
  const movies = data.data;
  const meta = data.meta;
  const premiumUser = user?.isPremium;
  return (
    <div>
      <MovieFilter />
      {movies?.length === 0 ? (
        "empty movie"
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {movies?.map((movie: any) => (
              <MovieCard
                premiumUser={premiumUser}
                movie={movie}
                key={movie.id}
              />
            ))}
          </div>
          {meta?.length === 0 ? <Pagination totalPage={meta.totalPage} /> : ""}
        </>
      )}
    </div>
  );
};

export default page;
