# Arquitectura

## 1. Resumen

El sitio es **estático**: no hay servidor, ni base de datos, ni proceso de build. Son tres
archivos los que hacen todo (`index.html`, `assets/css/styles.css`, `assets/js/main.js`) más las
imágenes y las fuentes de Google. Se puede abrir con doble clic o subir tal cual a un hosting
estático.

La decisión de no usar frameworks (ni Tailwind, ni React, ni Font Awesome por CDN) fue
deliberada: una landing de una página no necesita un bundler, carga más rápido y no se rompe
cuando una CDN cambia de versión.

## 2. Árbol de archivos

```
AutomatizaHoy/
├── index.html                  # Estructura y TODO el contenido
├── README.md                   # Punto de entrada rápido
├── CHANGELOG.md                # Historial de versiones
├── assets/
│   ├── css/
│   │   └── styles.css          # Design system + componentes + responsive (~2.300 líneas)
│   ├── js/
│   │   └── main.js             # Interacciones (~490 líneas, sin dependencias)
│   └── img/
│       ├── barberfort-sucursal.webp
│       ├── barberfort-logo.webp
│       ├── citroen-hero.webp
│       ├── citroen-logo.webp
│       └── excel/
│           ├── planilla-antes.png
│           ├── planilla-despues.png
│           ├── resumen-antes.png
│           └── resumen-despues.png
└── docs/
    ├── README.md               # Índice de esta documentación
    ├── arquitectura.md
    ├── guia-de-estilos.md
    ├── responsive.md
    ├── manual-de-contenido.md
    ├── calidad-y-publicacion.md
    └── material/               # PDFs de referencia, no se publican
```

## 3. Flujo de carga

1. **`<head>`**: metadatos, Open Graph, JSON-LD, favicon (SVG en data URI), preconnect a Google
   Fonts, hoja de estilos.
2. **`<body>`**: primero el sprite de íconos SVG (`<svg class="sprite">` con `<symbol>`), después
   el header, el menú móvil, el `<main>` con las secciones y el footer.
3. **Al final**: `<script src="assets/js/main.js" defer>`. `defer` hace que el HTML se parsee
   primero y el JS corra con el DOM listo, sin bloquear el render.
4. El JS espera `DOMContentLoaded` (o corre directo si ya cargó) y ejecuta `init()`.

No hay fuentes de datos externas: si se cae internet, se cae solamente la tipografía (hay
fallback a `system-ui`).

## 4. Organización del CSS

`styles.css` está dividido en bloques numerados, en este orden:

| Bloque | Contenido |
|---|---|
| 1. Tokens | Variables en `:root` (colores, radios, sombras, easings, medidas) |
| 2. Base | Reset, tipografía base, `.container`, `.icon`, `.skip-link`, secciones |
| 3. Botones | `.btn` y variantes (`--primary`, `--ghost`, `--light`, `--sm`, `--lg`, `--block`) |
| 4. Navegación | `.nav`, `.brand`, `.burger`, `.mobile-menu` |
| 5. Hero | Fondo, grilla, glows, panel `.flow`, `.float-chip`, `.hero__stats` |
| 6. Marquee | Banda infinita de tecnologías |
| 7. Servicios | Grilla `.bento` y tarjetas `.svc` (incluye maqueta decorativa) |
| 8. Proceso | `.steps` y `.step` |
| 9. Casos | `.case`, marco `.browser`, y el comparador `.cmp` del Excel |
| 10. Nosotros | `.about`, `.compare` (antes/después) |
| 11. FAQ | `.faq`, `.acc` (acordeón) |
| 12. Contacto / Footer | `.cta-panel`, `.form`, `.footer` |
| Animaciones | `[data-reveal]` y `@keyframes` |
| Responsive | `@media` por ancho + ajustes táctiles y safe-area |
| Accesibilidad | `prefers-reduced-motion` |

Convención de nombres tipo BEM simplificado: `.bloque`, `.bloque__elemento`,
`.bloque--variante`. Los estados que agrega JS son `is-visible`, `is-scrolled`, `is-open`,
`is-active`, `is-touched`, `is-invalid`, `is-error`, `is-ok`.

## 5. JavaScript

`main.js` es un IIFE con funciones de inicialización independientes. Todo se engancha desde
`init()` en este orden:

