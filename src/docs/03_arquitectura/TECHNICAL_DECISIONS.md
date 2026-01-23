# Architecture Decision Records (ADRs)

Este documento registra las decisiones arquitectónicas clave tomadas en el proyecto FoodRecipe, siguiendo el formato ADR estándar.

---

## ADR-001: React Context API + Custom Hooks vs Redux

**Estado**: ✅ Aceptado  
**Fecha**: 2026-01-15  
**Decidido por**: Software Engineer (Trabajador 5)

### Contexto

El proyecto necesita gestión de estado global para:

- Lista de recetas de búsqueda
- Lista de favoritos
- Estado de loading
- Parámetro de búsqueda actual

Opciones evaluadas:

1. Redux + Redux Toolkit
2. React Context API + Custom Hooks
3. Zustand
4. Jotai

### Decisión

**Elegimos React Context API + Custom Hooks**

### Justificación

#### ✅ Ventajas

1. **Simplicidad**
   - No requiere dependencias externas
   - Menos boilerplate (~100 líneas vs ~300 con Redux)
   - Curva de aprendizaje baja

2. **Performance Suficiente**
   - App de tamaño medio (~10 componentes)
   - Estado no cambia frecuentemente
   - No hay necesidad de time-travel debugging

3. **Mantenibilidad**
   - Código más fácil de entender
   - Menos archivos (no actions, reducers, store)
   - Custom hooks reutilizables

4. **Bundle Size**
   - 0 KB adicionales (built-in en React)
   - Redux: ~10KB (gzipped)

#### ❌ Desventajas

1. **Escalabilidad Limitada**
   - Si la app crece a >20 features, puede volverse complejo
   - No hay DevTools nativos como Redux DevTools

2. **Re-renders**
   - Context re-renderiza todos los consumidores
   - Mitigado con: separación de contextos, React.memo

### Consecuencias

**Positivas**:

- Desarrollo más rápido
- Menos código que mantener
- Fácil onboarding de nuevos developers

**Negativas**:

- Si la app crece significativamente, migrar a Redux será necesario
- No hay middleware ecosystem (thunks, sagas)

### Cuándo Reconsiderar

Migrar a Redux si:

- App crece a >20 features
- Necesidad de time-travel debugging
- Estado muy complejo con muchas interdependencias
- Equipo crece a >5 developers

---

## ADR-002: Tailwind CSS vs CSS-in-JS (Styled Components / Emotion)

**Estado**: ✅ Aceptado  
**Fecha**: 2026-01-15  
**Decidido por**: UX/UI Designer (Trabajador 2) + Software Engineer (Trabajador 5)

### Contexto

El proyecto necesita una solución de estilos que sea:

- Rápida de implementar
- Mantenible
- Con buen performance
- Responsive

Opciones evaluadas:

1. Tailwind CSS
2. Styled Components
3. Emotion
4. CSS Modules
5. Vanilla CSS

### Decisión

**Elegimos Tailwind CSS (utility-first)**

### Justificación

#### ✅ Ventajas

1. **Bundle Size**
   - Tailwind: ~85KB (con purge)
   - Styled Components: ~15KB runtime + CSS
   - Emotion: ~12KB runtime + CSS
   - **Ganador**: Tailwind (no runtime, solo CSS)

2. **Velocidad de Desarrollo**
   - No pensar en nombres de clases
   - Diseño directo en JSX
   - Responsive con prefijos (sm:, md:, lg:)

3. **Consistencia**
   - Design tokens predefinidos
   - Espaciado consistente (4px grid)
   - Colores semánticos

4. **Performance**
   - No runtime JavaScript
   - CSS estático (cacheable)
   - Purge elimina clases no usadas

#### ❌ Desventajas

1. **Verbosidad en JSX**
   - Clases largas: `className="flex items-center justify-between..."`
   - Mitigado con: @layer components para clases reutilizables

2. **Curva de Aprendizaje**
   - Memorizar nombres de clases
   - Mitigado con: IntelliSense, documentación

### Consecuencias

**Positivas**:

- Desarrollo rápido de UI
- Bundle pequeño (~85KB)
- No hay CSS-in-JS runtime overhead

**Negativas**:

- JSX puede verse "sucio" con muchas clases
- Requiere configuración de purge para producción

### Alternativas Consideradas

**Por qué NO Styled Components**:

- Runtime overhead (~15KB)
- Genera clases dinámicas (no cacheable)
- Más lento en SSR

**Por qué NO CSS Modules**:

- Requiere pensar en nombres de clases
- Más archivos que mantener
- No tiene design system built-in

---

## ADR-003: Feature-Based Architecture vs Layered Architecture

**Estado**: ✅ Aceptado  
**Fecha**: 2026-01-18  
**Decidido por**: Software Engineer (Trabajador 5)

### Contexto

