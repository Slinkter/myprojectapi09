# Architecture

Este proyecto sigue una aproximación feature-based y está orientado por principios de Clean Architecture:

-   Capa de presentación (UI): `src/pages`, `src/components` — contienen componentes React que representan vistas y widgets.
-   Capa de dominio / servicios: `src/api`, `src/services` (si se crea) — lógica de negocio simple, mapeo de contratos externos.
-   Capa de infraestructura: llamadas a APIs, persistencia local (localStorage) — encapsulada en `src/api` y `src/context`.

Responsabilidad por carpeta

-   `src/api` — adaptadores HTTP; una función por endpoint. Mantén aquí la menor lógica posible (transformaciones pequeñas están permitidas).
-   `src/context` — orquesta el estado de la aplicación (use-cases simples: buscar recetas, añadir/quitar favoritos, persistencia).
-   `src/components` — componentes puros y reutilizables. Prefiere presentational components y separa containers si necesitan lógica.
-   `src/pages` — composición de componentes y mapeo de rutas.

Sugerencias concretas para Clean Architecture

-   Extraer use-cases en `src/usecases` o `src/services` cuando la lógica de negocio crezca (por ejemplo: `searchRecipesService(query)` que llame a `fetchRecipes` y normalize data).
-   Mantener `src/api` como adaptador a la API externa y devolver datos normalizados.
-   Evitar lógica de negocio pesada dentro de componentes; mover a hooks o services reutilizables.

Ejemplo: flow de búsqueda (altamente recomendable)

1. `UI (Home)` -> invoca `handleSubmit` desde `GlobalState`.
2. `GlobalState` llama a `searchRecipesService(query)` (o directamente `fetchRecipes`) y obtiene un resultado normalizado.
3. `GlobalState` actualiza `recipeList` y persiste `lastSearch` en localStorage.
