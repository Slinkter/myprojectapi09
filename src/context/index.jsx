import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [searchParam, setSearchParam] = useState("");
    const [recipeList, setRecipeList] = useState([]);
    const [recipeDetailsData, setRecipeDetailsData] = useState(null);
    const [favoritesList, setFavoritesList] = useState([]);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            //
            const url_api = `https://forkify-api.herokuapp.com/api/search?q=${searchParam}`;
            //
            const res = await fetch(url_api);
            console.log("res : ", res);
            const data = await res.json();
            console.log("data : ", data);
            //
            if (data?.recipes) {
                setRecipeList(data?.recipes);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setSearchParam("");
        }
    }
    function handleAddToFavorite(getCurrentItem) {
        console.log(getCurrentItem);
        //
        let copyFavoritesList = [...favoritesList];
        const index = copyFavoritesList.findIndex(
            (item) => item.recipe_id === getCurrentItem.recipe_id
        );

        if (index === -1) {
            copyFavoritesList.push(getCurrentItem);
        } else {
            copyFavoritesList.splice(index);
        }
        setFavoritesList(copyFavoritesList);
    }

    return (
        <GlobalContext.Provider
            value={{
                searchParam,
                loading,
                recipeList,
                recipeDetailsData,
                favoritesList,
                setSearchParam,
                setRecipeDetailsData,
                handleSubmit,
                handleAddToFavorite,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalState;
