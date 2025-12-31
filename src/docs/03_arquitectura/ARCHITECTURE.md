# Arquitectura del Sistema

## Diagrama Conceptual

La aplicación sigue una arquitectura **Clean Frontend** simplificada, centrada en características (Feature-Based) y capas de responsabilidad claras.

```mermaid
graph TD
    User[Usuario] -->|Interactúa| UI[Capa de UI (Components/Pages)]
    UI -->|Consume Datos| GlobalState[Global Context (Estado)]
    GlobalState -->|Solicita Datos| API_Adapter[API Adapter (fetch)]
    API_Adapter -->|HTTP Request| ExternalAPI[Forkify API]
    GlobalState -->|Persiste| LocalStorage[(LocalStorage)]
```

## Estructura de Directorios

```
src/
├── api/             # Adaptadores de comunicación con API externa
├── components/      # Componentes UI reutilizables (Átomos/Moléculas)
│   ├── navbar/
│   └── recipe-item/
├── context/         # Gestión de estado global (Flux-like)
├── pages/           # Vistas principales (Rutas)
│   ├── home/
│   ├── favorites/
│   └── details/
├── constants/       # Configuraciones y valores estáticos
└── docs/            # Documentación del proyecto
```

## Decisiones Arquitectónicas

### 1. Gestión de Estado: React Context
**Decisión:** Se utiliza `GlobalContext` para manejar el estado de la aplicación (recetas, favoritos, loading).
**Justificación:** Dado el tamaño mediano de la aplicación, Redux sería excesivo. Context API provee suficiente capacidad para evitar *prop-drilling* sin añadir complejidad de boilerplate.

### 2. Capa de API Independiente
**Decisión:** Las llamadas `fetch` se aíslan en `src/api/index.js`.
**Justificación:** Permite cambiar el proveedor de datos (ej. cambiar Forkify por otra API) sin modificar los componentes de UI. Cumple con el Principio de Responsabilidad Única.

### 3. Estilos: Utility-First (Tailwind)
**Decisión:** Uso de Tailwind CSS.
**Justificación:** Acelera el desarrollo, asegura consistencia en el diseño y reduce el tamaño del bundle de CSS final mediante purgado.

### 4. Routing
**Decisión:** React Router DOM v6.
**Justificación:** Estándar de la industria para SPAs en React.
