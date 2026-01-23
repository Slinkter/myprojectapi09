# Análisis de Riesgos del Sistema

**Proyecto**: FoodRecipe SPA  
**Fecha**: 2026-01-22  
**Responsable**: Software Engineer (Trabajador 5)

---

## Resumen Ejecutivo

Este documento identifica, analiza y propone mitigaciones para los riesgos técnicos, operacionales y de negocio del proyecto FoodRecipe.

### Clasificación de Riesgos

| Nivel          | Criterio                           | Acción                  |
| -------------- | ---------------------------------- | ----------------------- |
| 🔴 **Crítico** | Impacto alto + Probabilidad alta   | Mitigar inmediatamente  |
| 🟠 **Alto**    | Impacto alto + Probabilidad media  | Mitigar en 1-2 sprints  |
| 🟡 **Medio**   | Impacto medio + Probabilidad media | Monitorear y planificar |
| 🟢 **Bajo**    | Impacto bajo + Probabilidad baja   | Aceptar                 |

---

## 1. Riesgos Técnicos

### 🟠 RT-001: Dependencia de API Externa (Forkify)

**Descripción**: La aplicación depende 100% de la API de Forkify para funcionar.

**Impacto**: 🔴 Alto

- Si la API cae, la app deja de funcionar completamente
- No hay control sobre uptime, rate limits, o cambios de API

**Probabilidad**: 🟡 Media (30%)

- API gratuita sin SLA
- Puede cambiar sin aviso
- Puede deprecarse

**Consecuencias**:

- ❌ App inaccesible para usuarios
- ❌ Pérdida de confianza
- ❌ Imposibilidad de cumplir roadmap

**Mitigaciones**:

1. **Corto plazo (Sprint actual)**

   ```javascript
   // Implementar error handling robusto
   try {
     const recipes = await fetchRecipes(query);
   } catch (error) {
     // Mostrar mensaje amigable
     setError('Unable to load recipes. Please try again later.');
     // Log para monitoreo
     logError('API_FAILURE', error);
   }
   ```

2. **Mediano plazo (Q2 2026)**
   - Implementar caché con Service Workers
   - Guardar últimas búsquedas en IndexedDB
   - Modo offline básico

3. **Largo plazo (Q3 2026)**
   - Migrar a API propia
   - Scraping de múltiples fuentes
   - Base de datos de recetas

**Estado**: 🟡 Monitoreando  
**Owner**: Frontend Developer

---

### 🟡 RT-002: Límites de localStorage

**Descripción**: localStorage tiene límite de 5-10MB, puede llenarse con favoritos.

**Impacto**: 🟡 Medio

- Usuario no puede agregar más favoritos
- Datos pueden corromperse

**Probabilidad**: 🟢 Baja (10%)

- Requiere ~200+ recetas favoritas
- Usuario promedio: 10-20 favoritos

**Consecuencias**:

- ⚠️ Funcionalidad de favoritos deja de funcionar
- ⚠️ Posible pérdida de datos

**Mitigaciones**:

1. **Corto plazo**

   ```javascript
   // Validar espacio antes de guardar
   function addToFavorites(recipe) {
     try {
       const newList = [...favorites, recipe];
       localStorage.setItem('favorites', JSON.stringify(newList));
     } catch (e) {
       if (e.name === 'QuotaExceededError') {
         alert('Favorites limit reached. Please remove some items.');
       }
     }
   }
   ```

2. **Mediano plazo (Q2 2026)**
   - Implementar límite de 100 favoritos
   - Comprimir datos con LZ-string
   - Migrar a IndexedDB (sin límite de 5MB)

3. **Largo plazo (Q3 2026)**
   - Migrar a Firebase/Supabase
   - Favoritos ilimitados en cloud

**Estado**: ✅ Mitigado (límite bajo)  
**Owner**: Frontend Developer

---

### 🟢 RT-003: Compatibilidad de Navegadores

**Descripción**: Vite + ESM requiere navegadores modernos.

**Impacto**: 🟢 Bajo

- Usuarios con navegadores antiguos no pueden usar la app

**Probabilidad**: 🟢 Muy Baja (<5%)

