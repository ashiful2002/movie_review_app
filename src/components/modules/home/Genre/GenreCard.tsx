import Link from "next/link";
import Image from "next/image";

interface GenreCardProps {
  genre: {
    id: string;
    name: string;
    slug: string;
    image: string;
    _count?: {
      movies: number;
    };
  };
}

export default function GenreCard({ genre }: GenreCardProps) {
  return (
    <Link href={`/movies?genre=${genre.slug}`}>
      <div className="group aspect-square overflow-hidden rounded-2xl border bg-card p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className="flex h-full flex-col">
          {/* Image */}
          <div className="relative flex-1 overflow-hidden rounded-xl bg-muted">
            <Image
              src={genre.image}
              alt={genre.name}
              fill
              sizes="(max-width:768px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="mt-4">
            <h3 className="text-lg font-bold">{genre.name}</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {genre._count?.movies ?? 0} Movies
            </p>

            <p className="mt-3 text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1">
              Explore →
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
