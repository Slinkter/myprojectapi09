/**
 * Recipe Card - Reusable Recipe Display Component
 *
 * **Funcionalidad:**
 * - Muestra información resumida de una receta (imagen, título, publisher)
 * - Provee link a la página de detalles
 * - Implementa hover effects para mejor UX
 * - Optimizado con React.memo para evitar re-renders innecesarios
 *
 * **Flujo de interacción:**
 * 1. Componente recibe prop `item` con datos de receta
 * 2. Renderiza imagen con hover scale effect
 * 3. Muestra publisher (pequeño, color accent)
 * 4. Muestra título (grande, bold, truncado si es muy largo)
 * 5. Usuario hace hover → imagen hace zoom, título cambia de color
 * 6. Usuario hace clic en "Recipe Details" → navega a /recipe/:id
 *
 * **Estado y efectos secundarios:**
 * - No maneja estado local (stateless)
 * - No tiene efectos secundarios (pure component)
 * - Recibe datos vía props (unidirectional data flow)
 *
 * **Optimización con React.memo:**
 * - React.memo evita re-renders si las props no cambian
 * - Importante porque este componente se renderiza múltiples veces (lista)
 * - Comparación shallow de props (suficiente para objetos inmutables)
 * - Mejora performance en listas largas (>20 items)
 *
 * **Decisiones de diseño:**
 * - Por qué React.memo:
 *   * Componente se renderiza en listas (HomePage, FavoritesPage)
 *   * Props son estables (recetas no cambian frecuentemente)
 *   * Evita re-renders cuando otros items cambian
 * - Por qué truncate en título:
 *   * Títulos largos rompen el layout
 *   * Mantiene cards de altura consistente
 *   * Usuario puede ver título completo en DetailsPage
 * - Por qué group + group-hover:
 *   * Coordina hover entre imagen y título
 *   * Mejora affordance (usuario sabe que es clickeable)
 *   * Patrón común en cards modernas
 * - Por qué PropTypes y no TypeScript:
 *   * Proyecto usa JavaScript (no TypeScript)
 *   * PropTypes provee validación en desarrollo
 *   * Suficiente para un proyecto de este tamaño
 *
 * **Motivo de existencia:**
 * - Componente reutilizable en HomePage y FavoritesPage
 * - Encapsula la presentación de una receta
 * - Evita duplicación de código de UI
 * - Facilita cambios: modificar card en un solo lugar
 *
 * @component
 * @param {object} props - Props del componente
 * @param {object} props.item - Datos de la receta
 * @param {string} props.item.recipe_id - ID único de la receta
 * @param {string} props.item.title - Título de la receta
 * @param {string} props.item.publisher - Fuente/editor de la receta
 * @param {string} props.item.image_url - URL de la imagen
 * @returns {JSX.Element} Card de receta con link a detalles
 *
 * @example
 * <RecipeCard
 *   item={{
 *     recipe_id: "abc123",
 *     title: "Chocolate Cake",
 *     publisher: "BBC Good Food",
 *     image_url: "https://..."
 *   }}
 * />
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecipeCard = ({ item }) => {
  return (
    <div className="card group">
      {/* Card Header - Image */}
      <div className="card-header h-40">
        <img
          src={item.image_url}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Card Body - Content */}
      <div className="card-body">
        <span className="badge">{item.publisher}</span>
        <h3 className="font-bold text-2xl truncate text-secondary transition-colors duration-300 group-hover:text-primary">
          {item.title}
        </h3>
        <Link to={`/recipe/${item.recipe_id}`} className="btn mt-auto">
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