- 95%+ usuarios usan Chrome/Firefox/Safari modernos
- IE11 deprecado en 2022

**Consecuencias**:

- ℹ️ Pérdida de <5% de usuarios potenciales

**Mitigaciones**:

1. **Implementado**
   - Mensaje de error en navegadores no soportados
   - Documentación clara de requisitos

2. **No planificado**
   - Polyfills (aumentaría bundle size)
   - Transpilación a ES5 (perdería performance)

**Estado**: ✅ Aceptado  
**Owner**: Frontend Developer

---

### 🟡 RT-004: Sin Tests Automatizados

**Descripción**: El proyecto no tiene tests unitarios ni de integración.

**Impacto**: 🟠 Alto

- Refactors riesgosos
- Bugs no detectados
- Regresiones frecuentes

**Probabilidad**: 🔴 Alta (60%)

- Sin tests, bugs son inevitables
- Refactors pueden romper funcionalidad

**Consecuencias**:

- ⚠️ Bugs en producción
- ⚠️ Tiempo de desarrollo más lento
- ⚠️ Miedo a refactorizar

**Mitigaciones**:

1. **Corto plazo (Q1 2026)**
   - Testing manual exhaustivo
   - Checklist de QA antes de deploy

2. **Mediano plazo (Q2 2026)**
   - Implementar Vitest + Testing Library
   - Tests para hooks críticos (useSearch, useFavorites)
   - Tests para componentes clave (RecipeCard, Navbar)

3. **Largo plazo (Q3 2026)**
   - Cobertura >80%
   - E2E tests con Playwright
   - CI/CD con tests automáticos

**Estado**: 🔴 Pendiente  
**Owner**: Software Engineer

---

## 2. Riesgos de Seguridad

### 🟢 RS-001: XSS (Cross-Site Scripting)

**Descripción**: Datos de API se renderizan sin sanitización.

**Impacto**: 🟠 Alto

- Inyección de scripts maliciosos
- Robo de datos de localStorage

**Probabilidad**: 🟢 Muy Baja (<5%)

- React escapa HTML automáticamente
- API de Forkify es confiable

**Consecuencias**:

- ⚠️ Posible robo de favoritos
- ⚠️ Redirección a sitios maliciosos

**Mitigaciones**:

1. **Implementado**
   - React escapa automáticamente con `{variable}`
   - No usamos `dangerouslySetInnerHTML`

2. **Adicional (si es necesario)**

   ```javascript
   import DOMPurify from 'dompurify';

   const cleanTitle = DOMPurify.sanitize(recipe.title);
   ```

**Estado**: ✅ Mitigado (React built-in)  
**Owner**: Frontend Developer

---

### 🟢 RS-002: Exposición de API Key

**Descripción**: Si en el futuro usamos API con key, podría exponerse.

**Impacto**: 🟡 Medio

- Uso no autorizado de API
- Costos inesperados

**Probabilidad**: 🟢 Baja (20%)

- Actualmente no usamos API key
- Forkify API es pública

**Consecuencias**:

- ⚠️ Costos de API
- ⚠️ Rate limit excedido

**Mitigaciones**:

1. **Cuando sea necesario (Q3 2026)**
   - API keys en backend (no en frontend)
   - Proxy server para ocultar keys
   - Rate limiting en backend

**Estado**: ℹ️ No aplica actualmente  
**Owner**: Software Engineer

---

## 3. Riesgos de Performance

### 🟡 RP-001: Bundle Size Grande

**Descripción**: Bundle puede crecer con nuevas features.

**Impacto**: 🟡 Medio

- Carga lenta en conexiones lentas
- Peor UX en mobile

**Probabilidad**: 🟡 Media (40%)

- Cada feature agrega código
- Sin monitoreo de bundle size

**Consecuencias**:

- ⚠️ Bounce rate alto
- ⚠️ Peor SEO (Core Web Vitals)

**Mitigaciones**:

1. **Implementado**
   - Lazy loading de páginas
   - Tree-shaking con Vite
   - Purge de Tailwind CSS

2. **Corto plazo**
   - Monitorear bundle size en CI
   - Alertas si bundle >150KB

