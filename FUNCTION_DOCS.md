# Function documentation

This file documents the main functions, their inputs/outputs and responsibilities.

## src/api/index.js

-   fetchRecipes(searchParam: string) => Promise<Array<Object>>

    -   Encodes the search param and calls the API endpoint `${API_URL}/search?q=`.
    -   Returns `data.recipes` from the API response.
    -   Errors: throws Error when response not ok or network fails.

-   fetchRecipeDetails(id: string) => Promise<Object>
    -   Calls `${API_URL}/get?rId=` and returns `data.recipe`.

## src/context/index.jsx

-   GlobalState (React component) — provider for application state:
    -   Exposes: searchParam, loading, recipeList, favoritesList, suggestions, showSuggestions, and methods: handleSubmit, handleSearchSubmit, handleAddToFavorite, handleSearch.
    -   Responsibilities: persist favorites and last search in localStorage, perform searches using `fetchRecipes`, and navigate to home on search.

## src/components/recipe-item/index.jsx

-   default export: memoized RecipeItem component
    -   Input: prop `item` with shape { image_url, title, publisher, recipe_id }
    -   Renders an image, publisher, title and a link to recipe details.
