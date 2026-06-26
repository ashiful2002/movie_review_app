import AddGenreForm from "@/components/modules/genre/form/AddGenreForm";
import GenreTable from "@/components/modules/genre/table/GenreTable";
import { getAllGenres } from "@/services/genre";

const AddGenre = async () => {
  const genres = await getAllGenres();

  return (
    <div>
      <AddGenreForm/>
      <>
       </>
    </div>
  );
};

export default AddGenre;
