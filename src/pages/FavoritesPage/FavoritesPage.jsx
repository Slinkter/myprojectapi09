/**
 * Favorites Page - Saved Recipes Display
 *
 * **Funcionalidad:**
 * - Muestra todas las recetas marcadas como favoritas
 * - Renderiza estado vacío si no hay favoritos
 * - Reutiliza RecipeCard para consistencia visual
 *
 * **Flujo de interacción:**
 * 1. Usuario navega a "/favorites"
 * 2. Componente consume GlobalContext para obtener favoritesList
 * 3. Si favoritesList.length > 0: muestra grid de cards
 * 4. Si favoritesList.length === 0: muestra mensaje invitando a buscar
 *
 * **Estado y efectos secundarios:**
 * - No maneja estado local (stateless)
 * - No tiene efectos secundarios (no useEffect)
 * - Consume contexto: favoritesList
 * - Es un componente de presentación puro
 *
 * **Decisiones de diseño:**
 * - Por qué reutilizar RecipeCard:
 *   * Consistencia visual con HomePage
 *   * DRY: no duplicar código de presentación
 *   * Mismo comportamiento (clic lleva a detalles)
 * - Por qué mensaje específico en estado vacío:
 *   * Guía al usuario sobre qué hacer
 *   * Mejora UX: no deja al usuario perdido
 *
 * **Motivo de existencia:**
 * - Provee acceso rápido a recetas guardadas
 * - Separa la vista de favoritos de la vista de búsqueda
 * - Permite al usuario gestionar sus recetas sin buscar nuevamente
 *
 * @component
 * @returns {JSX.Element} Página de favoritos
 */

import { useContext } from 'react';
import { GlobalContext } from '@/entities/recipe/context/RecipeContext';
import RecipeCard from '@/entities/recipe/ui/RecipeCard/RecipeCard';

const FavoritesPage = () => {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <div className="recipe-grid animate-fade-in">
      {favoritesList && favoritesList.length > 0 ? (
        favoritesList.map(item => <RecipeCard key={item.recipe_id} item={item} />)
      ) : (
        <div className="col-span-full">
          <div className="info-message">
            <p>Nothing is added in favorites.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
