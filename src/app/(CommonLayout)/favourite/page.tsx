import MyFavourite from "@/components/modules/user/favourite/MyFavourite";
import { getFavourite } from "@/services/favourite";

const FavouritePage = async () => {
    const { data: favouriteMovies } = await getFavourite();

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <MyFavourite favouriteMovies={favouriteMovies} />
        </div>
    );
};

export default FavouritePage;
