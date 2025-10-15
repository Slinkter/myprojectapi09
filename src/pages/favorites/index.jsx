
import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";

const Favorite = () => {
    const { favoritesList } = useContext(GlobalContext);

    return (
        <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10 animate-fade-in">
            {favoritesList && favoritesList.length > 0 ? (
                favoritesList.map((item) => (
                    <RecipeItem key={item.recipe_id} item={item} />
                ))
            ) : (
                <div className="info-message">
                    <p>
                        Nothing is added in favorites.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Favorite;

