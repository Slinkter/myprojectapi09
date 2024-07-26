import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";

const Home = () => {
    const { recipeList, loading } = useContext(GlobalContext);

    if (loading) return <div> Loading ... Please wait!</div>;

    return (
        <div className="container flex flex-wrap justify-center items-center gap-10 py-8  mx-auto  ">
            {recipeList && recipeList.length > 0 ? (
                recipeList.map((item) => <RecipeItem key={item} item={item} />)
            ) : (
                <div>
                    <p>Nothing to show Please search something</p>
                    <pre>{JSON.stringify(recipeList, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Home;
