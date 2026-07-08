import GenreTable from "@/components/modules/genre/table/GenreTable";
import { getAllGenres } from "@/services/genre";

const AddGenre = async () => {
    const genres = await getAllGenres();
    console.log(genres);

    return (
        <>

            <GenreTable genres={genres?.data || []} />

        </>
    );
};

export default AddGenre;