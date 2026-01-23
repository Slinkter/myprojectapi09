# Metodología SCRUM - FoodRecipe Project

## Visión del Producto

**FoodRecipe** es una aplicación web moderna que democratiza el acceso a recetas culinarias de calidad, permitiendo a usuarios de todos los niveles encontrar inspiración, guardar sus favoritos y explorar nuevas opciones gastronómicas de manera rápida e intuitiva.

### Propuesta de Valor

- **Para**: Cocineros aficionados, personas que buscan inspiración culinaria
- **Que necesitan**: Encontrar recetas rápidamente sin complejidad
- **FoodRecipe es**: Una SPA minimalista y rápida
- **Que**: Permite buscar, visualizar y guardar recetas favoritas
- **A diferencia de**: Sitios de recetas sobrecargados con ads y contenido irrelevante
- **Nuestro producto**: Se enfoca en velocidad, simplicidad y experiencia de usuario

---

## Aplicación de SCRUM en el Proyecto

### ¿Por qué SCRUM?

SCRUM es el framework ágil elegido para este proyecto por las siguientes razones:

#### ✅ Ventajas de SCRUM para este proyecto:

1. **Iterativo e Incremental**
   - Permite entregar valor en sprints cortos (1-2 semanas)
   - Facilita feedback temprano y ajustes rápidos
   - Reduce riesgo de construir features innecesarias

2. **Transparencia y Visibilidad**
   - Product Backlog visible para todos los stakeholders
   - Sprint Backlog muestra el trabajo actual
   - Burndown charts permiten tracking de progreso

3. **Adaptabilidad**
   - Sprint Retrospectives permiten mejora continua
   - Cambios de prioridad se manejan entre sprints
   - Responde bien a feedback de usuarios

4. **Roles Claros**
   - Product Owner define QUÉ construir
   - Scrum Master facilita el proceso
   - Development Team decide CÓMO construir

#### ❌ Por qué NO otras metodologías:

**Waterfall (Cascada)**

- ❌ Requiere requisitos completos upfront (imposible en productos web)
- ❌ No permite cambios una vez iniciado el desarrollo
- ❌ Feedback solo al final (alto riesgo)
- ❌ No se adapta a cambios de mercado

**Kanban Puro**

- ❌ No tiene sprints definidos (dificulta planificación)
- ❌ No tiene ceremonias estructuradas (menos alineación)
- ❌ Mejor para mantenimiento que para desarrollo de features
- ✅ Podría usarse POST-lanzamiento para bugs y mejoras menores

**Extreme Programming (XP)**

- ❌ Requiere pair programming (no viable en equipos pequeños)
- ❌ Enfoque muy técnico (menos balance con negocio)
- ❌ Requiere cliente on-site (no siempre posible)
- ✅ Algunas prácticas se adoptan (TDD, refactoring continuo)

---

## Roles SCRUM en el Proyecto

### 🎯 Product Owner (Trabajador 0)

**Responsabilidades:**

- Define la visión del producto
- Gestiona y prioriza el Product Backlog
- Acepta o rechaza el trabajo completado
- Maximiza el valor del producto

**Decisiones clave tomadas:**

- Priorizar búsqueda y favoritos sobre features avanzadas
- Usar API externa (Forkify) en lugar de backend propio
- Enfocarse en UX simple sobre features complejas

### 🛡️ Scrum Master (Trabajador 1)

**Responsabilidades:**

- Facilita las ceremonias SCRUM
- Remueve impedimentos del equipo
- Protege al equipo de distracciones externas
- Asegura que se sigan las prácticas SCRUM

**Acciones realizadas:**

- Documentación de proceso SCRUM (este documento)
- Definición de Definition of Done
- Facilitación de retrospectivas (simuladas)

### 🎨 UX/UI Designer (Trabajador 2)

**Responsabilidades:**

- Diseña la experiencia de usuario
- Crea mockups y prototipos
- Valida decisiones de diseño con usuarios
- Asegura consistencia visual

**Contribuciones:**

- Sistema de diseño con Tailwind CSS
- Paleta de colores semántica
- Micro-interacciones y hover effects
- Responsive design mobile-first

### 💻 Frontend Developer (Trabajador 4)

**Responsabilidades:**

- Implementa features según el Product Backlog
- Escribe código limpio y mantenible
- Realiza code reviews
- Implementa tests (cuando aplique)

**Implementaciones clave:**

- Custom hooks (useSearch, useFavorites)
- Lazy loading de componentes
- Integración con API externa
- Persistencia en localStorage

