# Documentación de Arquitectura Definitiva: Buscador de Recetas

Este documento es la guía arquitectónica y técnica principal para el proyecto "Buscador de Recetas". Su propósito es servir como una clase magistral, utilizando este proyecto como caso de estudio para entender las decisiones estratégicas en el desarrollo de una aplicación React moderna.

---

## 1. Resumen Ejecutivo

-   **Aplicación:** Buscador de Recetas.
-   **Misión:** Proveer una interfaz de usuario rápida, fluida e intuitiva para que los usuarios busquen, exploren y guarden recetas de cocina obtenidas de una API externa.
-   **Público Objetivo:** Cualquier persona con interés en la cocina que valore una experiencia de usuario moderna y sin interrupciones.

---

## 2. Stack Tecnológico y Decisiones Clave

| Componente | Tecnología | Decisión Estratégica Detallada (El "Porqué") |
| :--- | :--- | :--- |
| **Framework** | React 18 | Se eligió por ser el estándar de la industria para UIs interactivas. Su modelo de componentes y ecosistema maduro lo hacen la opción más robusta y con mayor soporte comunitario. |
| **Bundler** | Vite | Se prefirió sobre alternativas como Webpack por su **experiencia de desarrollo superior**. Su HMR (Hot Module Replacement) casi instantáneo acelera drásticamente el ciclo de feedback al programar. |
| **Enrutamiento** | React Router DOM | Es la solución de-facto para el enrutamiento en SPAs de React. Su API declarativa con componentes como `<Routes>` y `<Route>` se integra de forma natural con la filosofía de React. |
| **Gestión de Estado**| React Context API | **Decisión clave:** Se optó por la solución nativa de React para manejar un estado global de complejidad media. Es la herramienta perfecta para evitar "prop drilling" sin incurrir en la sobrecarga de configuración y la curva de aprendizaje de librerías externas como **Redux**. |
| **Estilos** | Tailwind CSS | **Decisión clave:** Se adoptó la filosofía **Utility-First** para maximizar la velocidad de desarrollo y la consistencia del diseño. Esta elección implica descartar metodologías de nomenclatura manual (como **BEM**) a favor de la composición de clases atómicas directamente en el JSX. |
| **Linting** | ESLint | Imprescindible en cualquier proyecto profesional para forzar un estilo de código consistente, prevenir errores comunes y mejorar la mantenibilidad a largo plazo. |

---

## 3. Arquitectura Profunda: Un Análisis Comparativo

### 3.1. Arquitectura General: Single Page Application (SPA)

-   **Implementación:** El proyecto es una SPA pura, orquestada por Vite y React Router. `App.jsx` actúa como el punto de entrada que define un layout base y un conjunto de rutas que renderizan componentes de página sin recargar el navegador.
-   **Justificación Comparativa:** Para una aplicación de alta interacción como un buscador, la fluidez es crítica. Una SPA ofrece una experiencia de usuario superior a una **MPA (Multi-Page Application)** tradicional, que se sentiría lenta. No se optó por un framework híbrido como **Next.js (SSR/SSG)** porque el SEO del contenido dinámico (los resultados de búsqueda) no es una prioridad, y se prefirió la simplicidad de un stack de cliente puro sobre la complejidad de gestionar un entorno de servidor Node.js.

### 3.2. Gestión de Estado: Context API vs. Alternativas

-   **Implementación:** El estado global (recetas, favoritos, término de búsqueda) se encapsula en `src/context/index.jsx` y se provee a toda la aplicación. Los componentes acceden a él con el hook `useContext`.
-   **Justificación Comparativa:** Es el "punto dulce" para este proyecto. Es inmensamente superior a **Prop Drilling** (pasar props manualmente por múltiples niveles), que sería insostenible. Al mismo tiempo, evita la complejidad de **Redux**. Redux es una solución excelente para aplicaciones con un estado muy complejo, flujos de datos no lineales y la necesidad de herramientas avanzadas como middleware (para logging, etc.) y time-travel debugging. Para este proyecto, esa potencia es excesiva. La Context API resuelve el problema de forma nativa y elegante.

### 3.3. Estilos: La Filosofía Utility-First

-   **Implementación:** Los estilos se aplican directamente en el JSX mediante clases de Tailwind. No hay archivos `.css` o `.scss` por componente.
-   **Justificación Comparativa:** Esta es una elección filosófica. Se prioriza la velocidad y la co-ubicación del marcado y sus estilos. A diferencia de **BEM**, donde el desarrollador invierte tiempo en nombrar bloques y elementos (`.card__title`), con Tailwind se compone directamente el resultado (`font-bold text-xl`). A diferencia de **CSS-in-JS** (ej. Styled Components), se evita el overhead de runtime y se genera un archivo CSS estático y optimizado en el build, lo que puede ser más performante.

---

## 4. Código Crítico y Flujo de Datos (Análisis Detallado)

### 4.1. El Corazón del Estado: `src/context/index.jsx`

Este archivo es la implementación del **Provider Pattern** y la fuente única de verdad para el estado de la aplicación. Encapsula toda la lógica de negocio, desacoplando el estado de los componentes de la UI que lo consumen.

```javascript
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [searchParam, setSearchParam] = useState("");
    const [recipeList, setRecipeList] = useState([]);
    const [recipeDetailsData, setRecipeDetailsData] = useState(null);
    const [favoritesList, setFavoritesList] = useState([]);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${searchParam}`);
            const data = await res.json();
            if (data?.recipes) {
                setRecipeList(data?.recipes);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setSearchParam("");
        }
    }

    function handleAddToFavorite(getCurrentItem) {
        let copyFavoritesList = [...favoritesList];
        const index = copyFavoritesList.findIndex(
            (item) => item.recipe_id === getCurrentItem.recipe_id
        );

        if (index === -1) {
            copyFavoritesList.push(getCurrentItem);
        } else {
            copyFavoritesList.splice(index, 1);
        }
        setFavoritesList(copyFavoritesList);
    }

    return (
        <GlobalContext.Provider
            value={{
                searchParam,
                loading,
                recipeList,
                recipeDetailsData,
                favoritesList,
                setSearchParam,
                setRecipeDetailsData,
                handleSubmit,
                handleAddToFavorite,
            }}
        >
            {children}
        </Global-Context.Provider>
    );
};

export default GlobalState;
```

### 4.2. Flujo de Datos: Búsqueda de una Receta

Este diagrama ilustra cómo fluyen los datos durante la funcionalidad de búsqueda.

```mermaid
graph TD
    A[Usuario escribe en Navbar] --> B{Actualiza searchParam en Context vía setSearchParam};
    B --> C[Usuario presiona Enter];
    C --> D{Ejecuta handleSubmit en Context};
    D -- setLoading(true) --> E[Llamada fetch a API externa];
    E --> F{API responde con datos};
    F --> G{Actualiza recipeList en Context};
    G -- setLoading(false) --> H[Componente HomePage se re-renderiza];
    H --> I[Muestra nuevas recetas o mensaje de "cargando"];
```

---

## 5. Guía de Inicio

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).
