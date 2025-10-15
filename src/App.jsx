import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Favorite from "./pages/favorites";
import Details from "./pages/details";

const App = () => {
    return (
        <div className=" ">
            <div className="min-h-screen p-4 sm:p-6 bg-bg-base text-text-base text-lg">
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
