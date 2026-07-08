"use client";

import { MovieTable, WatchlistItem } from "@/components/Shared/MovieTable";
import { removeFromfavourite } from "@/services/favourite";

interface Props {
    favouriteMovies: WatchlistItem[];
}

const MyFavourite = ({ favouriteMovies }: Props) => {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    My Favorite Movies
                </h1>
                <p className="text-muted-foreground">
                    {favouriteMovies.length} movie{favouriteMovies.length !== 1 ? "s" : ""} marked as favorite
                </p>
            </div>

            <MovieTable
                items={favouriteMovies}
                onRemove={removeFromfavourite}
                emptyMessage="No favorite movies yet. Add your favorite movies!"
            />
        </div>
    );
};

export default MyFavourite;
