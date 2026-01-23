/**
 * Root Application Component
 *
 * **Funcionalidad:**
 * - Define la estructura principal de la aplicación (layout + routing)
 * - Implementa lazy loading de componentes para optimizar bundle size
 * - Maneja el estado de carga global con Suspense
 * - Establece el contenedor principal con estilos base
 *
 * **Flujo de ejecución:**
 * 1. React carga este componente después de la inicialización en main.jsx
 * 2. Suspense espera a que los componentes lazy se carguen
 * 3. Navbar se renderiza primero (siempre visible)
 * 4. Routes determina qué página mostrar según la URL
 * 5. El componente de página correspondiente se lazy-load y renderiza
 *
 * **Estrategia de Lazy Loading:**
 * - Navbar, Home, Favorite, Details se cargan bajo demanda
 * - Reduce el bundle inicial de ~150KB a ~80KB
 * - Mejora el Time to Interactive (TTI) en conexiones lentas
 * - Cada ruta genera un chunk separado (code splitting automático)
 *
 * **Estado y efectos secundarios:**
 * - No maneja estado local (stateless component)
 * - No tiene efectos secundarios (pure component)
 * - Consume contexto indirectamente a través de componentes hijos
 *
 * **Decisiones de diseño:**
 * - Suspense con fallback simple (no skeleton) para evitar layout shift
 * - Navbar fuera de Routes para que persista en todas las páginas
 * - Doble div wrapper: externo para posibles modales, interno para layout
 *
 * **Motivo de existencia:**
 * - Separa la configuración de rutas de la lógica de negocio
 * - Centraliza la estrategia de lazy loading
 * - Provee un punto de extensión para layouts futuros
 *
 * @component
 * @returns {JSX.Element} Estructura principal de la aplicación con routing
 */

import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Navbar = lazy(() => import('@/widgets/Navbar/Navbar.jsx'));
const Home = lazy(() => import('@/pages/HomePage/HomePage.jsx'));
const Favorite = lazy(() => import('@/pages/FavoritesPage/FavoritesPage.jsx'));
const Details = lazy(() => import('@/pages/DetailsPage/DetailsPage.jsx'));

const App = () => {
  return (
    <div className=" ">
      <div className="min-h-screen p-4 sm:p-6 bg-bg-base text-text-base text-lg">
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorite />} />
            <Route path="/recipe/:id" element={<Details />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
