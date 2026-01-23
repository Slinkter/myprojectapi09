/**
 * API Service Layer - Forkify API Integration
 *
 * **Funcionalidad:**
 * - Provee funciones para interactuar con la API externa de Forkify
 * - Encapsula toda la lógica de comunicación HTTP
 * - Normaliza errores y respuestas de la API
 * - Actúa como única fuente de verdad para endpoints
 *
 * **Arquitectura:**
 * - Thin wrapper sobre fetch API nativa
 * - No maneja estado (stateless)
 * - Retorna promesas que resuelven a datos o rechazan con errores
 * - Permite cambiar el proveedor de API sin afectar componentes
 *
 * **Decisiones de diseño:**
 * - Por qué fetch nativo y no axios:
 *   * Reduce bundle size (~10KB menos)
 *   * Suficiente para necesidades simples (GET requests)
 *   * Nativo en todos los navegadores modernos
 * - Por qué async/await y no .then():
 *   * Código más legible y mantenible
 *   * Manejo de errores más claro con try/catch
 *   * Estándar moderno de JavaScript
 *
 * @module shared/api/recipes
 */

import { API_URL } from '../constants';

/**
 * Fetch a list of recipes matching the search parameter.
 *
 * **Funcionalidad:**
 * - Realiza búsqueda de recetas en la API de Forkify
 * - Codifica el parámetro de búsqueda para URLs seguras
 * - Retorna array de recetas o lanza error
 *
 * **Flujo de ejecución:**
 * 1. Codifica searchParam con encodeURIComponent (evita inyección)
 * 2. Construye URL completa con query parameter
 * 3. Realiza GET request a la API
 * 4. Valida que response.ok === true (status 200-299)
 * 5. Parsea JSON de la respuesta
 * 6. Extrae y retorna array de recipes
 * 7. Si hay error, lo loguea y lo re-lanza
 *
 * **Contrato de API:**
 * - Endpoint: `GET ${API_URL}/search?q={query}`
 * - Response exitosa (200):
 *   ```json
 *   {
 *     "status": "success",
 *     "results": 30,
 *     "recipes": [
 *       {
 *         "publisher": "101 Cookbooks",
 *         "image_url": "http://forkify-api.herokuapp.com/images/...",
 *         "title": "Best Pizza Dough Ever",
 *         "recipe_id": "47746"
 *       },
 *       ...
 *     ]
 *   }
 *   ```
 * - Response de error (4xx/5xx): Lanza Error con status code
 *
 * **Manejo de errores:**
 * - Network errors: Capturados y re-lanzados
 * - API errors (4xx/5xx): Convertidos a Error con mensaje descriptivo
 * - Callers deben manejar errores y mostrar UI apropiada
 *
 * **Decisiones de diseño:**
 * - Por qué encodeURIComponent:
 *   * Previene inyección de caracteres especiales
 *   * Asegura URLs válidas (espacios → %20)
 * - Por qué console.error antes de throw:
 *   * Facilita debugging en desarrollo
 *   * Logs aparecen en DevTools
 *   * Caller puede decidir cómo mostrar error al usuario
 *
 * @async
 * @function fetchRecipes
 * @param {string} searchParam - The text query to search recipes for (e.g., "pizza", "chicken")
 * @returns {Promise<Array<object>>} Resolves to an array of recipe objects
 * @returns {string} return[].recipe_id - Unique identifier for the recipe
 * @returns {string} return[].title - Recipe title
 * @returns {string} return[].publisher - Recipe source/publisher
 * @returns {string} return[].image_url - URL of recipe image
 * @throws {Error} When the network request fails or the API returns a non-2xx status
 *
 * @example
 * // Uso en useSearch hook
 * try {
 *   const recipes = await fetchRecipes('pizza');
 *   console.log(recipes); // [{ recipe_id: '47746', title: 'Pizza...', ... }]
 * } catch (error) {
 *   console.error('Failed to fetch recipes:', error);
 *   // Mostrar mensaje de error al usuario
 * }
 *
 * @example
 * // Búsqueda con caracteres especiales
 * const recipes = await fetchRecipes('chicken & rice');
 * // URL generada: /search?q=chicken%20%26%20rice
 */
