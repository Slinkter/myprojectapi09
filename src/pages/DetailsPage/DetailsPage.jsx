/**
 * Details Page - Recipe Full Information Display
 *
 * **Funcionalidad:**
 * - Muestra información completa de una receta específica
 * - Carga detalles desde la API usando el ID de la URL
 * - Permite agregar/quitar la receta de favoritos
 * - Renderiza imagen, ingredientes, publisher y botón de favorito
 *
 * **Flujo de interacción:**
 * 1. Usuario hace clic en "Recipe Details" desde HomePage o FavoritesPage
 * 2. React Router navega a "/recipe/:id"
 * 3. useParams() extrae el ID de la URL
 * 4. useEffect se ejecuta al montar y cuando cambia el ID
 * 5. fetchRecipeDetails(id) hace GET a la API
 * 6. setRecipeDetailsData() actualiza el estado local
 * 7. Componente renderiza los detalles
 * 8. Usuario puede hacer clic en "Add to favorites"
 * 9. handleAddToFavorite() actualiza favoritesList en contexto
 * 10. Botón cambia de estilo según si es favorito o no
 *
 * **Estado y efectos secundarios:**
 * - **Estados locales:**
 *   * recipeDetailsData: object | null - datos de la receta
 *   * loading: boolean - indica si está cargando
 * - **Efectos secundarios:**
 *   * useEffect: Ejecuta fetch cuando cambia el ID
 *   * fetchRecipeDetails(): HTTP GET a API externa
 * - **Contexto consumido:**
 *   * favoritesList: para verificar si es favorito
 *   * handleAddToFavorite: para toggle de favorito
 *
 * **Decisiones de diseño:**
 * - Por qué estado local y no contexto para recipeDetailsData:
 *   * Los detalles son específicos de esta página
 *   * No se necesitan en otros componentes
 *   * Evita contaminar el contexto global
 * - Por qué CSS Grid (lg:grid-cols-2):
 *   * Layout 50/50 en desktop (imagen | info)
 *   * Stack vertical en mobile (mejor UX)
 *   * Sticky image en desktop (permanece visible al scroll)
 * - Por qué verificar isFavorite con find():
 *   * Determina el texto y estilo del botón
 *   * Más eficiente que includes() con objetos
 *
 * **Motivo de existencia:**
 * - Provee vista detallada de una receta
 * - Separa la lógica de listado (HomePage) de la de detalle
 * - Permite deep linking (compartir URL de receta específica)
 * - Integra la funcionalidad de favoritos en el contexto de detalle
 *
 * @component
 * @returns {JSX.Element} Página de detalles de receta
 */

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '@/entities/recipe/context/RecipeContext';
import { fetchRecipeDetails } from '@/shared/api/recipes';

const DetailsPage = () => {
  const { id } = useParams();
  const { favoritesList, handleAddToFavorite } = useContext(GlobalContext);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRecipeDetails() {
      try {
        const recipe = await fetchRecipeDetails(id);
        setRecipeDetailsData(recipe);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getRecipeDetails();
  }, [id]);

  if (loading) return <div className="loading-spinner"></div>;
  if (!recipeDetailsData) return <div className="info-message">No recipe details found.</div>;

  const isFavorite = favoritesList.find(item => item.recipe_id === recipeDetailsData.recipe_id);

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="h-96 lg:sticky top-10">
        <div className="h-full overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData.image_url}
            alt={recipeDetailsData.title}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-accent font-medium">{recipeDetailsData.publisher}</span>
        <h3 className="font-bold text-3xl text-secondary">{recipeDetailsData.title}</h3>
        <div>
          <button
            className={`btn ${isFavorite ? 'bg-primary hover:bg-red-800' : 'hover:bg-primary'}`}
            onClick={() => handleAddToFavorite(recipeDetailsData)}
          >
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </button>
        </div>
        <div>
          <span className="font-bold text-2xl">Ingredients:</span>
          <ul className="flex flex-col gap-2 mt-4">
            {recipeDetailsData.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-lg">- {ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
