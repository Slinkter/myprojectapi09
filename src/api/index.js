
import { API_URL } from "../constants";

export const fetchRecipes = async (searchParam) => {
    try {
        const response = await fetch(`${API_URL}/search?q=${searchParam}`);
        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
};

export const fetchRecipeDetails = async (id) => {
    try {
        const response = await fetch(`${API_URL}/get?rId=${id}`);
        const data = await response.json();
        return data.recipe;
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        throw error;
    }
};
