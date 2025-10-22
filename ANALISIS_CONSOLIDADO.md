# Análisis Detallado del Proyecto: FoodRecipe

## 1. Descripción General

Este proyecto es una aplicación web de búsqueda de recetas de cocina construida con React. Permite a los usuarios buscar recetas, ver los detalles de las mismas y guardar sus recetas favoritas. La aplicación utiliza la API de `forkify-api` para obtener los datos de las recetas y está diseñada con un enfoque moderno y una interfaz de usuario intuitiva.

## 2. Estructura de Archivos

El proyecto sigue una estructura de carpetas bien organizada, separando las responsabilidades en diferentes directorios dentro de `src`:

-   `src/api`: Contiene la lógica para interactuar con la API externa.
-   `src/assets`: Almacena archivos estáticos como imágenes y SVGs.
-   `src/components`: Contiene componentes de React reutilizables.
-   `src/constants`: Almacena constantes utilizadas en toda la aplicación.
-   `src/context`: Contiene el estado global de la aplicación utilizando el Context API de React.
-   `src/pages`: Contiene los componentes de React que representan las diferentes páginas de la aplicación.

## 3. Componentes

A continuación se detallan los componentes reutilizables de la aplicación.

### 3.1. App

El componente `App` es el componente principal de la aplicación. Es responsable de configurar el enrutamiento y el diseño general de la página.

**Ubicación:** `src/App.jsx`

```jsx
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
```

**Funcionalidad:**

-   **Enrutamiento:** Utiliza `react-router-dom` para definir las rutas de la aplicación.
    -   `/`: Página de inicio (`Home`).
    -   `/favorites`: Página de favoritos (`Favorite`).
    -   `/recipe-item/:id`: Página de detalles de la receta (`Details`).
-   **Diseño:** Proporciona un diseño base con un fondo y estilos de texto definidos, y renderiza el componente `Navbar` en todas las páginas.

### 3.2. Navbar

El componente `Navbar` es la barra de navegación de la aplicación. Contiene el logotipo, un formulario de búsqueda y enlaces de navegación.

**Ubicación:** `src/components/navbar/index.jsx`

**Funcionalidad:**

-   **Navegación:** Proporciona enlaces a las páginas "Home" y "Favorites".
-   **Búsqueda:** Incluye un formulario de búsqueda que permite a los usuarios buscar recetas. La lógica de búsqueda se gestiona a través del `GlobalContext`.
-   **Sugerencias de Búsqueda:** Muestra una lista de sugerencias a medida que el usuario escribe en el campo de búsqueda.

**Hooks Utilizados:**

-   `useContext(GlobalContext)`: Para acceder al estado global y a las funciones relacionadas con la búsqueda.
-   `useRef`: Para detectar clics fuera de la barra de navegación y cerrar la lista de sugerencias.
-   `useEffect`: Para agregar y eliminar el detector de eventos de clic.

### 3.3. RecipeItem

El componente `RecipeItem` es una tarjeta que muestra un resumen de una receta.

**Ubicación:** `src/components/recipe-item/index.jsx`

```jsx
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const RecipeItem = ({ item }) => {
  return (
    <div className="card group">
      <div className="h-40 flex justify-center overflow-hidden items-center rounded-xl">
        <img src={item.image_url} alt={item.title} className="block w-full transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div>
        <span className="text-sm text-accent font-medium">
          {item.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-secondary transition-colors duration-300 group-hover:text-primary">
          {item.title}
        </h3>
        <Link
          to={`/recipe-item/${item.recipe_id}`}
          className="btn mt-4 inline-block"
        >
          Recipe Details
        </Link>
      </div>
    </div>
  );
};

RecipeItem.propTypes = {
    item: PropTypes.shape({
        image_url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        publisher: PropTypes.string.isRequired,
        recipe_id: PropTypes.string.isRequired,
    }).isRequired,
};

export default RecipeItem;
```

**Props:**

-   `item` (Object): Un objeto que contiene los datos de la receta.
    -   `image_url` (string): La URL de la imagen de la receta.
    -   `title` (string): El título de la receta.
    -   `publisher` (string): El editor de la receta.
    -   `recipe_id` (string): El ID único de la receta.

**Funcionalidad:**

-   Muestra la imagen, el editor y el título de la receta.
-   Proporciona un enlace a la página de detalles de la receta.

## 4. Páginas

A continuación se detallan las páginas de la aplicación.

### 4.1. Home

La página `Home` es la página principal de la aplicación. Muestra una lista de recetas basadas en la búsqueda del usuario.

**Ubicación:** `src/pages/home/index.jsx`

**Funcionalidad:**

