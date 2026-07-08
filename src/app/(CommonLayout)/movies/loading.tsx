import MovieGridSkeleton from "@/components/modules/movies/MovieGridSkeleton";


export default function Loading() {
  return (
    <div className="space-y-4">
      <MovieGridSkeleton count={10} />
    </div>
  );
}

