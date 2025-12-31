# Historias de Usuario

Este documento detalla las historias de usuario que describen la funcionalidad del sistema desde la perspectiva del usuario final.

## HU-01: Buscar inspiración culinaria
**Como** cocinero aficionado o persona hambrienta,
**Quiero** ingresar un ingrediente (ej. "chicken") o nombre de plato en un buscador,
**Para** ver una lista de opciones y variedades que puedo cocinar.

**Criterios de Aceptación:**
- El buscador debe estar siempre visible en la barra de navegación.
- Al presionar Enter, se debe mostrar un indicador de carga.
- Si no hay resultados, se debe mostrar un mensaje amigable.
- Si hay resultados, se deben mostrar en formato de tarjeta con imagen y título.

## HU-02: Guardar recetas favoritas
**Como** usuario recurrente,
**Quiero** marcar una receta como "Favorita" desde su página de detalles,
**Para** poder acceder a ella rápidamente en el futuro sin tener que buscarla nuevamente.

**Criterios de Aceptación:**
- Debe existir un botón claro de "Guardar/Eliminar" en la vista de detalle.
- El estado del botón debe reflejar si ya es favorita o no.
- La lista de favoritos se debe mantener incluso si cierro la pestaña del navegador.

## HU-03: Consultar lista de favoritos
**Como** usuario organizado,
**Quiero** ver una página dedicada con todas mis recetas guardadas,
**Para** elegir rápidamente qué cocinar basándome en mi selección previa.

**Criterios de Aceptación:**
- Acceso directo a "Favoritos" desde el menú principal.
- Si la lista está vacía, mostrar un mensaje invitando a buscar recetas.
- Las tarjetas en favoritos deben comportarse igual que en la búsqueda (clic lleva a detalles).

## HU-04: Ver detalles de preparación
**Como** cocinero,
**Quiero** ver la lista completa de ingredientes y el tiempo de cocción,
**Para** preparar el plato correctamente.

**Criterios de Aceptación:**
- La página de detalle debe cargar la información específica de la receta seleccionada.
- Los ingredientes deben listarse claramente.
- Debe mostrarse el nombre del editor/fuente de la receta.