El proyecto necesita una estructura de carpetas escalable y mantenible.

Opciones evaluadas:

1. **Feature-Based** (Feature-Sliced Design)
2. **Layered** (components/, hooks/, utils/)
3. **Atomic Design** (atoms/, molecules/, organisms/)

### Decisión

**Elegimos Feature-Based Architecture**

### Estructura

```
src/
├── app/          # Configuración de app (providers, routing)
├── features/     # Features independientes
│   ├── search-recipes/
│   │   └── useSearch.js
│   └── toggle-favorite/
│       └── useFavorites.js
├── entities/     # Entidades de dominio
│   └── recipe/
│       ├── ui/RecipeCard/
│       └── context/
├── shared/       # Código compartido
│   ├── api/
│   └── constants/
├── pages/        # Páginas (rutas)
└── widgets/      # Componentes de app (Navbar)
```

### Justificación

#### ✅ Ventajas

1. **Escalabilidad**
   - Agregar features no afecta otras features
   - Cada feature es independiente
   - Fácil de modularizar en el futuro

2. **Mantenibilidad**
   - Cambios localizados (todo en una carpeta)
   - Fácil encontrar código relacionado
   - Menos acoplamiento

3. **Team Collaboration**
   - Menos conflictos en Git
   - Developers pueden trabajar en features separadas
   - Ownership claro por feature

4. **Testability**
   - Features se pueden testear aisladamente
   - Mocks más simples

#### ❌ Desventajas

1. **Curva de Aprendizaje**
   - Estructura menos familiar
   - Requiere entender las capas (app, features, entities, shared)

2. **Overhead Inicial**
   - Más carpetas que crear
   - Decisiones sobre dónde poner código

### Consecuencias

**Positivas**:

- Código más organizado
- Fácil de escalar
- Menos acoplamiento

**Negativas**:

- Requiere disciplina del equipo
- Puede parecer "over-engineering" para apps pequeñas

### Alternativas Consideradas

**Por qué NO Layered Architecture**:

```
src/
├── components/  # TODOS los componentes mezclados
├── hooks/       # TODOS los hooks mezclados
└── utils/       # TODOS los utils mezclados
```

- ❌ No escala bien (carpetas gigantes)
- ❌ Difícil encontrar código relacionado
- ❌ Alto acoplamiento

**Por qué NO Atomic Design**:

- ❌ Difícil decidir qué es atom vs molecule
- ❌ No refleja features de negocio
- ❌ Más enfocado en UI que en lógica

---

## ADR-004: localStorage vs Backend + Authentication

**Estado**: ✅ Aceptado (para MVP)  
**Fecha**: 2026-01-15  
**Decidido por**: Product Owner (Trabajador 0)

### Contexto

Los favoritos necesitan persistencia. Opciones:

1. localStorage (client-side)
2. Backend + Auth (Firebase, Supabase)
3. Backend custom (Node.js + MongoDB)

### Decisión

**Elegimos localStorage para MVP, migrar a Backend en Q3 2026**

### Justificación

#### ✅ Ventajas (MVP)

1. **Time to Market**
   - Implementación en 1 día vs 2 semanas
   - No requiere backend
   - No requiere autenticación

2. **Costo**
   - $0 (no infraestructura)
   - No hosting
   - No base de datos

3. **Simplicidad**
   - API simple (getItem/setItem)
   - No manejo de errores de red
   - No estado de autenticación

#### ❌ Desventajas

1. **No Sincronización**
   - Favoritos no se sincronizan entre dispositivos
   - Si el usuario borra caché, pierde favoritos

2. **Límites**
   - 5-10MB máximo
   - ~100 recetas favoritas máximo

3. **No Compartir**
   - No se pueden compartir favoritos
   - No hay listas colaborativas

### Consecuencias

**Positivas**:

- MVP lanzado rápido
- Validar idea sin inversión

**Negativas**:

- Migración futura requerirá refactor
- Usuarios pueden perder datos

### Roadmap de Migración

**Q3 2026**: Migrar a Firebase

- Firebase Auth (Google, Email)
- Firestore para favoritos
- Sincronización en tiempo real

**Esfuerzo estimado**: 2 sprints (4 semanas)

---

## ADR-005: PropTypes vs TypeScript

**Estado**: ✅ Aceptado (PropTypes para MVP)  
**Fecha**: 2026-01-15  
**Decidido por**: Software Engineer (Trabajador 5)

### Contexto

El proyecto necesita validación de tipos. Opciones:

1. PropTypes (runtime)
2. TypeScript (compile-time)
3. Flow
4. Ninguno

### Decisión

**Elegimos PropTypes para MVP, migrar a TypeScript en Q2 2026**

### Justificación

#### ✅ Ventajas (PropTypes)