| # | Función | Qué hace |
|---|---|---|
| 1 | `initContactLinks` | Reescribe los `[data-wa]` a `wa.me` con mensaje y los `[data-mail]` a `mailto:` |
| 2 | `initScrollUI` | Nav compacta al scrollear + barra de progreso de lectura |
| 3 | `initMobileMenu` | Abre/cierra el menú, bloquea el scroll, cierra con `Esc` o al tocar un link |
| 4 | `initReveal` | `IntersectionObserver` para el fade-up de `[data-reveal]`, con retardo por `--d` |
| 5 | `initCounters` | Anima los `[data-count]` cuando entran en pantalla |
| 6 | `initAccordion` | Acordeón con animación de altura y `aria-expanded` |
| 7 | `initSpotlight` | Mueve un halo con `--mx`/`--my` en las tarjetas con `[data-spotlight]` |
| 8 | `initCompare` | Comparador antes/después: `--pos`, pestañas y animación de invitación |
| 9 | `initActiveLink` | Marca en el nav la sección visible |
| 10 | `initForm` | Valida nombre y consulta, arma el mensaje y lo abre en WhatsApp o mail |
| 11 | `initToTop` | Botón "volver arriba" |
| 12 | `initYear` | Escribe el año actual en el footer |

### Configuración

```js
const CONFIG = {
  whatsapp: "",                      // "5491123456789"
  email: "hola@automatizahoy.com",
};
```

Se aplica en `initContactLinks` y en `initForm`. Si `whatsapp` está vacío:
- los botones mantienen su `href` original (normalmente `#contacto`),
- el formulario arma un `mailto:` en lugar de abrir WhatsApp,
- el botón del formulario pasa a decir "Enviar por email" y cambia el ícono.

### Cómo funciona el comparador del Excel

Cada bloque `[data-compare]` tiene:

```html
<div class="cmp" data-compare>
  <img src="antes.png" alt="...">          <!-- capa de abajo -->
  <div class="cmp__after">                  <!-- capa de arriba, recortada -->
    <img src="despues.png" alt="...">
  </div>
  <div class="cmp__handle">…</div>          <!-- línea + círculo -->
  <input class="cmp__range" type="range" min="0" max="100" value="50">
</div>
```

- El `input[type=range]` es invisible y cubre todo el recuadro: se puede arrastrar en cualquier
  punto, no solo sobre el círculo.
- Al moverse escribe `--pos` en el contenedor; `.cmp__after` usa
  `clip-path: inset(0 0 0 var(--pos))`, así que la capa de "después" se descubre desde la derecha.
- Las pestañas (`.excel-tab`) muestran un panel y ocultan el otro con `hidden`, actualizando
  `aria-selected`; se pueden manejar con las flechas del teclado.
- La animación de invitación corre una vez por panel cuando entra al 55 % del viewport, se
  cancela si el usuario interactúa y no corre con `prefers-reduced-motion`.

## 6. Puntos de extensión

| Quiero… | Dónde |
|---|---|
| Agregar una sección | Copiar un `<section class="section section--light">` y sumar el link al nav |
| Agregar un caso | Copiar un `<article class="case">` y (si es ancho) sumar `.case--wide` |
| Agregar un servicio | Copiar un `<article class="svc">` dentro de `.bento` |
| Cambiar un ícono | Editar/crear un `<symbol>` en el sprite del inicio del `body` |
| Cambiar un color global | Variable en `:root` (por ejemplo `--red`) |
| Cambiar el número de WhatsApp | `CONFIG.whatsapp` en `main.js` |

Los snippets completos están en el [manual de contenido](manual-de-contenido.md).

## 7. Performance

- **Sin JS de terceros**: el único recurso externo es la hoja de Google Fonts (dos familias,
  `display=swap`).
- **CSS único** (~41 KB sin minificar) y **JS único** (~13 KB): se cachean una sola vez.
- **Imágenes** en WebP/PNG con `width`/`height` para evitar saltos de layout; las de los casos
  van con `loading="lazy"`.
- **Animaciones** sobre `transform`/`opacity` y `IntersectionObserver` en lugar de listeners de
  scroll costosos (el scroll solo actualiza la barra de progreso, con `requestAnimationFrame`).
- `backdrop-filter` está acotado a nav, panel del hero y chips flotantes.

## 8. Limitaciones conocidas

- No hay CMS: cada cambio de texto es una edición de `index.html`.
- No hay suite de tests automatizada en el repo; las interacciones se validaron manualmente y con
  pruebas de DOM durante el desarrollo.
- El formulario no guarda datos: deriva a WhatsApp o al cliente de correo (no hay backend).
- No hay analítica instalada (si se agrega, conviene que sea sin cookies o con consentimiento).
