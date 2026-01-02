import PropTypes from 'prop-types';
import { GlobalContext } from '@/entities/recipe/context/RecipeContext';
import { useFavorites } from '@/features/toggle-favorite/useFavorites';
import { useSearch } from '@/features/search-recipes/useSearch';

/**
 * RecipeProvider
 *
 * Provides recipe-related state and actions to the application by composing
 * feature-specific hooks.
 */
const RecipeProvider = ({ children }) => {
  const { favoritesList, handleAddToFavorite } = useFavorites();
  const {
    searchParam,
    loading,
    recipeList,
    suggestions,
    showSuggestions,
    setSearchParam,
    setShowSuggestions,
    handleSubmit,
    handleSearchSubmit,
    handleSearch,
  } = useSearch();

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
        handleSearchSubmit,
        handleAddToFavorite,
        handleSearch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
