# Análisis de Costos del Sistema

**Proyecto**: FoodRecipe SPA  
**Fecha**: 2026-01-22  
**Responsable**: Software Engineer (Trabajador 5) + Product Owner (Trabajador 0)

---

## Resumen Ejecutivo

Este documento analiza los costos actuales y proyectados del proyecto FoodRecipe, incluyendo infraestructura, desarrollo, operación y marketing.

### Costos Totales (2026)

| Categoría           | Q1     | Q2      | Q3       | Q4       | Total Anual |
| ------------------- | ------ | ------- | -------- | -------- | ----------- |
| **Infraestructura** | $0     | $0      | $25      | $100     | **$125**    |
| **Desarrollo**      | $0     | $0      | $0       | $0       | **$0**      |
| **Operación**       | $0     | $0      | $50      | $100     | **$150**    |
| **Marketing**       | $0     | $50     | $100     | $200     | **$350**    |
| **TOTAL**           | **$0** | **$50** | **$175** | **$400** | **$625**    |

---

## 1. Costos de Infraestructura

### 1.1 Hosting y Deployment

#### Q1-Q2 2026: GitHub Pages (GRATIS)

**Servicio**: GitHub Pages  
**Costo**: $0/mes

**Características**:

- ✅ Hosting estático gratuito
- ✅ SSL/HTTPS incluido
- ✅ CDN global
- ✅ Deploy automático con GitHub Actions
- ✅ Custom domain (opcional)

**Límites**:

- 1GB de storage
- 100GB de bandwidth/mes
- Solo sitios estáticos (SPA)

**Justificación**:

- Perfecto para MVP
- Sin costo
- Fácil de configurar

---

#### Q3-Q4 2026: Vercel (GRATIS → $20/mes)

**Servicio**: Vercel  
**Costo**: $0/mes (Hobby) → $20/mes (Pro)

**Por qué migrar**:

- Mejor performance (Edge Network)
- Analytics incluido
- Serverless Functions (para API proxy)
- Mejor DX (Developer Experience)

**Pricing**:

| Plan  | Costo   | Límites                         |
| ----- | ------- | ------------------------------- |
| Hobby | $0/mes  | 100GB bandwidth, 100 builds/mes |
| Pro   | $20/mes | 1TB bandwidth, Unlimited builds |

**Estimación**:

- Q3: Hobby ($0/mes) - 100-500 usuarios
- Q4: Pro ($20/mes) - 500-10,000 usuarios

**Costo Q3**: $0  
**Costo Q4**: $60 ($20 × 3 meses)

---

### 1.2 Backend (Firebase)

#### Q1-Q2 2026: No Backend

**Costo**: $0/mes

**Razón**: localStorage suficiente para MVP

---

#### Q3-Q4 2026: Firebase

**Servicio**: Firebase (Google)  
**Costo**: $0/mes (Spark) → $25/mes (Blaze)

**Servicios Usados**:

1. **Authentication**: Google Sign-In, Email/Password
2. **Firestore**: Base de datos NoSQL
3. **Storage**: Imágenes de perfil (futuro)

**Pricing**:

| Servicio         | Spark (Free) | Blaze (Pay-as-you-go) |
| ---------------- | ------------ | --------------------- |
| Auth             | 50,000 MAU   | $0.0055/MAU           |
| Firestore Reads  | 50,000/día   | $0.06/100K            |
| Firestore Writes | 20,000/día   | $0.18/100K            |
| Storage          | 1GB          | $0.026/GB             |

**Estimación Q3** (100-500 usuarios):

- Auth: 500 MAU → GRATIS (dentro de Spark)
- Firestore: ~10K reads/día, ~2K writes/día → GRATIS
- **Total Q3**: $0/mes

**Estimación Q4** (500-2,000 usuarios):

- Auth: 2,000 MAU → $11/mes
- Firestore: ~40K reads/día, ~8K writes/día → $14/mes
- **Total Q4**: $25/mes × 3 meses = $75

**Costo Q3**: $0  
**Costo Q4**: $75

---

### 1.3 CDN y Assets

#### Imágenes de Recetas

**Servicio**: Forkify API (externo)  
**Costo**: $0/mes

**Razón**: Imágenes servidas por API de Forkify

---

#### Imágenes Propias (futuro)

**Servicio**: Cloudinary  
**Costo**: $0/mes (Free tier)

**Límites**:

- 25GB storage
- 25GB bandwidth/mes
- Suficiente para Q1-Q4 2026