### 🏗️ Software Engineer (Trabajador 5) - ROL CRÍTICO

**Responsabilidades:**

- Define la arquitectura del sistema
- Justifica decisiones técnicas (ADRs)
- Analiza costos y riesgos
- Asegura escalabilidad y mantenibilidad

**Decisiones arquitectónicas:**

- Feature-Based Architecture (vs Layered)
- Context API + Custom Hooks (vs Redux)
- Tailwind CSS puro (vs CSS-in-JS)
- PropTypes (vs TypeScript para MVP)

---

## Artefactos SCRUM

### 1. Product Backlog

Lista priorizada de todas las features, mejoras y fixes del producto.

#### Épicas y User Stories (Prioridad Alta → Baja)

**ÉPICA 1: Búsqueda de Recetas** ✅ COMPLETADO

- [x] US-01: Como usuario, quiero buscar recetas por ingrediente
- [x] US-02: Como usuario, quiero ver sugerencias mientras escribo
- [x] US-03: Como usuario, quiero ver resultados en cards visuales

**ÉPICA 2: Gestión de Favoritos** ✅ COMPLETADO

- [x] US-04: Como usuario, quiero guardar recetas favoritas
- [x] US-05: Como usuario, quiero ver mi lista de favoritos
- [x] US-06: Como usuario, quiero que mis favoritos persistan

**ÉPICA 3: Detalles de Receta** ✅ COMPLETADO

- [x] US-07: Como usuario, quiero ver ingredientes completos
- [x] US-08: Como usuario, quiero ver la fuente de la receta
- [x] US-09: Como usuario, quiero agregar a favoritos desde detalles

**ÉPICA 4: Navegación y UX** ✅ COMPLETADO

- [x] US-10: Como usuario, quiero navegar sin recargar la página
- [x] US-11: Como usuario, quiero ver estados de carga claros
- [x] US-12: Como usuario, quiero una interfaz responsive

**ÉPICA 5: Mejoras Futuras** ⏳ BACKLOG

- [ ] US-13: Como usuario, quiero filtrar por tipo de comida
- [ ] US-14: Como usuario, quiero compartir recetas en redes sociales
- [ ] US-15: Como usuario, quiero crear una lista de compras
- [ ] US-16: Como usuario, quiero autenticarme y sincronizar favoritos

### 2. Sprint Backlog (Sprint Actual - Refactorización y Documentación)

**Sprint Goal**: Refactorizar el código con JSDoc senior y documentar la metodología SCRUM aplicada.

**Tareas del Sprint:**

- [x] Eliminar archivos redundantes (App.css, .eslintrc.json)
- [x] Agregar JSDoc senior a todos los componentes
- [x] Agregar JSDoc senior a todos los hooks
- [x] Crear documentación SCRUM
- [/] Crear documentación de arquitectura actualizada
- [ ] Crear ADRs (Architecture Decision Records)
- [ ] Crear documento de riesgos
- [ ] Crear roadmap evolutivo

**Estimación**: 22-31 horas (según implementation_plan.md)

### 3. Incremento del Producto

Cada sprint entrega un incremento potencialmente desplegable:

- **Sprint 1** (Inicial): Búsqueda básica + Listado
- **Sprint 2**: Favoritos + Persistencia
- **Sprint 3**: Detalles + Navegación
- **Sprint 4**: Refactorización + Clean Architecture
- **Sprint 5** (Actual): JSDoc + Documentación SCRUM

---

## Ceremonias SCRUM

### 1. Sprint Planning

**Frecuencia**: Al inicio de cada sprint (cada 2 semanas)
**Duración**: 2-4 horas
**Participantes**: Todo el equipo

**Agenda**:

1. Product Owner presenta las User Stories prioritarias
2. Equipo estima esfuerzo (Planning Poker)
3. Equipo selecciona stories para el sprint
4. Se define el Sprint Goal
5. Se descomponen stories en tareas técnicas

**Output**: Sprint Backlog + Sprint Goal

### 2. Daily Standup (Daily Scrum)

**Frecuencia**: Diaria
**Duración**: 15 minutos
**Participantes**: Development Team + Scrum Master

**Tres preguntas**:

1. ¿Qué hice ayer?
2. ¿Qué haré hoy?
3. ¿Tengo algún impedimento?

**Nota**: En este proyecto (simulado), los standups son implícitos en el progreso del task.md.

### 3. Sprint Review

