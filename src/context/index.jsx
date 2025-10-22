import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchRecipes } from '../api';
import { suggestionList } from '../constants/suggestions';
import { GlobalContext } from './context';

/**
 * GlobalState provider
 *
 * Exposes application-level state and actions. Public API (what consumers receive via
 * context):
 * - searchParam: string
 * - loading: boolean
 * - recipeList: Array<Object>
 * - favoritesList: Array<Object>
 * - suggestions: Array<string>
 * - showSuggestions: boolean
 * - setSearchParam, setShowSuggestions: setters
 * - handleSubmit(e): submit handler for search form
 * - handleSearchSubmit(value): performs an async search and updates recipeList
 * - handleAddToFavorite(item): toggle favorite
 * - handleSearch(value): quick update of input and suggestions
 */

const GlobalState = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchParam, setSearchParam] = useState('');
  const [recipeList, setRecipeList] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('favoritesList');
    if (stored) {
      try {
        setFavoritesList(JSON.parse(stored));
      } catch (e) {
        console.warn('Invalid favorites in localStorage', e);
      }
    }
  }, []);

  // Persist favorites to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('favoritesList', JSON.stringify(favoritesList));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage', e);
    }
  }, [favoritesList]);

  // Persist searchParam and restore previous search on mount
  useEffect(() => {
    const storedSearch = localStorage.getItem('lastSearch');
    if (storedSearch) {
      try {
        setSearchParam(storedSearch);
      } catch (e) {
        console.warn('Invalid lastSearch in localStorage', e);
      }
    }
  }, []);

  useEffect(() => {
    try {
      if (searchParam) {
        localStorage.setItem('lastSearch', searchParam);
      } else {
        localStorage.removeItem('lastSearch');
      }
    } catch (e) {
      console.warn('Failed to save lastSearch to localStorage', e);
    }
  }, [searchParam]);

  async function handleSearchSubmit(value) {
    const query = value ?? searchParam;
    if (!query) return;
    setLoading(true);
    setShowSuggestions(false);
    try {
      const recipes = await fetchRecipes(query);
      setRecipeList(recipes || []);
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // If there's a stored search when the app first mounts, run the search once
  useEffect(() => {
    const stored = localStorage.getItem('lastSearch');
    if (stored) {
      // avoid blocking mount - call async function
      (async () => {
        await handleSearchSubmit(stored);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await handleSearchSubmit(searchParam);
  }

  function handleAddToFavorite(getCurrentItem) {
    let copyFavoritesList = [...favoritesList];
    const index = copyFavoritesList.findIndex(item => item.recipe_id === getCurrentItem.recipe_id);

    if (index === -1) {
      copyFavoritesList.push(getCurrentItem);
    } else {
      copyFavoritesList = copyFavoritesList.filter(
        item => item.recipe_id !== getCurrentItem.recipe_id
      );
    }
    setFavoritesList(copyFavoritesList);
  }

  function handleSearch(value) {
    setSearchParam(value);
    if (value) {
      const filteredSuggestions = suggestionList.filter(item =>
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
        handleSearchSubmit,
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
