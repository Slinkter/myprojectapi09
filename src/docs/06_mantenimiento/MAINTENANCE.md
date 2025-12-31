# Mantenimiento y Roadmap

## Roadmap (Mejoras Futuras)

Estas son funcionalidades sugeridas para futuras iteraciones del proyecto:

### Corto Plazo
-   [ ] **Paginación:** Implementar paginación en los resultados de búsqueda (Forkify API soporta esto).
-   [ ] **Filtros:** Añadir filtros por tipo de comida (ej. Vegan, Gluten-free) si la API lo permite o filtrando en cliente.
-   [ ] **Feedback visual:** Mejorar esqueletos de carga (Skeletons) en lugar de un spinner simple.

### Largo Plazo
-   [ ] **Backend Propio:** Integrar Firebase para guardar favoritos en la nube (autenticación real).
-   [ ] **Lista de Compras:** Permitir seleccionar ingredientes y enviarlos a una lista de compras.
-   [ ] **PWA:** Convertir la app en Progressive Web App para instalación en móviles.

## Changelog

### v1.0.0 - Versión Inicial (Actual)
-   Integración completa con Forkify API v2.
-   Sistema de búsqueda con autocompletado básico.
-   Gestión de favoritos en LocalStorage.
-   Diseño responsive con Tailwind CSS.
-   Documentación técnica estructurada.

## Deuda Técnica
1.  **Manejo de Errores UI:** Actualmente los errores de API se ven en consola. Debería implementarse un componente `Toaster` para notificar al usuario visualmente.
2.  **Testing:** No existen pruebas unitarias ni de integración (Jest/Vitest). Es prioridad añadir tests para `GlobalContext`.
