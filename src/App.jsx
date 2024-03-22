import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Favorite from "./pages/favorites";
import Details from "./pages/details";

const App = () => {
  return (
    <div className=" ">
      <div className="min-h-screen p-6  text-gray-700 text-lg  border-red-800 border-8 bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/recipe-item/:id" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
