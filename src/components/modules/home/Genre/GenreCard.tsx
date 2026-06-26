import Link from "next/link";
import {
    Clapperboard,
    Swords,
    Laugh,
    Heart,
    Ghost,
    Rocket,
    Search,
    Sparkles,
    Shield,
    Camera,
    Drama,
    Compass,
    Film,
} from "lucide-react";
import Image from "next/image";

const genreIcons: Record<string, any> = {
    Action: Swords,
    Comedy: Laugh,
    Romance: Heart,
    Horror: Ghost,
    "Sci-Fi": Rocket,
    Mystery: Search,
    Fantasy: Sparkles,
    Crime: Shield,
    Documentary: Camera,
    Drama: Drama,
    Adventure: Compass,
    Animation: Clapperboard,
};


interface GenreCardProps {
    genre: {
        id: string;
        name: string;
        image: string;
        _count?: {
            movies: number;
        };
    };
}

export default function GenreCard({ genre }: GenreCardProps) {
    const Icon = genreIcons[genre.name] || Film;



    return (
        <Link href={`/movies?genre=${genre.id}`}>
            <div
                className={`group aspect-square rounded-2xl border bg-gradient-to-br 
        p-6 transition-all duration-300
        hover:-translate-y-2 hover:shadow-xl`}
            >
                <div className="flex h-full flex-col justify-between">
                    <div className="flex items-center justify-center rounded-xl bg-background shadow-sm">
                        < Image src={genre.image || ""} alt={genre.name} width={220} height={140} className="rounded-lg" />
                    </div>

                    <div>
                        <h3 className="text-xl font-bold">{genre.name}</h3>

                        {genre._count?.movies && (
                            <p className="mt-1 text-sm text-muted-foreground">
                                {genre._count.movies} Movies
                            </p>
                        )}

                        <p className="m-4 text-sm font-medium text-primary transition group-hover:translate-x-1">
                            Explore →
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}