import { useState, useEffect } from 'react';

/**
 * Custom hook for managing favorites.
 *
 * @returns {{
 *   favoritesList: Array<Object>,
 *   handleAddToFavorite: (item: Object) => void
 * }}
 */
export const useFavorites = () => {
  const [favoritesList, setFavoritesList] = useState([]);

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

  /**
   * Toggles an item in the favorites list.
   *
   * @param {Object} getCurrentItem - The item to add or remove.
   */
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

  return { favoritesList, handleAddToFavorite };
};