1. **Velocidad de Setup**
   - 0 configuración (ya incluido en React)
   - No requiere compilación adicional
   - No requiere aprender TypeScript

2. **Flexibilidad**
   - Migración gradual posible
   - No bloquea desarrollo

3. **Validación en Desarrollo**
   - Warnings en consola
   - Detecta errores comunes

#### ❌ Desventajas

1. **Solo Runtime**
   - Errores solo en ejecución
   - No ayuda en tiempo de escritura

2. **No Type Inference**
   - No autocomplete de tipos
   - No refactoring seguro

3. **Performance**
   - Overhead en desarrollo (mínimo)

### Consecuencias

**Positivas**:

- Desarrollo rápido
- Validación básica

**Negativas**:

- Menos seguridad de tipos
- Errores solo en runtime

### Roadmap de Migración

**Q2 2026**: Migrar a TypeScript

- Renombrar .js → .ts, .jsx → .tsx
- Agregar tipos gradualmente
- Configurar tsconfig.json

**Esfuerzo estimado**: 1 sprint (2 semanas)

**Beneficios esperados**:

- Autocomplete mejorado
- Refactoring seguro
- Menos bugs en producción

---

## ADR-006: Vite vs Create React App (CRA)

**Estado**: ✅ Aceptado  
**Fecha**: 2026-01-10  
**Decidido por**: Frontend Developer (Trabajador 4)

### Contexto

El proyecto necesita un build tool. Opciones:

1. Vite
2. Create React App (CRA)
3. Next.js
4. Webpack custom

### Decisión

**Elegimos Vite**

### Justificación

#### ✅ Ventajas

1. **Velocidad de Desarrollo**
   - HMR instantáneo (<100ms)
   - CRA: ~3-5 segundos
   - **10-50x más rápido**

2. **Build Rápido**
   - Vite: ~10 segundos
   - CRA: ~30-60 segundos
   - Usa esbuild (Go) en lugar de Webpack (JS)

3. **Moderno**
   - ESM nativo
   - No transpila en desarrollo
   - Optimizado para navegadores modernos

4. **Bundle Size**
   - Mejor tree-shaking
   - Code splitting automático
   - ~20% más pequeño que CRA

#### ❌ Desventajas

1. **Compatibilidad**
   - Solo navegadores modernos (ES2015+)
   - No IE11 (no es problema en 2026)

2. **Ecosystem**
   - Menos plugins que Webpack
   - Comunidad más pequeña que CRA

### Consecuencias

**Positivas**:

- Desarrollo más rápido
- Mejor DX (Developer Experience)

**Negativas**:

- Algunos plugins de Webpack no compatibles

### Alternativas Consideradas

**Por qué NO Create React App**:

- ❌ Lento (HMR de 3-5 segundos)
- ❌ Webpack complejo
- ❌ Mantenimiento limitado (React team no lo prioriza)

**Por qué NO Next.js**:

- ❌ Overkill para SPA simple
- ❌ SSR no necesario
- ❌ Más complejo

---

## Resumen de Decisiones

| ADR     | Decisión        | Estado      | Cuándo Reconsiderar   |
| ------- | --------------- | ----------- | --------------------- |
| ADR-001 | Context + Hooks | ✅ Aceptado | App >20 features      |
| ADR-002 | Tailwind CSS    | ✅ Aceptado | Nunca (funciona bien) |
| ADR-003 | Feature-Based   | ✅ Aceptado | Nunca (escala bien)   |
| ADR-004 | localStorage    | ✅ Temporal | Q3 2026 (Firebase)    |
| ADR-005 | PropTypes       | ✅ Temporal | Q2 2026 (TypeScript)  |
| ADR-006 | Vite            | ✅ Aceptado | Nunca (excelente DX)  |

---

## Proceso de ADRs

### Cuándo Crear un ADR

Crear un ADR cuando:

- Decisión afecta arquitectura del sistema
- Decisión es difícil de revertir
- Decisión tiene trade-offs significativos
- Equipo necesita alineación

### Formato de ADR

```markdown
## ADR-XXX: Título Descriptivo

**Estado**: Propuesto | Aceptado | Rechazado | Deprecado
**Fecha**: YYYY-MM-DD
**Decidido por**: Rol

### Contexto

¿Qué problema estamos resolviendo?

### Decisión

¿Qué decidimos hacer?

### Justificación

¿Por qué esta decisión?

### Consecuencias

¿Qué implica esta decisión?

### Alternativas Consideradas

¿Qué otras opciones evaluamos?
```

---

## Conclusión

Estas decisiones arquitectónicas reflejan un balance entre:

- **Velocidad de desarrollo** (MVP rápido)
- **Calidad de código** (mantenible, escalable)
- **Costo** (mínimo para MVP)
- **Roadmap** (migración planificada)

Todas las decisiones están documentadas, justificadas y tienen un plan de evolución claro.
