import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../../context";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const { searchParam, handleSubmit, handleSearch, suggestions, showSuggestions, setSearchParam, setShowSuggestions } =
        useContext(GlobalContext);
    const navRef = useRef(null);

    function handleSuggestionClick(suggestion) {
        setSearchParam(suggestion);
        setShowSuggestions(false);
        // Optionally, you can trigger the search immediately after clicking a suggestion
        // handleSubmit({ preventDefault: () => {} });
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setShowSuggestions]);

    return (
        <nav ref={navRef} className="flex flex-col md:flex-row justify-between items-center py-8 container mx-auto gap-5 md:gap-0">
            <h2 className="text-2xl font-semibold">
                <NavLink to={"/"} className="nav-link">
                    FoodRecipe
                </NavLink>
            </h2>
            <form onSubmit={handleSubmit} className="w-full md:w-auto">
                <div className="relative">
                    <div className="flex w-full">
                        <input
                            type="text"
                            placeholder="Enter recipe..."
                            className="search-input-left"
                            name="search"
                            value={searchParam}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <button type="submit" className="search-btn-right">Search</button>
                    </div>
                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="suggestions-list w-full">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </form>
            <ul className="flex gap-5">
                <li>
                    <NavLink
                        to={"/"}
                        className="nav-link"
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={"/favorites"}
                        className="nav-link"
                    >
                        Favorites
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
