import AddMovieForm from "@/components/modules/add-movies/AddMovieForm";
import { getAllGenres } from "@/services/genre";

const page = async () => {
  const genres = await getAllGenres();

  return (
    <div>
      <AddMovieForm genres={genres?.data || []} />
    </div>
  );
};

export default page;