export const fetchRecipes = async searchParam => {
  try {
    const q = encodeURIComponent(searchParam);
    const response = await fetch(`${API_URL}/search?q=${q}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    // API contract: { status, results, recipes: [...] }
    return data.recipes;
  } catch (error) {
    // Keep logging here for easier debugging during development; callers should
    // surface user-friendly messages.
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

/**
 * Fetch full details for a single recipe by id.
 *
 * **Funcionalidad:**
 * - Obtiene información completa de una receta específica
 * - Incluye ingredientes, tiempo de cocción, porciones
 * - Usado en DetailsPage para mostrar información completa
 *
 * **Flujo de ejecución:**
 * 1. Codifica recipe ID con encodeURIComponent
 * 2. Construye URL con query parameter rId
 * 3. Realiza GET request a la API
 * 4. Valida response.ok
 * 5. Parsea JSON de la respuesta
 * 6. Extrae y retorna objeto recipe
 * 7. Si hay error, lo loguea y lo re-lanza
 *
 * **Contrato de API:**
 * - Endpoint: `GET ${API_URL}/get?rId={recipe_id}`
 * - Response exitosa (200):
 *   ```json
 *   {
 *     "status": "success",
 *     "recipe": {
 *       "publisher": "101 Cookbooks",
 *       "ingredients": [
 *         "4 1/2 cups (20.25 ounces) unbleached high-gluten...",
 *         "1 3/4 (.44 ounce) teaspoons salt",
 *         ...
 *       ],
 *       "source_url": "http://www.101cookbooks.com/archives/001199.html",
 *       "image_url": "http://forkify-api.herokuapp.com/images/...",
 *       "title": "Best Pizza Dough Ever",
 *       "servings": "4",
 *       "cooking_time": "45",
 *       "recipe_id": "47746"
 *     }
 *   }
 *   ```
 *
 * **Decisiones de diseño:**
 * - Por qué parámetro rId y no id:
 *   * Contrato de API de Forkify requiere "rId"
 *   * Mantener consistencia con documentación de API
 * - Por qué retornar data.recipe directamente:
 *   * Simplifica el código del caller
 *   * Caller no necesita saber estructura de respuesta
 *
 * @async
 * @function fetchRecipeDetails
 * @param {string} id - The recipe id to fetch details for (e.g., "47746")
 * @returns {Promise<object>} Resolves to a recipe object with full details
 * @returns {string} return.recipe_id - Unique identifier
 * @returns {string} return.title - Recipe title
 * @returns {string} return.publisher - Recipe source
 * @returns {string} return.image_url - Image URL
 * @returns {Array<string>} return.ingredients - List of ingredients
 * @returns {string} return.servings - Number of servings
 * @returns {string} return.cooking_time - Cooking time in minutes
 * @returns {string} return.source_url - Original recipe URL
 * @throws {Error} When the network request fails or the API returns a non-2xx status
 *
 * @example
 * // Uso en DetailsPage
 * useEffect(() => {
 *   async function getRecipeDetails() {
 *     try {
 *       const recipe = await fetchRecipeDetails(id);
 *       setRecipeDetailsData(recipe);
 *     } catch (error) {
 *       console.log(error);
 *       // Mostrar mensaje de error al usuario
 *     }
 *   }
 *   getRecipeDetails();
 * }, [id]);
 */
export const fetchRecipeDetails = async id => {
  try {
    const rId = encodeURIComponent(id);
    const response = await fetch(`${API_URL}/get?rId=${rId}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    // API contract: { status, recipe: {...} }
    return data.recipe;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};