**Costo**: $0/mes

---

### 1.4 Domain

**Servicio**: Namecheap / Google Domains  
**Costo**: $12/año

**Domain**: `foodrecipe.app` o similar

**Costo Anual**: $12

---

### Resumen Infraestructura

| Servicio               | Q1     | Q2     | Q3     | Q4       | Anual    |
| ---------------------- | ------ | ------ | ------ | -------- | -------- |
| Hosting (GitHub Pages) | $0     | $0     | $0     | -        | $0       |
| Hosting (Vercel)       | -      | -      | $0     | $60      | $60      |
| Firebase               | $0     | $0     | $0     | $75      | $75      |
| CDN (Cloudinary)       | $0     | $0     | $0     | $0       | $0       |
| Domain                 | -      | -      | -      | $12      | $12      |
| **TOTAL**              | **$0** | **$0** | **$0** | **$147** | **$147** |

---

## 2. Costos de Desarrollo

### 2.1 Equipo (Proyecto Académico/Personal)

**Costo**: $0

**Razón**: Proyecto desarrollado por equipo académico o personal sin salarios.

---

### 2.2 Herramientas de Desarrollo

#### Gratis

- ✅ VS Code (IDE)
- ✅ Git + GitHub (Version control)
- ✅ Figma (Free tier para diseño)
- ✅ Notion (Free tier para documentación)
- ✅ Slack (Free tier para comunicación)

**Costo**: $0/mes

---

#### Potencialmente Pagadas (Futuro)

| Herramienta                 | Costo   | Cuándo                     |
| --------------------------- | ------- | -------------------------- |
| Figma Pro                   | $12/mes | Q3 2026 (si equipo >2)     |
| Notion Plus                 | $8/mes  | Q4 2026 (si >10 páginas)   |
| Linear (Project Management) | $8/mes  | Q4 2026 (mejor que Trello) |

**Costo Q4**: $28/mes × 3 meses = $84 (opcional)

---

### Resumen Desarrollo

| Categoría    | Q1     | Q2     | Q3     | Q4     | Anual  |
| ------------ | ------ | ------ | ------ | ------ | ------ |
| Equipo       | $0     | $0     | $0     | $0     | $0     |
| Herramientas | $0     | $0     | $0     | $0     | $0     |
| **TOTAL**    | **$0** | **$0** | **$0** | **$0** | **$0** |

---

## 3. Costos de Operación

### 3.1 Monitoreo y Analytics

#### Google Analytics 4

**Costo**: $0/mes

**Razón**: Gratis hasta 10M eventos/mes

---

#### Sentry (Error Tracking)

**Servicio**: Sentry  
**Costo**: $0/mes (Developer) → $26/mes (Team)

**Pricing**:

| Plan      | Costo | Eventos/mes |
| --------- | ----- | ----------- |
| Developer | $0    | 5,000       |
| Team      | $26   | 50,000      |

**Estimación**:

- Q1-Q2: Developer ($0/mes)
- Q3: Developer ($0/mes)
- Q4: Team ($26/mes) - más usuarios, más errores

**Costo Q4**: $26 × 3 meses = $78

---

### 3.2 Email Service (Transaccional)

#### SendGrid

**Servicio**: SendGrid  
**Costo**: $0/mes (Free) → $15/mes (Essentials)

**Uso**:

- Welcome emails
- Password reset
- Premium subscription confirmations

**Pricing**:

| Plan       | Costo | Emails/mes          |
| ---------- | ----- | ------------------- |
| Free       | $0    | 100/día (3,000/mes) |
| Essentials | $15   | 50,000/mes          |

**Estimación**:

- Q1-Q3: No email service
- Q4: Free tier ($0/mes) - <100 emails/día

**Costo Q4**: $0

---

### 3.3 Payment Processing (Stripe)

**Servicio**: Stripe  
**Costo**: 2.9% + $0.30 por transacción

**Uso**: Subscripciones Premium ($2.99/mes)

**Estimación Q4**:

- 500 premium subscribers
- $2.99 × 500 = $1,495 revenue
- Stripe fees: $1,495 × 2.9% + ($0.30 × 500) = $43 + $150 = $193

**Costo Q4**: $193 (pero es % de revenue)

---

### 3.4 Customer Support

#### Q1-Q3: Email Support

**Costo**: $0/mes

**Razón**: Soporte manual vía email

---

#### Q4: Intercom / Crisp

