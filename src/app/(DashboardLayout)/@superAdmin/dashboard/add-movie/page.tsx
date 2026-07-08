import AddMovieForm from "@/components/modules/add-movie/AddMovieForm"
import { getAllGenres } from "@/services/genre";

const AddMoviesPage = async () => {
    const genres = await getAllGenres();

    return (
        <div>
            < AddMovieForm genres={genres?.data || []} />
        </div>
    )
}

export default AddMoviesPage