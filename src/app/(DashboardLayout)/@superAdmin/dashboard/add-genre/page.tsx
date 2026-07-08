import AddGenreForm from "@/components/modules/genre/form/AddGenreForm";
import { getAllGenres } from "@/services/genre";

const AddGenre = async () => {
    const genres = await getAllGenres();

    return (
        <div>
            <AddGenreForm />
        </div>
    );
};

export default AddGenre;