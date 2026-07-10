import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function MovieCardSkeleton() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Card className="overflow-hidden rounded-2xl shadow-2xl border">
        <CardHeader className="p-0 relative">
          <div className="relative h-64 w-full">
            <Skeleton className="h-full w-full rounded-none" />

            {/* Premium / year badges (top-left) */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>

            {/* Views badge (bottom-right) */}
            <div className="absolute bottom-3 right-3">
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5 space-y-2">
          {/* Title */}
          <Skeleton className="h-6 w-3/4" />

          {/* Description (2 lines) */}
          <div className="space-y-1.5 pt-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 pt-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-6" />
            <Skeleton className="h-3 w-8" />
          </div>

          {/* Cast badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="flex flex-col gap-3 justify-start items-start">
          {/* MovieDetails button */}
          <Skeleton className="h-9 w-28 rounded-md" />
          {/* BuySubscription button */}
          <Skeleton className="h-9 w-36 rounded-md" />
        </CardFooter>
      </Card>
    </div>
  );
}