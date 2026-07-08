import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WatchlistItem } from "@/types/watchlist";

interface Props {
  item: WatchlistItem;
  onRemove: (movieId: string, title: string) => void;
}

export function WatchlistRow({ item, onRemove }: Props) {
  const { movie } = item;

  return (
    <tr className="border-t">
      <td className="px-5 py-4">
        <div className="relative h-20 w-14 overflow-hidden rounded">
          <Image
            src={movie.thumbnail}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </div>
      </td>

      <td className="px-5 py-4 font-medium">
        {movie.title}
      </td>

      <td className="px-5 py-4">
        {movie.releaseYear}
      </td>

      <td className="px-5 py-4">
        ⭐ {movie.rating}
      </td>

      <td className="px-5 py-4 text-right">
        <Button
          size="sm"
          variant="destructive"
          onClick={() =>
            onRemove(item.movieId, movie.title)
          }
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remove
        </Button>
      </td>
    </tr>
  );
}