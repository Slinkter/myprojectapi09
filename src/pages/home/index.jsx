
import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";

const Home = () => {
    const { recipeList, loading, searchParam } = useContext(GlobalContext);

    if (loading) return <div className="loading-spinner"></div>;

    return (
        <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10 animate-fade-in">
            {recipeList && recipeList.length > 0 ? (
                recipeList.map((item) => <RecipeItem key={item.recipe_id} item={item} />)
            ) : (
                <div className="info-message">
                    <p>
                        {searchParam ? `No recipes found for "${searchParam}"` : "Nothing to show. Please search for a recipe."}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Home;

