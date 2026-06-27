import { getAllMovies } from "@/services/movies";
 import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { MoviesTable } from "@/components/modules/super-admin/manage-movies/movie-table";

interface Movie {
  id: string;
  title: string;
  director: string;
  releaseYear: number;
  duration: number;
  rating: number;
  price: number;
  status: "released" | "upcoming" | "archived";
  views: number;
  isPremium: boolean;
  isFeatured: boolean;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface MoviesResponse {
  success: boolean;
  message: string;
  movies: Movie[];
  data: Movie[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const ManageMoviesPage = async () => {
  const response = await getAllMovies();
  const movies = response.movies || response.data || [];

  return (
    <div className="space-y-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Movies</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and monitor your movie catalog
          </p>
        </div>
        <Link href="/admin/movies/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Movie
          </Button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="rounded-lg border bg-card">
        <MoviesTable movies={movies} />
      </div>
    </div>
  );
};

export default ManageMoviesPage;
