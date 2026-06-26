import { getAllGenres } from "@/services/genre";
import GenreCard from "./GenreCard";

export default async function GenreSection() {
    const genres = await getAllGenres();

    return (
        <section className="container mx-auto px-4 py-20">
            <div className="mb-12 text-center">
                <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                    Browse Categories
                </span>

                <h2 className="mt-4 text-4xl font-bold">
                    Explore Movies by Genre
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                    Discover thousands of movies across every genre—from action-packed
                    adventures and thrilling mysteries to heartfelt romances and
                    laugh-out-loud comedies.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {genres?.data?.map((genre: any) => (
                    <GenreCard key={genre.id} genre={genre} />
                ))}
            </div>
        </section>
    );
}