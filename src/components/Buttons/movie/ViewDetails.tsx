import { Info } from "lucide-react";
import { ActionButton } from "./ActionButton";

const MovieDetails = ({ movie }: any) => {
  return (
    <ActionButton
      href={`/movies/${movie.id}`}
      variant="outline"
      icon={<Info />}
      size={"xs"}
    >
      View Details
    </ActionButton>
  );
};

export default MovieDetails;