3. **Mediano plazo**
   - Code splitting por ruta
   - Lazy loading de imágenes

**Estado**: ✅ Mitigado  
**Owner**: Frontend Developer

**Métricas actuales**:

- Bundle size: ~85KB (gzipped)
- Target: <100KB

---

### 🟢 RP-002: Imágenes No Optimizadas

**Descripción**: Imágenes de API pueden ser grandes (>500KB).

**Impacto**: 🟡 Medio

- Carga lenta de cards
- Consumo de datos en mobile

**Probabilidad**: 🟡 Media (50%)

- API retorna imágenes grandes
- No hay control sobre tamaño

**Consecuencias**:

- ⚠️ UX degradada
- ⚠️ Consumo de datos

**Mitigaciones**:

1. **Corto plazo**
   - Lazy loading de imágenes (implementado)
   - Placeholder mientras carga

2. **Mediano plazo (Q2 2026)**
   - Proxy de imágenes con optimización
   - Servir WebP en lugar de JPEG
   - Responsive images (srcset)

**Estado**: 🟡 Parcialmente mitigado  
**Owner**: Frontend Developer

---

## 4. Riesgos de Escalabilidad

### 🟡 RE-001: Context API No Escala

**Descripción**: Context re-renderiza todos los consumidores.

**Impacto**: 🟡 Medio

- Performance degradada con >20 componentes
- Re-renders innecesarios

**Probabilidad**: 🟡 Media (40%)

- Si la app crece significativamente

**Consecuencias**:

- ⚠️ App lenta
- ⚠️ Necesidad de refactor grande

**Mitigaciones**:

1. **Implementado**
   - React.memo en RecipeCard
   - Separación de contextos (search vs favorites)

2. **Si es necesario (Q4 2026)**
   - Migrar a Redux Toolkit
   - Usar Zustand (más ligero que Redux)

**Estado**: ✅ Mitigado (app pequeña)  
**Owner**: Software Engineer

---

### 🟢 RE-002: localStorage No Sincroniza

**Descripción**: Favoritos no se sincronizan entre dispositivos.

**Impacto**: 🟡 Medio

- Mala UX para usuarios multi-dispositivo

**Probabilidad**: 🔴 Alta (80%)

- Usuarios esperan sincronización

**Consecuencias**:

- ⚠️ Usuarios frustrados
- ⚠️ Pérdida de engagement

**Mitigaciones**:

1. **Corto plazo**
   - Documentar limitación en UI
   - Botón de "Export/Import" favoritos

2. **Mediano plazo (Q3 2026)**
   - Migrar a Firebase
   - Sincronización en tiempo real

**Estado**: 📅 Planificado para Q3 2026  
**Owner**: Product Owner

---

## 5. Riesgos de Negocio

### 🟠 RN-001: Competencia con Apps Existentes

**Descripción**: Mercado saturado de apps de recetas.

**Impacto**: 🔴 Alto

- Difícil adquirir usuarios
- Baja retención

**Probabilidad**: 🔴 Alta (90%)

- Allrecipes, Tasty, Yummly ya existen

**Consecuencias**:

- ⚠️ Bajo crecimiento
- ⚠️ ROI negativo

**Mitigaciones**:

1. **Diferenciación**
   - UX superior (más rápida, más simple)
   - Nicho específico (ej: recetas veganas, keto)
   - Integración con servicios (ej: delivery)

2. **Marketing**
   - SEO optimizado
   - Content marketing (blog de recetas)
   - Partnerships con influencers

**Estado**: 🟡 En evaluación  
**Owner**: Product Owner

---

### 🟡 RN-002: Monetización Incierta

**Descripción**: No hay modelo de negocio claro.

**Impacto**: 🟠 Alto

- No hay ingresos
- Insostenible a largo plazo

**Probabilidad**: 🟡 Media (50%)

- MVP es gratis, pero necesita monetización

**Consecuencias**:

- ⚠️ Proyecto abandonado
- ⚠️ Falta de recursos para desarrollo

**Mitigaciones**:

1. **Opciones de Monetización**
   - Ads (Google AdSense)
   - Premium features (recetas exclusivas)
   - Affiliate marketing (ingredientes)
   - Subscripción ($2.99/mes)