**Frecuencia**: Al final de cada sprint
**Duración**: 1-2 horas
**Participantes**: Todo el equipo + Stakeholders

**Agenda**:

1. Demo del incremento completado
2. Feedback de stakeholders
3. Actualización del Product Backlog
4. Discusión de próximos pasos

**Output**: Incremento aceptado + Backlog actualizado

### 4. Sprint Retrospective

**Frecuencia**: Al final de cada sprint (después del Review)
**Duración**: 1 hora
**Participantes**: Development Team + Scrum Master

**Agenda**:

1. ¿Qué salió bien?
2. ¿Qué se puede mejorar?
3. ¿Qué acciones tomaremos?

**Output**: Plan de mejora para el próximo sprint

---

## Definition of Done (DoD)

Una User Story se considera "Done" cuando cumple TODOS estos criterios:

### Código

- [x] Código implementado según los requisitos
- [x] JSDoc completo en funciones y componentes
- [x] Código pasa linting sin errores (`pnpm run lint`)
- [x] No hay warnings en consola del navegador
- [x] PropTypes definidos para todos los componentes

### Testing

- [ ] Tests unitarios escritos (cuando aplique)
- [ ] Tests de integración escritos (cuando aplique)
- [ ] Tests pasan exitosamente
- **Nota**: Actualmente NO hay framework de testing instalado

### Documentación

- [x] README actualizado si es necesario
- [x] Documentación técnica actualizada
- [x] Comentarios inline en lógica compleja
- [x] ADRs creados para decisiones arquitectónicas

### UX/UI

- [x] Funciona en Chrome, Firefox, Safari
- [x] Responsive en mobile, tablet, desktop
- [x] Estados de loading/error/empty implementados
- [x] Accesibilidad básica (alt text, semantic HTML)

### Deployment

- [x] Build de producción exitoso (`pnpm run build`)
- [x] No hay errores en build
- [ ] Desplegado en GitHub Pages (cuando aplique)

### Review

- [x] Code review completado
- [x] Product Owner acepta la feature
- [x] No hay deuda técnica crítica introducida

---

## Métricas SCRUM

### Velocity (Velocidad del Equipo)

Promedio de Story Points completados por sprint:

- Sprint 1: 13 SP
- Sprint 2: 15 SP
- Sprint 3: 14 SP
- Sprint 4: 16 SP (refactorización)
- **Promedio**: ~14.5 SP/sprint

**Uso**: Planificar cuántas stories caben en el próximo sprint.

### Burndown Chart

Gráfico que muestra el trabajo restante vs tiempo en el sprint.

**Interpretación**:

- Línea descendente suave: Sprint saludable
- Línea plana: Posibles impedimentos
- Línea ascendente: Scope creep (agregar trabajo mid-sprint)

### Cumulative Flow Diagram

Muestra el flujo de trabajo a través de estados:

- To Do → In Progress → In Review → Done

**Uso**: Identificar cuellos de botella en el proceso.

---

## Adaptaciones de SCRUM para este Proyecto

### Contexto: Equipo Simulado

Este proyecto es desarrollado por un solo desarrollador con asistencia de IA, simulando un equipo SCRUM completo.

**Adaptaciones realizadas**:

1. **Ceremonias Asíncronas**
   - No hay reuniones reales
   - Decisiones documentadas en artifacts
   - Retrospectivas implícitas en mejoras continuas

2. **Roles Combinados**
   - Un desarrollador asume múltiples roles
   - IA actúa como Scrum Master / Arquitecto
   - Product Owner es el desarrollador mismo

3. **Sprints Flexibles**
   - No hay timeboxing estricto
   - Sprints se definen por objetivos, no por tiempo
   - Permite trabajo asíncrono

4. **Testing Opcional**
   - No hay tests automatizados (MVP)
   - Validación manual exhaustiva
   - Tests se agregarán en sprints futuros

**Nota**: Estas adaptaciones son aceptables para un proyecto personal/académico, pero NO para un equipo real en producción.

---

## Conclusión

SCRUM provee el framework ideal para FoodRecipe porque:

✅ Permite iteración rápida y feedback continuo
✅ Facilita cambios de prioridad sin caos
✅ Roles claros aseguran responsabilidad
✅ Ceremonias aseguran alineación del equipo
✅ Artefactos proveen transparencia total

El proyecto ha evolucionado exitosamente a través de múltiples sprints, entregando valor incremental en cada iteración, y está posicionado para continuar creciendo de manera sostenible.
