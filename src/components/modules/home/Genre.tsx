import { getAllGenres } from "@/services/genre";

const Genre = async () => {
  const allGenre = await getAllGenres();

  return (
    <div>
      <h1>Genres</h1>
      <ul>
        {allGenre?.data?.map((genre: any) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Genre;
