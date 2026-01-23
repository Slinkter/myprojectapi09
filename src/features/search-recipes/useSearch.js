import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRecipes } from '@/shared/api/recipes';
import { suggestionList } from '@/shared/constants/suggestions';

/**
 * Custom Hook: Search Recipes Feature
 *
 * **Funcionalidad:**
 * - Gestiona el estado completo de la funcionalidad de búsqueda
 * - Realiza llamadas a la API de recetas (Forkify)
 * - Implementa sistema de sugerencias con filtrado en cliente
 * - Persiste búsquedas en localStorage para UX mejorada
 * - Maneja navegación automática después de búsqueda exitosa
 *
 * **Flujo de interacción / ejecución:**
 * 1. **Montaje inicial:**
 *    - Se restaura última búsqueda desde localStorage
 *    - Si existe, se ejecuta automáticamente la búsqueda
 * 2. **Usuario escribe en input:**
 *    - handleSearch() actualiza searchParam
 *    - Filtra suggestionList en cliente (case-insensitive)
 *    - Muestra dropdown de sugerencias
 * 3. **Usuario hace submit (Enter o botón):**
 *    - handleSubmit() previene reload de página
 *    - Llama handleSearchSubmit() con el término actual
 * 4. **Ejecución de búsqueda:**
 *    - setLoading(true) para mostrar spinner
 *    - fetchRecipes() hace GET a API externa
 *    - Actualiza recipeList con resultados
 *    - Guarda searchParam en localStorage
 *    - Navega a "/" (home) para mostrar resultados
 *    - setLoading(false) oculta spinner
 * 5. **Usuario selecciona sugerencia:**
 *    - Navbar llama handleSearchSubmit(suggestion)
 *    - Se ejecuta búsqueda directamente sin esperar submit
 *
 * **Estado y efectos secundarios:**
 * - **Estados locales:**
 *   * loading: boolean - indica si hay búsqueda en progreso
 *   * searchParam: string - término de búsqueda actual
 *   * recipeList: Array<Recipe> - resultados de la búsqueda
 *   * suggestions: Array<string> - sugerencias filtradas
 *   * showSuggestions: boolean - controla visibilidad del dropdown
 *
 * - **Efectos secundarios:**
 *   * useEffect #1: Restaura última búsqueda al montar
 *   * useEffect #2: Persiste searchParam en localStorage
 *   * useEffect #3: Ejecuta búsqueda automática si hay término guardado
 *   * navigate(): Cambia URL sin reload (React Router)
 *   * fetchRecipes(): HTTP GET a API externa
 *
 * **Decisiones de diseño:**
 * - Por qué localStorage y no sessionStorage:
 *   * Persiste entre sesiones del navegador
 *   * Mejora UX: usuario vuelve y ve sus últimos resultados
 * - Por qué sugerencias en cliente (no API):
 *   * Lista estática de ingredientes comunes
 *   * Evita llamadas innecesarias a la API
 *   * Respuesta instantánea (mejor UX)
 * - Por qué navigate('/') después de búsqueda:
 *   * Asegura que el usuario vea los resultados
 *   * Funciona desde cualquier página (Favorites, Details)
 *
 * **Motivo de existencia:**
 * - Encapsula TODA la lógica de búsqueda en un solo lugar
 * - Evita duplicación: múltiples componentes pueden usar este hook
 * - Facilita testing: se puede testear sin renderizar componentes
 * - Cumple Single Responsibility: solo maneja búsqueda
 *
 * @hook
 * @returns {object} Estado y acciones de búsqueda
 * @returns {string} return.searchParam - Término de búsqueda actual
 * @returns {boolean} return.loading - Indica si hay búsqueda en progreso
 * @returns {Array<object>} return.recipeList - Lista de recetas encontradas
 * @returns {Array<string>} return.suggestions - Sugerencias filtradas
 * @returns {boolean} return.showSuggestions - Controla visibilidad del dropdown
 * @returns {function} return.setSearchParam - Actualiza término de búsqueda
 * @returns {function} return.setShowSuggestions - Muestra/oculta sugerencias
 * @returns {function} return.handleSubmit - Handler del form submit
 * @returns {function} return.handleSearchSubmit - Ejecuta búsqueda en API
 * @returns {function} return.handleSearch - Handler del input change + filtrado
 *
 * @example
 * // Uso en RecipeProvider
 * const {
 *   searchParam,
 *   loading,
 *   recipeList,
 *   handleSearch,
 *   handleSubmit
 * } = useSearch();
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
