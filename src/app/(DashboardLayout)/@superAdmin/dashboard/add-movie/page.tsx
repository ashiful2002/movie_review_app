import AddMovieForm from "@/components/modules/add-movies/AddMovieForm";
import { getAllGenres } from "@/services/genre";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const AddMoviesPage = async () => {
  const genres = await getAllGenres();

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/dashboard/manage-movies"
          className="group w-52 flex items-center gap-2 px-4 py-2 rounded-lg border  transition-colors duration-500"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 group-hover:scale-110" />{" "}
          Manage Movies
        </Link>
      </div>

      <AddMovieForm genres={genres?.data || []} />
    </div>
  );
};

export default AddMoviesPage;
