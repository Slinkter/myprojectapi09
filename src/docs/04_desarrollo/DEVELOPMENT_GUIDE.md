# Guía de Desarrollo

## Configuración del Entorno

1.  **Node.js:** Asegúrate de tener Node.js (v16+) instalado.
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Variables de Entorno:**
    Actualmente no se requieren variables `.env` ya que la API es pública, pero la estructura soporta `import.meta.env` si fuera necesario.

## Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local (Vite). |
| `npm run build` | Compila la aplicación para producción en `/dist`. |
| `npm run lint` | Analiza el código con ESLint en busca de errores. |
| `npm run preview` | Previsualiza el build de producción localmente. |

## Estándares de Código

### Estilo y Formato
-   **Prettier:** Se utiliza para el formateo automático. Configuración en `.prettierrc`.
-   **ESLint:** Reglas estándar de React + Vite recomendadas.
-   **Naming Conventions:**
    -   Componentes: `PascalCase` (ej. `RecipeItem.jsx`).
    -   Funciones/Variables: `camelCase` (ej. `fetchRecipes`).
    -   Constantes: `UPPER_SNAKE_CASE` (ej. `API_URL`).

### Commits
Seguir el estándar **Conventional Commits**:
-   `feat:` Nueva funcionalidad.
-   `fix:` Corrección de error.
-   `docs:` Cambios en documentación.
-   `style:` Cambios de formato (espacios, puntos y comas).
-   `refactor:` Cambio de código que no añade features ni arregla bugs.

### Reglas de Directorios
-   **Importaciones:** Usar rutas absolutas (alias `@/`) cuando sea posible (configurado en `jsconfig.json`).
-   Un componente por archivo.
-   Estilos específicos de componente deben usar clases de Tailwind, no archivos CSS separados (salvo `index.css` global).
