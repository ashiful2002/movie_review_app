import MovieDetails from "@/components/modules/movies/MovieDetailsCard";
import { getUser } from "@/services/authentication";
import { getSingleMovie } from "@/services/movies";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data: movie } = await getSingleMovie(id);
  const user = await getUser();
  
  const premiumUser = user?.isPremium;
  return <MovieDetails movie={movie} premiumUser={premiumUser} />;
}