-   Obtiene `recipeList`, `loading` y `searchParam` del `GlobalContext`.
-   Muestra un indicador de carga mientras se obtienen los datos.
-   Renderiza una lista de componentes `RecipeItem` con los resultados de la búsqueda.
-   Muestra un mensaje si no hay resultados o si no se ha realizado ninguna búsqueda.

### 4.2. Favorites

La página `Favorites` muestra la lista de recetas que el usuario ha guardado como favoritas.

**Ubicación:** `src/pages/favorites/index.jsx`

**Funcionalidad:**

-   Obtiene `favoritesList` del `GlobalContext`.
-   Renderiza una lista de componentes `RecipeItem` con las recetas favoritas.
-   Muestra un mensaje si no hay recetas en la lista de favoritos.

### 4.3. Details

La página `Details` muestra la información detallada de una receta específica.

**Ubicación:** `src/pages/details/index.jsx`

**Funcionalidad:**

-   Obtiene el `id` de la receta de los parámetros de la URL.
-   Utiliza el hook `useEffect` para buscar los detalles de la receta cuando el componente se monta o el `id` cambia.
-   Muestra la imagen, el editor, el título y la lista de ingredientes de la receta.
-   Proporciona un botón para agregar o eliminar la receta de la lista de favoritos. El color del botón cambia para proporcionar una retroalimentación visual clara.

## 5. Gestión de Estado

La aplicación utiliza el Context API de React para la gestión del estado global.

**Ubicación:** `src/context/index.jsx`

### 5.1. GlobalContext

`GlobalContext` es el objeto de contexto de React creado con `createContext(null)`.

### 5.2. GlobalState

`GlobalState` es el componente proveedor que envuelve a la aplicación y proporciona el estado global a todos los componentes descendientes.

**Estado Global:**

-   `loading` (boolean): Indica si una operación asíncrona (como una llamada a la API) está en progreso.
-   `searchParam` (string): Almacena el valor actual del campo de búsqueda.
-   `recipeList` (array): Almacena la lista de recetas obtenida de la API.
-   `favoritesList` (array): Almacena la lista de recetas favoritas del usuario.
-   `suggestions` (array): Almacena la lista de sugerencias de búsqueda filtradas.
-   `showSuggestions` (boolean): Controla la visibilidad de la lista de sugerencias.

**Funciones Globales:**

-   `handleSubmit(e)`: Se ejecuta al enviar el formulario de búsqueda. Llama a `fetchRecipes` y actualiza `recipeList`.
-   `handleAddToFavorite(getCurrentItem)`: Agrega o elimina una receta de `favoritesList`.
-   `handleSearch(value)`: Se ejecuta al cambiar el valor del campo de búsqueda. Actualiza `searchParam` y filtra las `suggestions`.

## 6. Interacción con la API

La lógica para interactuar con la API de recetas se encuentra en `src/api/index.js`.

### 6.1. fetchRecipes

```javascript
export const fetchRecipes = async (searchParam) => {
    try {
        const response = await fetch(`${API_URL}/search?q=${searchParam}`);
        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
};
```

-   **Propósito:** Obtiene una lista de recetas basada en un parámetro de búsqueda.
-   **Parámetros:** `searchParam` (string) - El término de búsqueda.
-   **Retorna:** Una promesa que se resuelve en un array de objetos de receta.

### 6.2. fetchRecipeDetails

```javascript
export const fetchRecipeDetails = async (id) => {
    try {
        const response = await fetch(`${API_URL}/get?rId=${id}`);
        const data = await response.json();
        return data.recipe;
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        throw error;
    }
};
```

-   **Propósito:** Obtiene los detalles de una receta específica.
-   **Parámetros:** `id` (string) - El ID de la receta.
-   **Retorna:** Una promesa que se resuelve en un objeto con los detalles de la receta.

## 7. Constantes

El proyecto utiliza archivos de constantes para almacenar valores estáticos.

-   `src/constants/index.js`:
    -   `API_URL`: La URL base de la API de `forkify-api`.
-   `src/constants/suggestions.js`:
    -   `suggestionList`: Un array de strings con sugerencias de búsqueda predefinidas.

## 8. Estilos

La aplicación utiliza **Tailwind CSS** para un desarrollo rápido y eficiente de la interfaz de usuario. Además, se definen algunos estilos personalizados y variables de color en `src/index.css`.

**Variables de Color CSS:**

Se definen variables de color CSS en `:root` para un tema consistente:

```css
:root {
    --color-primary: #c53030; /* Red-700 */
    --color-secondary: #2d3748; /* Gray-800 */
    --color-accent: #2b6cb0; /* Blue-600 */
    /* ... y más ... */
}
```

**Clases Personalizadas:**

Se definen clases de componentes personalizadas utilizando la directiva `@layer components` de Tailwind CSS, como `.btn` y `.card`, para encapsular estilos comunes y reutilizables.
