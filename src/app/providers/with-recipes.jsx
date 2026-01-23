/**
 * Recipe Context Provider - Composition Layer
 *
 * **Funcionalidad:**
 * - Compone múltiples custom hooks en un único provider
 * - Expone estado y acciones de recetas al árbol de componentes
 * - Actúa como capa de integración entre features independientes
 *
 * **Flujo de composición:**
 * 1. useFavorites() inicializa y gestiona la lista de favoritos
 * 2. useSearch() inicializa y gestiona búsqueda + resultados
 * 3. Ambos hooks se ejecutan independientemente (sin dependencias cruzadas)
 * 4. Los valores retornados se combinan en un objeto de contexto
 * 5. GlobalContext.Provider distribuye el estado a componentes hijos
 *
 * **Patrón de Composición de Hooks:**
 * - Cada hook encapsula una feature completa (búsqueda o favoritos)
 * - Este provider NO contiene lógica de negocio propia
 * - Es un "thin wrapper" que solo orquesta la composición
 * - Facilita testing: cada hook se puede testear aisladamente
 *
 * **Estado y efectos secundarios:**
 * - Estado delegado completamente a los hooks
 * - Efectos secundarios (localStorage, API) manejados en los hooks
 * - Este componente es "puro" en términos de lógica de negocio
 *
 * **Decisiones arquitectónicas:**
 * - Por qué NO usar Redux:
 *   * Overhead innecesario para una app de tamaño medio
 *   * Context + Hooks provee suficiente capacidad
 *   * Menos boilerplate, más mantenible
 * - Por qué separar en múltiples hooks:
 *   * Single Responsibility Principle
 *   * Reusabilidad (hooks pueden usarse fuera del contexto)
 *   * Testing más simple (unit tests por hook)
 *
 * **Motivo de existencia:**
 * - Evita prop drilling en componentes profundamente anidados
 * - Centraliza la composición de features en un solo lugar
 * - Provee un punto de extensión para agregar nuevos hooks
 * - Separa la lógica de negocio (hooks) de la distribución (provider)
 *
 * @component
 * @param {object} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes hijos que consumirán el contexto
 * @returns {JSX.Element} Provider con contexto global de recetas
 *
 * @example
 * // Uso en main.jsx
 * <RecipeProvider>
 *   <App />
 * </RecipeProvider>
 *
 * @example
 * // Consumo en componentes
 * const { recipeList, handleSearch } = useContext(GlobalContext);
 */

import PropTypes from 'prop-types';
import { GlobalContext } from '@/entities/recipe/context/RecipeContext';
import { useFavorites } from '@/features/toggle-favorite/useFavorites';
import { useSearch } from '@/features/search-recipes/useSearch';

const RecipeProvider = ({ children }) => {
  // Feature 1: Gestión de favoritos (independiente)
  const { favoritesList, handleAddToFavorite } = useFavorites();

  // Feature 2: Gestión de búsqueda (independiente)
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
        // Search feature
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
        // Favorites feature
        favoritesList,
        handleAddToFavorite,
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
