# Despliegue y Calidad

## Estrategia de Despliegue

La aplicación está configurada para desplegarse en **GitHub Pages**.

### Pre-requisitos de Build

Vite se encarga de empaquetar la aplicación. El comando `npm run build` genera:

1.  Transpilación de JS moderno a compatible.
2.  Minificación de CSS/JS.
3.  Asset hashing para control de caché.
4.  Carpeta de salida: `dist/`.

### Proceso de Deploy Manual

```bash
# 1. Ejecutar build
npm run build

# 2. Desplegar carpeta dist (usando herramienta gh-pages)
npm run deploy
```

_Nota: El script `deploy` ejecuta `gh-pages -d dist`._

## Aseguramiento de Calidad (QA)

### Linting Estático

Se utiliza **ESLint** con configuración para React y Vite.

- **Comando:** `npm run lint`
- **Objetivo:** Prevenir errores de sintaxis, variables no usadas y violaciones de reglas de hooks de React.

### Validaciones Comunes

1.  **Prop Types:** Todos los componentes reutilizables (`RecipeItem`) deben validar sus props usando `prop-types` para asegurar la integridad de datos en runtime (modo desarrollo).
2.  **No Broken Links:** Verificar que todas las rutas internas funcionan.
3.  **Manejo de estados vacíos:** Verificar que la UI no se rompa si la búsqueda retorna 0 resultados (UI muestra mensaje de feedback).
