"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RecentReview {
  id: string;
  rating: number;
  createdAt: string;
  movie: {
    title: string;
    thumbnail: string | null;
  };
}

interface RecentReviewsListProps {
  reviews: RecentReview[];
}

export function RecentReviewsList({ reviews }: RecentReviewsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reviews</CardTitle>
        <CardDescription>Your latest activity</CardDescription>
      </CardHeader>
      <CardContent>
        {reviews?.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            You haven&apos;t written any reviews yet.
          </p>
        ) : (
          <div className="space-y-4">
            {reviews?.map((review) => (
              <div
                key={review.id}
                className="flex items-center gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
              >
                <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                  {review.movie.thumbnail ? (
                    <Image
                      src={review.movie.thumbnail}
                      alt={review.movie.title}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {review.movie.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-amber-500 shrink-0">
                  <Star className="h-4 w-4 fill-amber-500" />
                  <span className="text-sm font-semibold">{review.rating}/10</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
