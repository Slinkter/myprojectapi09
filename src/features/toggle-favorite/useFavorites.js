import { useState, useEffect } from 'react';

/**
 * Custom Hook: Favorites Management Feature
 *
 * **Funcionalidad:**
 * - Gestiona la lista de recetas marcadas como favoritas
 * - Implementa toggle (agregar/quitar) de favoritos
 * - Persiste favoritos en localStorage para permanencia entre sesiones
 * - Sincroniza estado con almacenamiento local automáticamente
 *
 * **Flujo de interacción / ejecución:**
 * 1. **Montaje inicial:**
 *    - useEffect #1 se ejecuta una vez al montar
 *    - Intenta leer 'favoritesList' desde localStorage
 *    - Si existe y es JSON válido, restaura el estado
 *    - Si no existe o es inválido, mantiene array vacío []
 * 2. **Usuario hace clic en "Add to favorites":**
 *    - DetailsPage llama handleAddToFavorite(recipeObject)
 *    - Hook verifica si recipe_id ya existe en favoritesList
 *    - Si NO existe: agrega al array (push)
 *    - Si SÍ existe: remueve del array (filter)
 * 3. **Actualización de estado:**
 *    - setFavoritesList() actualiza el estado de React
 *    - useEffect #2 detecta el cambio
 *    - Serializa el array a JSON
 *    - Guarda en localStorage con key 'favoritesList'
 * 4. **Renderizado:**
 *    - Componentes que consumen el contexto se re-renderizan
 *    - FavoritesPage muestra la lista actualizada
 *    - DetailsPage actualiza el estado del botón
 *
 * **Estado y efectos secundarios:**
 * - **Estados locales:**
 *   * favoritesList: Array<Recipe> - lista de recetas favoritas
 *
 * - **Efectos secundarios:**
 *   * useEffect #1 (mount): Lee localStorage una vez
 *   * useEffect #2 (favoritesList change): Escribe en localStorage
 *   * localStorage.setItem(): Persiste datos en el navegador
 *   * localStorage.getItem(): Recupera datos del navegador
 *
 * **Decisiones de diseño:**
 * - Por qué toggle en lugar de add/remove separados:
 *   * Simplifica la UI (un solo botón)
 *   * Menos propenso a errores de estado
 *   * Patrón común en favoritos (GitHub stars, Twitter likes)
 * - Por qué localStorage y no cookies:
 *   * Mayor capacidad (5-10MB vs 4KB)
 *   * No se envía en cada request HTTP
 *   * API más simple (getItem/setItem)
 * - Por qué usar recipe_id como identificador:
 *   * Garantizado único por la API
 *   * Más confiable que comparar por título
 * - Por qué copiar array antes de mutar:
 *   * Inmutabilidad: React detecta cambios correctamente
 *   * Evita bugs sutiles de referencia
 *   * Facilita debugging (estado anterior vs nuevo)
 *
 * **Motivo de existencia:**
 * - Encapsula TODA la lógica de favoritos en un solo lugar
 * - Evita duplicación de lógica de localStorage
 * - Facilita testing: se puede testear sin renderizar componentes
 * - Cumple Single Responsibility: solo maneja favoritos
 * - Desacopla la persistencia de la UI
 *
 * @hook
 * @returns {object} Estado y acciones de favoritos
 * @returns {Array<object>} return.favoritesList - Lista de recetas favoritas
 * @returns {function} return.handleAddToFavorite - Toggle de favorito (add/remove)
 *
 * @example
 * // Uso en RecipeProvider
 * const { favoritesList, handleAddToFavorite } = useFavorites();
 *
 * @example
 * // Uso en DetailsPage
 * const { favoritesList, handleAddToFavorite } = useContext(GlobalContext);
 * const isFavorite = favoritesList.find(item => item.recipe_id === currentRecipe.recipe_id);
 * <button onClick={() => handleAddToFavorite(currentRecipe)}>
 *   {isFavorite ? 'Remove' : 'Add'}
 * </button>
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
