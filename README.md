# API09: Buscador de Recetas 🍲

## 1. Descripción General

Esta aplicación es un buscador de recetas de cocina que consume datos de la API pública `forkify-api`. La interfaz permite a los usuarios buscar recetas por nombre, ver los detalles de cada una y mantener una lista de favoritos.

El proyecto está construido con React y Vite, aplicando principios de arquitectura de software moderna, con un enfoque en la separación de responsabilidades, una gestión de estado centralizada y una experiencia de usuario fluida y agradable.

## 2. Demo en Vivo

Puedes probar la aplicación en vivo aquí: **[https://slinkter.github.io/myprojectapi09](https://slinkter.github.io/myprojectapi09)**

## 3. Características Principales

-   **Búsqueda de Recetas:** Campo de búsqueda para encontrar recetas por ingrediente o nombre.
-   **Autocompletado Inteligente:** El buscador ofrece sugerencias en tiempo real para guiar al usuario hacia términos de búsqueda válidos.
-   **Vista de Detalles:** Al hacer clic en una receta, se muestra una vista detallada con la imagen, el editor, y la lista completa de ingredientes.
-   **Sistema de Favoritos:** Permite a los usuarios guardar sus recetas preferidas. La lista de favoritos es persistente durante la sesión.
-   **Diseño Responsivo (Mobile-First):** La interfaz está diseñada para funcionar y verse bien en cualquier dispositivo, desde móviles hasta ordenadores de escritorio.
-   **UI Mejorada:** Se han implementado animaciones y transiciones suaves para mejorar la experiencia de usuario, junto con indicadores de carga y mensajes de estado claros.

## 4. Tecnologías Utilizadas

-   **Framework Frontend:** React 18
-   **Gestión de Estado:** React Context API (`useContext` + `useState`)
-   **Enrutamiento:** React Router DOM v6
-   **Estilos:** Tailwind CSS
-   **Bundler:** Vite
-   **Linting:** ESLint

## 5. Arquitectura y Principios Aplicados

La arquitectura sigue un modelo basado en componentes con una estricta separación entre la lógica de negocio y la capa de presentación.

-   **Fuente Única de Verdad:** El estado global (lista de recetas, favoritos, término de búsqueda, sugerencias) se centraliza en `GlobalContext`, asegurando la consistencia de los datos en toda la aplicación.
-   **Inversión de Dependencias:** Los componentes de página (`Home`, `Details`) no dependen de la implementación de la lógica de estado, sino de la abstracción que provee el `GlobalContext`. Esto permite cambiar la lógica interna sin afectar a los componentes.
-   **Mantenibilidad de Estilos:** Se utiliza la directiva `@apply` de Tailwind CSS para consolidar grupos de utilidades en clases de componentes personalizadas (ej. `.card`, `.btn`) dentro de `index.css`, haciendo el código JSX más limpio y los estilos más fáciles de mantener.

## 6. Instalación y Ejecución Local

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/slinkter/myprojectapi09.git
    cd myprojectapi09
    ```

2.  **Instalar las dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

## 7. Scripts Disponibles

-   `npm run dev`: Inicia el servidor de desarrollo de Vite en modo de recarga rápida (HMR).
-   `npm run build`: Compila y empaqueta la aplicación para producción en el directorio `dist/`.
-   `npm run lint`: Ejecuta ESLint para analizar el código en busca de errores y advertencias.
-   `npm run preview`: Inicia un servidor local para previsualizar la compilación de producción.