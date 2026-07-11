import MovieDetails from "@/components/modules/movies/MovieDetailsCard";
import { getUser } from "@/services/authentication";
import { getSingleMovie } from "@/services/movies";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const { data: movie } = await getSingleMovie(slug);
  const user = await getUser();

  const premiumUser = user?.isPremium ?? false;
  return <MovieDetails movie={movie} premiumUser={premiumUser} />;
}
