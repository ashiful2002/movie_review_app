import MyFavourite from "@/components/modules/user/favourite/MyFavourite";
import { getFavourite } from "@/services/favourite";

const FavouritePage = async () => {
  const result = await getFavourite();
  const favouriteMovies = result?.data ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <MyFavourite favouriteMovies={favouriteMovies || []} />
    </div>
  );
};

export default FavouritePage;
