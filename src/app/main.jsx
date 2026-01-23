/**
 * Application Entry Point - FoodRecipe SPA
 *
 * **Funcionalidad:**
 * - Inicializa la aplicación React montándola en el DOM
 * - Configura el routing client-side con React Router
 * - Establece el contexto global de recetas mediante el provider
 *
 * **Flujo de inicialización:**
 * 1. ReactDOM crea el root en el elemento #root del HTML
 * 2. BrowserRouter habilita navegación SPA sin recargas de página
 * 3. RecipeProvider inicializa el estado global (búsqueda + favoritos)
 * 4. App component renderiza la estructura principal y rutas
 *
 * **Decisiones arquitectónicas:**
 * - BrowserRouter envuelve RecipeProvider (no al revés) porque:
 *   * Los hooks del provider pueden necesitar useNavigate()
 *   * El contexto de routing debe estar disponible antes que el estado
 * - No usamos StrictMode en producción para evitar doble-render
 *
 * **Motivo de existencia:**
 * - Punto de entrada único que orquesta la composición de providers
 * - Separa la lógica de inicialización del componente raíz
 * - Facilita testing al tener un entry point claramente definido
 *
 * @module main
 * @requires react-dom/client
 * @requires react-router-dom
 * @requires @/app/providers/with-recipes
 * @requires @/app/App
 */

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RecipeProvider from '@/app/providers/with-recipes.jsx';
import App from '@/app/App.jsx';
import '@/app/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <RecipeProvider>
      <App />
    </RecipeProvider>
  </BrowserRouter>
);
