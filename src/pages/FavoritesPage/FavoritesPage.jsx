import { useContext } from 'react';
import { GlobalContext } from '@/entities/recipe/context/RecipeContext';
import RecipeCard from '@/entities/recipe/ui/RecipeCard/RecipeCard';

const FavoritesPage = () => {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10 animate-fade-in">
      {favoritesList && favoritesList.length > 0 ? (
        favoritesList.map(item => <RecipeCard key={item.recipe_id} item={item} />)
      ) : (
        <div className="info-message">
          <p>Nothing is added in favorites.</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
