# Flujo de Datos

## Flujo 1: Búsqueda de Recetas

1.  **Trigger:** Usuario escribe en el input del `Navbar` y presiona Enter.
2.  **Action:** Se invoca `handleSubmit` en `GlobalState`.
3.  **Service:** `GlobalState` llama a `fetchRecipes(searchParam)` en `src/api`.
4.  **External:** `fetchRecipes` hace GET a `https://forkify-api.herokuapp.com/api/v2/recipes`.
5.  **State Update:**
    *   `loading` se establece en `true`.
    *   Al recibir datos, `recipeList` se actualiza con el array de resultados.
    *   `loading` pasa a `false`.
    *   `searchParam` es guardado en `localStorage`.
6.  **Render:** El componente `Home` observa el cambio en `recipeList` y renderiza las tarjetas `RecipeItem`.

## Flujo 2: Agregar a Favoritos

1.  **Trigger:** Usuario hace clic en "Save as Favorite" en la página `Details`.
2.  **Action:** Se invoca `handleAddToFavorite(currentItem)` en `GlobalState`.
3.  **Logic:**
    *   Se verifica si el ID del item ya existe en `favoritesList`.
    *   *Si existe:* Se filtra el array para eliminarlo.
    *   *Si no existe:* Se hace push del nuevo item al array.
4.  **Effect:** `favoritesList` actualizado se guarda inmediatamente en `localStorage`.
5.  **Render:** El botón cambia de estilo (negro a personalizado) para reflejar el estado.
