import { getAllGenres } from "@/services/genre";

const Genre = async () => {
  const allGenre = await getAllGenres();
  //   console.log(allGenre, "all genres");

  return <div>Genre</div>;
};

export default Genre;
