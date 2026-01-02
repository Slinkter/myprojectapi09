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
