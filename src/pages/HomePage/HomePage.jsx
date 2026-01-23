/**
 * Home Page - Search Results Display
 *
 * **Funcionalidad:**
 * - Muestra los resultados de búsqueda de recetas
 * - Renderiza estado de carga (loading spinner)
 * - Renderiza estado vacío (sin resultados o sin búsqueda)
 * - Organiza recetas en grid responsive
 *
 * **Flujo de interacción:**
 * 1. Usuario llega a "/" (ruta raíz)
 * 2. Componente consume GlobalContext para obtener recipeList y loading
 * 3. Si loading === true: muestra spinner
 * 4. Si loading === false y recipeList.length > 0: muestra grid de cards
 * 5. Si loading === false y recipeList.length === 0: muestra mensaje
 *
 * **Estado y efectos secundarios:**
 * - No maneja estado local (stateless)
 * - No tiene efectos secundarios (no useEffect)
 * - Consume contexto: recipeList, loading, searchParam
 * - Es un componente de presentación puro
 *
 * **Decisiones de diseño:**
 * - Por qué Flexbox y no CSS Grid:
 *   * Flexbox con flex-wrap permite cards de tamaño fijo
 *   * Grid requeriría media queries complejas
 *   * Flexbox se adapta mejor a número variable de items
 * - Por qué mensaje diferente si hay searchParam:
 *   * Mejora UX: "No results for X" vs "Search something"
 *   * Usuario entiende que buscó algo que no existe
 *
 * **Motivo de existencia:**
 * - Página principal de la aplicación (landing page)
 * - Separa la lógica de búsqueda (hook) de la presentación (componente)
 * - Reutiliza RecipeCard para consistencia visual
 *
 * @component
 * @returns {JSX.Element} Página de inicio con resultados de búsqueda
 */

import { useContext } from 'react';
import { GlobalContext } from '@/entities/recipe/context/RecipeContext';
import RecipeCard from '@/entities/recipe/ui/RecipeCard/RecipeCard';

const HomePage = () => {
  const { recipeList, loading, searchParam } = useContext(GlobalContext);

  if (loading) return <div className="loading-spinner"></div>;

  return (
    <div className="recipe-grid animate-fade-in">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map(item => <RecipeCard key={item.recipe_id} item={item} />)
      ) : (
        <div className="col-span-full">
          <div className="info-message">
            <p>
              {searchParam
                ? `No recipes found for "${searchParam}"`
                : 'Nothing to show. Please search for a recipe.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
