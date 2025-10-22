import { API_URL } from '../constants';

/**
 * Fetch a list of recipes matching the search parameter.
 *
 * This function is a thin API wrapper. It encodes the query, performs a
 * fetch to the configured API endpoint and returns the `recipes` array from
 * the JSON payload. Errors are normalized by throwing an Error instance.
 *
 * @param {string} searchParam - The text query to search recipes for.
 * @returns {Promise<Array<Object>>} Resolves to an array of recipe objects.
 * @throws {Error} When the network request fails or the API returns a non-2xx status.
 */
export const fetchRecipes = async searchParam => {
  try {
    const q = encodeURIComponent(searchParam);
    const response = await fetch(`${API_URL}/search?q=${q}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    // API contract: { recipes: [...] }
    return data.recipes;
  } catch (error) {
    // Keep logging here for easier debugging during development; callers should
    // surface user-friendly messages.
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

/**
 * Fetch full details for a single recipe by id.
 *
 * Encodes the id and calls the API `get` endpoint. Returns the `recipe` object
 * from the response payload.
 *
 * @param {string} id - The recipe id to fetch details for.
 * @returns {Promise<Object>} Resolves to a recipe object.
 * @throws {Error} When the network request fails or the API returns a non-2xx status.
 */
export const fetchRecipeDetails = async id => {
  try {
    const rId = encodeURIComponent(id);
    const response = await fetch(`${API_URL}/get?rId=${rId}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data.recipe;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};
