# Glosario Técnico

Este documento define la terminología técnica utilizada en el proyecto **FoodRecipe**.

## Frontend Moderno

### SPA (Single Page Application)
Aplicación web que interactúa con el usuario reescribiendo la página actual dinámicamente con nuevos datos del servidor web, en lugar de cargar páginas completas desde el servidor.

### React Hooks
Funciones que permiten "enganchar" el estado de React y el ciclo de vida desde componentes funcionales.
-   **useState:** Permite añadir estado local a componentes funcionales.
-   **useEffect:** Permite llevar a cabo efectos secundarios (data fetching, suscripciones, cambios manuales en el DOM).
-   **excludeContext:** (No estándar, posiblemente error de tipeo) -> **useContext:** Permite acceder al contexto global.

### Utility-First CSS (Tailwind)
Metodología de estilizado donde se aplican clases predefinidas de bajo nivel (como `flex`, `pt-4`, `text-center`) directamente en el HTML/JSX, en lugar de escribir CSS semántico personalizado.

## Arquitectura

### Clean Architecture (Frontend)
Adaptación de los principios de Clean Architecture para el frontend, enfocada en separar la UI (Componentes) de la Lógica de Negocio (Hooks/Context) y de la infraestructura (API/Servicios).

### Flux Pattern (Simplificado)
Patrón de arquitectura de aplicaciones para construir interfaces de usuario de cliente. En este proyecto se implementa de forma simplificada mediante `Context` + `Actions` en `GlobalState`.

### Source of Truth (Fuente de la Verdad)
Principio que establece que para cualquier dato o estado, debe haber solo un lugar donde se almacena y se gestiona. En este proyecto, el `GlobalContext` es la fuente de la verdad para las recetas y favoritos.

## API y Datos

### Fetch API
Interfaz de JavaScript moderna para acceder y manipular el canal HTTP, tales como peticiones y respuestas. Reemplaza a `XMLHttpRequest`.

### Forkify API
API pública RESTful utilizada en este proyecto para obtener datos de recetas.

### LocalStorage
Mecanismo de almacenamiento web que permite guardar pares clave/valor en el navegador web sin fecha de expiración. Los datos persisten incluso después de cerrar el navegador.

## UI / UX

### Skeleton Loading
Patrón de diseño de interfaz que muestra una versión simplificada o "esqueleto" de la interfaz mientras se carga el contenido real, mejorando la percepción de velocidad.

### Mobile-First
Filosofía de diseño web que inicia el diseño desde la pantalla más pequeña (móvil) y se expande progresiva y adaptativamente hacia pantallas más grandes.