**Servicio**: Crisp  
**Costo**: $0/mes (Basic) → $25/mes (Pro)

**Uso**: Live chat, chatbot, knowledge base

**Estimación Q4**: Basic ($0/mes) - suficiente para <2,000 usuarios

**Costo Q4**: $0

---

### Resumen Operación

| Servicio                | Q1     | Q2     | Q3     | Q4       | Anual    |
| ----------------------- | ------ | ------ | ------ | -------- | -------- |
| Analytics (GA4)         | $0     | $0     | $0     | $0       | $0       |
| Error Tracking (Sentry) | $0     | $0     | $0     | $78      | $78      |
| Email (SendGrid)        | $0     | $0     | $0     | $0       | $0       |
| Payment (Stripe)        | $0     | $0     | $0     | $193     | $193     |
| Support (Crisp)         | $0     | $0     | $0     | $0       | $0       |
| **TOTAL**               | **$0** | **$0** | **$0** | **$271** | **$271** |

> **Nota**: Stripe fees ($193) son % de revenue, no costo fijo.

---

## 4. Costos de Marketing

### 4.1 Adquisición de Usuarios

#### Q1-Q2: Orgánico

**Costo**: $0/mes

**Estrategia**:

- SEO (contenido de blog)
- Social media orgánico (Twitter, Instagram)
- Product Hunt launch

---

#### Q3: Paid Ads (Experimental)

**Servicio**: Google Ads + Facebook Ads  
**Costo**: $100/mes

**Objetivo**: Validar canales de adquisición

**Estimación**:

- CPC (Cost Per Click): $0.50
- CTR (Click-Through Rate): 2%
- Conversion rate: 10%
- CAC (Customer Acquisition Cost): $5

**Budget Q3**: $100 × 3 meses = $300

---

#### Q4: Paid Ads (Escalado)

**Costo**: $200/mes

**Objetivo**: Escalar adquisición

**Budget Q4**: $200 × 3 meses = $600

---

### 4.2 Content Marketing

#### Blog

**Costo**: $0/mes (self-written) → $50/mes (freelance writers)

**Contenido**:

- Recipe guides
- Cooking tips
- Nutrition articles

**Estimación**:

- Q1-Q2: Self-written ($0/mes)
- Q3-Q4: Freelance ($50/mes)

**Costo Q3**: $50 × 3 meses = $150  
**Costo Q4**: $50 × 3 meses = $150

---

### 4.3 Influencer Marketing

#### Q4: Micro-influencers

**Costo**: $100/post × 5 posts = $500

**Objetivo**: Awareness y credibilidad

**Estimación**:

- 5 micro-influencers (10K-50K followers)
- $100/post
- Reach: ~50K personas

**Costo Q4**: $500

---

### Resumen Marketing

| Canal                  | Q1     | Q2     | Q3       | Q4         | Anual      |
| ---------------------- | ------ | ------ | -------- | ---------- | ---------- |
| Orgánico (SEO, Social) | $0     | $0     | $0       | $0         | $0         |
| Paid Ads               | $0     | $0     | $300     | $600       | $900       |
| Content (Blog)         | $0     | $0     | $150     | $150       | $300       |
| Influencers            | $0     | $0     | $0       | $500       | $500       |
| **TOTAL**              | **$0** | **$0** | **$450** | **$1,250** | **$1,700** |

---

## 5. Proyección de Revenue

### 5.1 Modelo de Monetización

**Premium Subscription**: $2.99/mes

**Features Premium**:

- Favoritos ilimitados
- Sin ads
- Recetas exclusivas
- Meal planning
- Grocery list

---

### 5.2 Proyección de Usuarios

| Métrica             | Q1  | Q2  | Q3    | Q4     |
| ------------------- | --- | --- | ----- | ------ |
| MAU (Total)         | 100 | 500 | 2,000 | 10,000 |
| Premium Subscribers | 0   | 0   | 0     | 500    |
| Conversion Rate     | -   | -   | -     | 5%     |

---

### 5.3 Proyección de Revenue

| Métrica             | Q1  | Q2  | Q3  | Q4     | Anual      |
| ------------------- | --- | --- | --- | ------ | ---------- |
| Premium Subs        | 0   | 0   | 0   | 500    | -          |
| MRR (Monthly)       | $0  | $0  | $0  | $1,495 | -          |
| Revenue (Quarterly) | $0  | $0  | $0  | $4,485 | **$4,485** |

**Cálculo Q4**:

