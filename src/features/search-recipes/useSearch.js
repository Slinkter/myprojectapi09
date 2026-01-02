import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRecipes } from '@/shared/api/recipes';
import { suggestionList } from '@/shared/constants/suggestions';

/**
 * Custom hook for managing search functionality.
 *
 * @returns {{
 *  searchParam: string,
 *  loading: boolean,
 *  recipeList: Array<Object>,
 *  suggestions: Array<string>,
 *  showSuggestions: boolean,
 *  setSearchParam: (value: string) => void,
 *  setShowSuggestions: (value: boolean) => void,
 *  handleSubmit: (e: Event) => Promise<void>,
 *  handleSearchSubmit: (value?: string) => Promise<void>,
 *  handleSearch: (value: string) => void
 * }}
 */
export const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [searchParam, setSearchParam] = useState('');
  const [recipeList, setRecipeList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

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

  /**
   * Performs an async search and updates recipeList.
   *
   * @param {string} [value] - The search query.
   */
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

  /**
   * Submit handler for the search form.
   *
   * @param {Event} e - The form submission event.
   */
  async function handleSubmit(e) {
    e.preventDefault();
    await handleSearchSubmit(searchParam);
  }

  /**
   * Quick update of input and suggestions.
   *
   * @param {string} value - The search input value.
   */
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

  return {
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
  };
};
