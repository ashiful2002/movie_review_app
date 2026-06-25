import { getAllGenres } from "@/services/genre";
import MovieFilter from "./MovieFilter";
 
const MovieFilterWrapper = async () => {
  const genreResponse = await getAllGenres();
  const genres = genreResponse?.data ?? [];
 
  return <MovieFilter genres={genres} />;
};

export default MovieFilterWrapper;
