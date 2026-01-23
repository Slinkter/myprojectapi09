/**
 * Navbar - Global Navigation and Search Bar
 *
 * **Funcionalidad:**
 * - Provee navegación principal de la aplicación
 * - Implementa barra de búsqueda con sugerencias
 * - Maneja dropdown de sugerencias con filtrado
 * - Detecta clics fuera del dropdown para cerrarlo
 *
 * **Flujo de interacción:**
 * 1. **Búsqueda:**
 *    - Usuario escribe en input → handleSearch() actualiza searchParam
 *    - Hook useSearch filtra sugerencias y muestra dropdown
 *    - Usuario presiona Enter → handleSubmit() ejecuta búsqueda
 *    - Usuario hace clic en sugerencia → handleSuggestionClick() ejecuta búsqueda directa
 * 2. **Click Outside:**
 *    - useEffect registra listener global de mousedown
 *    - Si clic fuera de navRef → setShowSuggestions(false)
 *    - Cleanup: remueve listener al desmontar
 * 3. **Navegación:**
 *    - Usuario hace clic en "Home" o "Favorites"
 *    - NavLink cambia la URL sin reload (React Router)
 *
 * **Estado y efectos secundarios:**
 * - **No maneja estado local** (todo viene del contexto)
 * - **Contexto consumido:**
 *   * searchParam: valor actual del input
 *   * suggestions: array de sugerencias filtradas
 *   * showSuggestions: controla visibilidad del dropdown
 *   * handleSubmit: ejecuta búsqueda al submit del form
 *   * handleSearch: actualiza searchParam y filtra sugerencias
 *   * handleSearchSubmit: ejecuta búsqueda directa (sin form)
 *   * setSearchParam: actualiza el término de búsqueda
 *   * setShowSuggestions: muestra/oculta dropdown
 * - **Efectos secundarios:**
 *   * useEffect: Registra/limpia listener de click outside
 *   * useRef: Mantiene referencia al nav para detectar clics fuera
 *
 * **Decisiones de diseño:**
 * - Por qué useRef para click outside:
 *   * Evita re-renders innecesarios (ref no causa re-render)
 *   * Acceso directo al DOM para comparación de nodos
 *   * Patrón estándar para modals/dropdowns
 * - Por qué form con onSubmit:
 *   * Permite búsqueda con Enter (accesibilidad)
 *   * Previene reload de página con e.preventDefault()
 *   * Semántica HTML correcta (input + button en form)
 * - Por qué NavLink y no Link:
 *   * NavLink permite estilos activos (className activa)
 *   * Mejora UX: usuario sabe en qué página está
 * - Por qué input y button separados (no input type="search"):
 *   * Mayor control sobre estilos (rounded-l-full + rounded-r-full)
 *   * Botón visible mejora affordance (usuario sabe que puede buscar)
 *
 * **Motivo de existencia:**
 * - Componente global presente en todas las páginas
 * - Centraliza la funcionalidad de búsqueda en un solo lugar
 * - Provee navegación consistente en toda la app
 * - Separa la UI de búsqueda de la lógica (hook useSearch)
 *
 * @component
 * @returns {JSX.Element} Barra de navegación con búsqueda y links
 */

import { useContext, useEffect, useRef } from 'react';
import { GlobalContext } from '@/entities/recipe/context/RecipeContext';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const {
    searchParam,
    handleSubmit,
    handleSearch,
    handleSearchSubmit,
    suggestions,
    showSuggestions,
    setSearchParam,
    setShowSuggestions,
  } = useContext(GlobalContext);

  const navRef = useRef(null);

  function handleSuggestionClick(suggestion) {
    setSearchParam(suggestion);
    setShowSuggestions(false);
    if (handleSearchSubmit) handleSearchSubmit(suggestion);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowSuggestions]);

  return (
    <nav
      ref={navRef}
      className="flex flex-col md:flex-row justify-between items-center py-8 container mx-auto gap-5 md:gap-0"
    >
      <h2 className="text-2xl font-semibold">
        <NavLink to={'/'} className="nav-link">
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
              onChange={e => handleSearch(e.target.value)}
            />
            <button type="submit" className="search-btn-right">
              Search
            </button>
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
          <NavLink to={'/'} className="nav-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={'/favorites'} className="nav-link">
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
