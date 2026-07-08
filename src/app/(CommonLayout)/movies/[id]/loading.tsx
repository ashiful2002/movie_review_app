import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function MovieDetailsSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-100 w-full">
        <Skeleton className="h-full w-full rounded-none" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <Skeleton className="h-12 w-1/2 max-w-md" />
          <Skeleton className="h-4 w-3/4 mt-3" />
          <Skeleton className="h-4 w-2/3 mt-1.5" />
          <div className="flex flex-wrap gap-2 mt-4">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-6 md:py-10 flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="w-full relative h-125 md:h-full">
          <Skeleton className="h-full w-full rounded" />
        </div>

        {/* Details */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>

          {/* Rating & Genres */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-16" />
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>

          <Separator />

          {/* Extra Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-9 w-28 rounded-md" />
            <Skeleton className="h-9 w-28 rounded-md" />
            <Skeleton className="h-9 w-32 rounded-md" />
          </div>
        </div>
      </div>

      <Separator className="mb-3" />

      {/* Review Section */}
      <div className="container mx-auto space-y-4 pb-10">
        <Skeleton className="h-6 w-40" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-10 w-10 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}