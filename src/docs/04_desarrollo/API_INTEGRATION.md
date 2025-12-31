# Integración de API

El proyecto consume datos de **Forkify API v2**, una API pública y gratuita para recetas de cocina.

**Base URL:** `https://forkify-api.herokuapp.com/api/v2/recipes`

## Endpoints Consumidos

### 1. Búsqueda (`GET /search`)
Busca recetas que coincidan con un query.

-   **Función:** `fetchRecipes(searchParam)` en `src/api/index.js`
-   **URL:** `${API_URL}?search=${query}`
-   **Respuesta Transformada (Ejemplo):**
    ```json
    [
      {
        "publisher": "101 Cookbooks",
        "image_url": "http://...",
        "title": "Best Pizza Dough",
        "recipe_id": "47746g7..."
      }
    ]
    ```

### 2. Detalles (`GET /:id`)
Obtiene información completa de una receta específica.

-   **Función:** `fetchRecipeDetails(id)` en `src/api/index.js`
-   **URL:** `${API_URL}/${id}`
-   **Respuesta Transformada:**
    ```json
    {
      "publisher": "...",
      "ingredients": [ ... ],
      "source_url": "...",
      "image_url": "...",
      "title": "...",
      "servings": 4,
      "cooking_time": 45,
      "id": "..."
    }
    ```

## Manejo de Errores

Las funciones de API utilizan bloques `try/catch`. En caso de error de red o 4XX/5XX, el error se captura y se lanza para ser manejado por el componente o el contexto (actualmente se loguea en consola y detiene el loading).

## Notas de Implementación
-   No se requiere API Key para las consultas de lectura básicas utilizadas en este proyecto.
-   Límite de peticiones: Generoso, pero se recomienda no hacer polling agresivo.
