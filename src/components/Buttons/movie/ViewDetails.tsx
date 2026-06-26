import {  ChevronRight } from "lucide-react";
import { ActionButton } from "./ActionButton";

const MovieDetails = ({ movieId }: { movieId: string }) => {
  return (
    <ActionButton className="hover:translate-y-1 transition-transform duration-300 ease-in-out cursor-pointer"
      href={`/movies/${movieId}`}
      variant="outline"
      icon={<ChevronRight />}
    >
      View Details
    </ActionButton>
  );
};

export default MovieDetails;
