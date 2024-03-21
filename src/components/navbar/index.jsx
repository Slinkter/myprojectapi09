import React, { useContext } from "react";
import { GlobalContext } from "../../context";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { searchParam, setSearchParam, handleSubmit } =
    useContext(GlobalContext);

  console.log(searchParam);
  console.log("---");
  console.log(setSearchParam);
  console.log("---");
  console.log(handleSubmit);

  return (
    <nav>
      <h2>
        <NavLink>FoodRecipe</NavLink>
      </h2>
      <form></form>
      <ul>
        <li>
          <NavLink>Home</NavLink>
        </li>
        <li>
          <NavLink> Favorites </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