2. **Validación**
   - Encuestas a usuarios
   - A/B testing de modelos

**Estado**: 📅 Planificado para Q4 2026  
**Owner**: Product Owner

---

## 6. Matriz de Riesgos

| ID     | Riesgo               | Impacto  | Probabilidad | Nivel      | Estado          |
| ------ | -------------------- | -------- | ------------ | ---------- | --------------- |
| RT-001 | API Externa          | 🔴 Alto  | 🟡 Media     | 🟠 Alto    | 🟡 Monitoreando |
| RT-002 | localStorage Límites | 🟡 Medio | 🟢 Baja      | 🟡 Medio   | ✅ Mitigado     |
| RT-003 | Compatibilidad       | 🟢 Bajo  | 🟢 Muy Baja  | 🟢 Bajo    | ✅ Aceptado     |
| RT-004 | Sin Tests            | 🟠 Alto  | 🔴 Alta      | 🔴 Crítico | 🔴 Pendiente    |
| RS-001 | XSS                  | 🟠 Alto  | 🟢 Muy Baja  | 🟢 Bajo    | ✅ Mitigado     |
| RS-002 | API Key              | 🟡 Medio | 🟢 Baja      | 🟢 Bajo    | ℹ️ No aplica    |
| RP-001 | Bundle Size          | 🟡 Medio | 🟡 Media     | 🟡 Medio   | ✅ Mitigado     |
| RP-002 | Imágenes             | 🟡 Medio | 🟡 Media     | 🟡 Medio   | 🟡 Parcial      |
| RE-001 | Context Escala       | 🟡 Medio | 🟡 Media     | 🟡 Medio   | ✅ Mitigado     |
| RE-002 | No Sync              | 🟡 Medio | 🔴 Alta      | 🟠 Alto    | 📅 Planificado  |
| RN-001 | Competencia          | 🔴 Alto  | 🔴 Alta      | 🔴 Crítico | 🟡 Evaluando    |
| RN-002 | Monetización         | 🟠 Alto  | 🟡 Media     | 🟠 Alto    | 📅 Planificado  |

---

## 7. Plan de Acción Prioritario

### Sprint Actual (Enero 2026)

1. ✅ **RT-001**: Implementar error handling robusto
2. 🔴 **RT-004**: Crear plan de testing (Vitest + Testing Library)

### Q1 2026

1. **RT-004**: Implementar tests unitarios (>50% cobertura)
2. **RP-002**: Optimizar carga de imágenes

### Q2 2026

1. **RT-002**: Migrar a IndexedDB
2. **RT-004**: Aumentar cobertura a >80%

### Q3 2026

1. **RT-001**: Implementar caché offline
2. **RE-002**: Migrar a Firebase (sincronización)

### Q4 2026

1. **RN-002**: Implementar modelo de monetización
2. **RN-001**: Estrategia de diferenciación

---

## 8. Monitoreo y Revisión

### Métricas de Riesgo

| Métrica          | Target | Actual | Estado |
| ---------------- | ------ | ------ | ------ |
| Uptime de API    | >99%   | ~95%   | 🟡     |
| Bundle size      | <100KB | ~85KB  | ✅     |
| Test coverage    | >80%   | 0%     | 🔴     |
| Usuarios activos | >1000  | TBD    | -      |

### Revisión de Riesgos

- **Frecuencia**: Cada Sprint Review
- **Responsable**: Scrum Master
- **Acción**: Actualizar matriz, agregar nuevos riesgos

---

## Conclusión

El proyecto tiene riesgos manejables con mitigaciones claras:

**Riesgos Críticos** (requieren acción inmediata):

- 🔴 RT-004: Sin tests automatizados
- 🔴 RN-001: Competencia alta

**Riesgos Altos** (mitigar en 1-2 sprints):

- 🟠 RT-001: Dependencia de API externa
- 🟠 RE-002: No sincronización
- 🟠 RN-002: Monetización incierta

**Riesgos Bajo Control**:

- ✅ RT-002, RS-001, RP-001, RE-001

El equipo debe priorizar testing y diferenciación de producto para asegurar el éxito del proyecto.
