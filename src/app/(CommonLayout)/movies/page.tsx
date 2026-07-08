import Pagination, { PaginationMeta } from "@/components/Shared/Pagination";
import MovieCard from "@/components/modules/movies/MovieCard";
import MovieFilterWrapper from "@/components/Filter/MovieFilterWrapper";
import { getAllMovies } from "@/services/movies";
import { getUser } from "@/services/authentication";

type MoviesPageProps = {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    genre?: string;
    language?: string;
    ageRating?: string;
    status?: string;
    isPremium?: string;
    minRating?: string;
    maxRating?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    [key: string]: string | undefined;
  }>;
};

const MoviesPage = async ({ searchParams }: MoviesPageProps) => {
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;

  const [sortBy, sortOrder] = (params?.sort ?? "").split("_");

  const response = await getAllMovies({
    page,
    limit,
    ...(params?.search && { searchTerm: params.search }),
    ...(params?.genre && { genre: params.genre }),
    ...(params?.language && { language: params.language }),
    ...(params?.ageRating && { ageRating: params.ageRating }),
    ...(params?.status && { status: params.status }),
    ...(params?.isPremium && { isPremium: params.isPremium }),
    ...(params?.minRating && { minRating: params.minRating }),
    ...(params?.maxRating && { maxRating: params.maxRating }),
    ...(params?.minPrice && { minPrice: params.minPrice }),
    ...(params?.maxPrice && { maxPrice: params.maxPrice }),
    ...(sortBy && { sortBy }),
    ...(sortOrder && { sortOrder }),
  });

  const movies: any[] = response?.data ?? [];
  const meta: PaginationMeta = response?.meta ?? {
    page,
    limit,
    total: 0,
    totalPages: 0,
  };

  const user = await getUser()
  const premiumUser = user?.isPremium;

  return (
    <div className="space-y-4">
      <MovieFilterWrapper />

      {movies.length === 0 ? (
        <p className="text-center text-slate-400 py-20 text-lg">
          No movies found.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {movies.map((movie: any) => (
              <MovieCard movie={movie} premiumUser={Boolean(premiumUser)} key={movie.id} />
            ))}
          </div>

          <Pagination meta={meta} />
        </>
      )}
    </div>
  );
};

export default MoviesPage;