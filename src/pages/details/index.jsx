import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

const Details = () => {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favoritesList,
    handleAddToFavorite,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      const url_api = `https://forkify-api.herokuapp.com/api/get?rId=${id}`;
      const res = await fetch(url_api);
      const data = await res.json();
      console.log(data.recipe);
      if (data) {
        setRecipeDetailsData(data.recipe);
      }
    }

    getRecipeDetails();
  }, []);

  console.log(favoritesList);
  return (
    <div className="container  mx-auto  py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2  lg:row-start-auto">
        <div className="h-full overflow-hidden rounded-xl group ">
          <img
            src={recipeDetailsData?.image_url}
            alt="img"
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm  text-cyan-700 font-medium">
          {recipeDetailsData?.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {recipeDetailsData?.title}
        </h3>
        <div>
          <button
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
            onClick={() => handleAddToFavorite(recipeDetailsData)}
          >
            {favoritesList &&
            favoritesList.length > 0 &&
            favoritesList.findIndex(
              (item) => item.recipe_id === recipeDetailsData.recipe_id
            ) !== -1
              ? "Remove from favorite"
              : "add to favorite"}
          </button>
        </div>
        <div>
          <span className="">Ingredients</span>
          <ul>
            {recipeDetailsData?.ingredients.map((ingredient) => (
              <li key={ingredient.recipe_id}>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;
