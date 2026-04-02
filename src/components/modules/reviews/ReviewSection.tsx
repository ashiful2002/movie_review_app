import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ReviewSection = ({ movie }: any) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Reviews</h3>
      <Separator />

      {movie?.reviews?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {movie.reviews.map((review: any) => {
            const user = review.user;

            return (
              <Card
                key={review.id}
                className="rounded-2xl border  hover:shadow-lg transition-all duration-300"
              >
                <CardContent className=" space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    {/* User */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 relative">
                        <Image
                          src={
                            user?.avatar ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          alt={user?.name || "User"}
                          fill
                          className="rounded-full object-cover border"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          {user?.name || "Anonymous"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                              review.rating >= 8
                                ? "bg-green-100 text-green-600"
                                : review.rating >= 5
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {review.rating}/10
                          </div>
                        </TooltipTrigger>

                        <TooltipContent>
                          <p>Rating: {review.rating} out of 10</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Content */}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {review.content}
                  </p>

                  {/* Tags */}
                  {review.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {review.tags.map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    {review.spoiler && (
                      <span className="text-red-500 font-medium">
                        ⚠ Spoiler
                      </span>
                    )}

                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        review.status === "APPROVED"
                          ? "bg-green-100 text-green-600"
                          : review.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {/* {review.status} */}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No reviews yet. Be the first to review this movie.
        </p>
      )}
    </div>
  );
};
export default ReviewSection;