- Octubre: 100 subs × $2.99 = $299
- Noviembre: 250 subs × $2.99 = $748
- Diciembre: 500 subs × $2.99 = $1,495
- **Total Q4**: $2,542

**Nota**: Proyección conservadora, asumiendo crecimiento gradual.

---

## 6. Análisis de Rentabilidad

### 6.1 Costos vs Revenue (2026)

| Categoría   | Q1     | Q2     | Q3        | Q4          | Anual      |
| ----------- | ------ | ------ | --------- | ----------- | ---------- |
| **Costos**  | $0     | $0     | $450      | $1,521      | **$1,971** |
| **Revenue** | $0     | $0     | $0        | $2,542      | **$2,542** |
| **Profit**  | **$0** | **$0** | **-$450** | **+$1,021** | **+$571**  |

**Conclusión**: Proyecto rentable en Q4 2026.

---

### 6.2 Break-even Analysis

**Break-even Point**: Q4 2026 (Diciembre)

**Cálculo**:

- Costos mensuales Q4: ~$507/mes
- Revenue por subscriber: $2.99/mes
- Subscribers necesarios: $507 / $2.99 = **170 subscribers**

**Alcanzado en**: Noviembre 2026 (250 subs proyectados)

---

### 6.3 ROI (Return on Investment)

**Inversión Total 2026**: $1,971  
**Revenue Total 2026**: $2,542  
**Profit**: $571

**ROI**: ($571 / $1,971) × 100 = **29%**

**Conclusión**: ROI positivo en el primer año.

---

## 7. Proyección 2027

### 7.1 Costos Proyectados

| Categoría       | 2027 Estimado  |
| --------------- | -------------- |
| Infraestructura | $500/año       |
| Desarrollo      | $0 (personal)  |
| Operación       | $1,200/año     |
| Marketing       | $6,000/año     |
| **TOTAL**       | **$7,700/año** |

---

### 7.2 Revenue Proyectado

| Métrica                        | 2027 Target           |
| ------------------------------ | --------------------- |
| MAU                            | 50,000                |
| Premium Subscribers            | 2,500 (5% conversion) |
| MRR                            | $7,475                |
| ARR (Annual Recurring Revenue) | **$89,700**           |

---

### 7.3 Profit Proyectado

**Revenue 2027**: $89,700  
**Costos 2027**: $7,700  
**Profit 2027**: **$82,000**

**ROI 2027**: ($82,000 / $7,700) × 100 = **1,065%**

---

## 8. Optimización de Costos

### 8.1 Oportunidades de Ahorro

1. **Hosting**
   - Mantenerse en Vercel Hobby ($0) el mayor tiempo posible
   - Migrar a Vercel Pro solo cuando sea necesario

2. **Firebase**
   - Optimizar queries de Firestore (menos reads)
   - Implementar caché agresivo
   - Usar Firestore offline persistence

3. **Marketing**
   - Priorizar canales orgánicos (SEO, content)
   - Paid ads solo cuando CAC < LTV (Lifetime Value)

---

### 8.2 Riesgos de Costos

1. **Firebase Costs Spike**
   - **Riesgo**: Usuarios crecen más rápido de lo esperado
   - **Mitigación**: Alertas de billing, optimización de queries

2. **Paid Ads Ineficientes**
   - **Riesgo**: CAC > LTV
   - **Mitigación**: A/B testing, pausar si no es rentable

3. **Stripe Fees**
   - **Riesgo**: 2.9% + $0.30 puede ser alto para suscripciones pequeñas
   - **Mitigación**: Considerar Paddle (mejor para subscripciones)

---

## 9. Resumen Ejecutivo

### Costos Totales 2026

| Categoría       | Costo Anual |
| --------------- | ----------- |
| Infraestructura | $147        |
| Desarrollo      | $0          |
| Operación       | $271        |
| Marketing       | $1,700      |
| **TOTAL**       | **$2,118**  |

### Revenue Total 2026

**$2,542** (solo Q4)

### Profit 2026

**+$424** (rentable en primer año)

---

## Conclusión

El proyecto FoodRecipe es **financieramente viable** con:

✅ **Costos bajos** ($2,118/año)  
✅ **Revenue positivo** en Q4 2026  
✅ **ROI 29%** en primer año  
✅ **Break-even** en Noviembre 2026  
✅ **Escalabilidad** a $89K ARR en 2027

**Recomendación**: Proceder con el roadmap planificado.
