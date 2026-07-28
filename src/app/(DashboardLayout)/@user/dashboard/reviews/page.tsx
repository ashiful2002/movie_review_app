import Image from "next/image";
import Link from "next/link";
import { getReviews } from "./_action";

const Page = async () => {
  const { data: reviews } = await getReviews();
  console.log(reviews);

  return (
    <div className="grid gap-6">
      {reviews.map((review: any) => (
        <div key={review.id} className="flex gap-4 rounded-lg border p-4">
          <Image
            src={review.movie.thumbnail}
            alt={review.movie.title}
            width={100}
            height={150}
            className="rounded-md object-cover"
          />

          <div className="flex-1">
            <Link
              href={`/movies/${review.movie.slug}`}
              className="text-xl font-semibold text-yellow-400 underline"
            >
              {review.movie.title}
            </Link>

            <p className="text-sm text-muted-foreground">
              ⭐ {review.rating}/10
            </p>

            <p className="mt-2 line-clamp-3">{review.content}</p>

            <div className="mt-3 flex gap-2">
              <span className="rounded bg-secondary px-2 py-1 text-xs">
                {review.status}
              </span>

              {review.isEdited && (
                <span className="rounded bg-yellow-500 px-2 py-1 text-xs text-white">
                  Edited
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
