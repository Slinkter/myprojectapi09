# Sistema UI (Tailwind CSS)

Este proyecto utiliza **Tailwind CSS** como motor principal de estilos. No utilizamos bibliotecas de componentes preconstruidos (como Chakra UI o MUI) para mantener el control total y la ligereza.

## Configuración Global

La configuración base se encuentra en `tailwind.config.js`.

### Paleta de Colores
Extendemos el tema base para colores semánticos:

| Token | Valor Hex | Uso |
| :--- | :--- | :--- |
| `primary` | `#c53030` (Red-700) | Acciones principales, destacados. |
| `secondary` | `#2d3748` (Gray-800) | Textos principales, encabezados. |
| `accent` | `#2b6cb0` (Blue-600) | Enlaces, subtítulos informativos. |
| `bg-base` | White / Gray-100 | Fondos de página. |

### Tipografía
Fuente por defecto: Sistema (Sans-serif).
Tamaños base configurados en `index.css` para legibilidad (`text-lg` en desktop).

## Componentes y Clases Utilitarias

Para evitar la repetición de clases, utilizamos la directiva `@layer components` en `src/index.css`.

### Botones (`.btn`)
```css
.btn {
  @apply text-white bg-black hover:bg-opacity-75 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
}
```
Uso:
```jsx
<button className="btn">Click me</button>
```

### Tarjetas (`.card`)
Utilizadas para mostrar items de recetas. Incluyen sombras suaves y bordes redondeados.
```css
.card {
  @apply flex flex-col w-64 overflow-hidden p-5 bg-white/75 shadow-xl gap-5 border-2 rounded-2xl border-white;
}
```

## Accesibilidad (A11y)
-   Todos los `img` deben tener atributo `alt`.
-   Los elementos interactivos deben tener estados `:hover` y `:focus` visibles (manejados por Tailwind).
-   Contraste de color verificado en la paleta elegida.
