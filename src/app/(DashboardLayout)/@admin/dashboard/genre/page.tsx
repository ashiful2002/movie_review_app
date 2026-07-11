import GenreTableAdvanced from "@/components/modules/genre/table/GenreTableAdvanced";
import { getAllGenres } from "@/services/genre";

const AddGenre = async () => {
  const genres = await getAllGenres();

  return (
    <div>
      <GenreTableAdvanced genres={genres?.data || []} />
    </div>
  );
};

export default AddGenre;
