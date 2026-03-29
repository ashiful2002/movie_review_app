import MovieDetails from "@/components/modules/movies/MovieDetailsCard";
import { getSingleMovie } from "@/services/movies";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data: movie } = await getSingleMovie(id);

  return <MovieDetails movie={movie} />;
}
