
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { fetchRecipes } from "../api";
import { suggestionList } from "../constants/suggestions";

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [searchParam, setSearchParam] = useState("");
    const [recipeList, setRecipeList] = useState([]);
    const [favoritesList, setFavoritesList] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setShowSuggestions(false);
        try {
            const recipes = await fetchRecipes(searchParam);
            if (recipes) {
                setRecipeList(recipes);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    function handleAddToFavorite(getCurrentItem) {
        let copyFavoritesList = [...favoritesList];
        const index = copyFavoritesList.findIndex(
            (item) => item.recipe_id === getCurrentItem.recipe_id
        );

        if (index === -1) {
            copyFavoritesList.push(getCurrentItem);
        } else {
            copyFavoritesList = copyFavoritesList.filter(
                (item) => item.recipe_id !== getCurrentItem.recipe_id
            );
        }
        setFavoritesList(copyFavoritesList);
    }

    function handleSearch(value) {
        setSearchParam(value);
        if (value) {
            const filteredSuggestions = suggestionList.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                searchParam,
                loading,
                recipeList,
                favoritesList,
                suggestions,
                showSuggestions,
                setSearchParam,
                setShowSuggestions,
                handleSubmit,
                handleAddToFavorite,
                handleSearch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

GlobalState.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalState;







