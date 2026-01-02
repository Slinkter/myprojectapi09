import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecipeCard = ({ item }) => {
  return (
    <div className="card group">
      <div className="h-40 flex justify-center overflow-hidden items-center rounded-xl">
        <img
          src={item.image_url}
          alt={item.title}
          className="block w-full transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div>
        <span className="text-sm text-accent font-medium">{item.publisher}</span>
        <h3 className="font-bold text-2xl truncate text-secondary transition-colors duration-300 group-hover:text-primary">
          {item.title}
        </h3>
        <Link to={`/recipe/${item.recipe_id}`} className="btn mt-4 inline-block">
          Recipe Details
        </Link>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  item: PropTypes.shape({
    image_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    recipe_id: PropTypes.string.isRequired,
  }).isRequired,
};

// 💡 Memoize to avoid unnecessary re-renders when props are stable
export default React.memo(RecipeCard);
