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
│       ├── qr/                    # QR del porta reseñas (SVG generados)
│       ├── porta/                 # Arte de las cuatro placas (WebP 800x1200)
│       └── excel/
│           ├── planilla-antes.webp
│           ├── planilla-despues.webp
│           ├── resumen-antes.png
│           └── resumen-despues.webp
├── scripts/
│   ├── build.mjs                 # Arma dist/ con lo que se publica
│   ├── gen-qr.mjs                # Genera los SVG de assets/img/qr/
│   └── verify-qr.mjs             # Comprueba el generador contra uno externo
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
| 5 | `initTypewriter` | Escribe el título del hero con cursor titilante, una sola vez |
| 6 | `initCounters` | Anima los `[data-count]` cuando entran en pantalla |
| 7 | `initAccordion` | Acordeón con animación de altura y `aria-expanded` |
| 8 | `initSpotlight` | Mueve un halo con `--mx`/`--my` en las tarjetas con `[data-spotlight]` |
| 9 | `initCompare` | Comparador antes/después: `--pos`, pestañas y animación de invitación |
| 10 | `initActiveLink` | Marca en el nav la sección visible |
| 11 | `initForm` | Valida nombre y consulta, arma el mensaje y lo abre en WhatsApp o mail |
| 12 | `initPortaFlip` | Gira las placas del porta reseñas y actualiza `aria-pressed` |
| 13 | `initToTop` | Botón "volver arriba" |
| 14 | `initYear` | Escribe el año actual en el footer |

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
- Las dos vistas son comparadores. La línea divisoria va en rojo con borde blanco y un halo que
  pulsa hasta el primer toque: sobre una planilla clara, una línea blanca no se ve y nadie entiende
  que hay que arrastrar.
- La animación de invitación corre una vez por panel cuando entra al 55 % del viewport, se
  cancela si el usuario interactúa y no corre con `prefers-reduced-motion`.

## 6. Puntos de extensión

| Quiero… | Dónde |
|---|---|
| Agregar una sección | Copiar un `<section class="section section--light">` y sumar el link al nav |
| Agregar un caso | Copiar un `<article class="case">` y (si es ancho) sumar `.case--wide` |
| Agregar un servicio | Copiar un `<article class="svc">` dentro de `.bento` |
| Cambiar un ícono | Editar/crear un `<symbol>` en el sprite del inicio del `body` |
| Agregar una tarjeta de porta reseñas | Copiar un `<figure class="porta">` y apuntar el `src` a la placa nueva |
| Cambiar a dónde apunta un QR | Editar `TARGETS` en `scripts/gen-qr.mjs` y volver a correrlo |
| Cambiar un color global | Variable en `:root` (por ejemplo `--red`) |
| Cambiar el número de WhatsApp | `CONFIG.whatsapp` en `main.js` |

Los snippets completos están en el [manual de contenido](manual-de-contenido.md).

### El porta reseñas: acrílico en CSS, arte en imagen

La sección `#porta-resenas` combina dos capas. El **marco de acrílico** es CSS: degradés
translúcidos, un brillo diagonal en `::before` y el espesor de la placa en `::after`. La **placa
impresa** es una imagen WebP de 800 × 1200 (`assets/img/porta/`) apoyada adentro del marco, con
sombra propia para que no parezca un rectángulo pegado.

Así, el arte final se ve nítido —sin los rayones ni los reflejos de las fotos del mostrador— y
cambiar el diseño de un cliente es reemplazar un archivo, no tocar CSS. La inclinación sale de
`perspective` + `rotateX/rotateY` sobre el marco y se apaga en móvil.

Cada placa es un **botón que gira**: `.porta__flip` aporta la perspectiva, `.porta__inner` tiene
`transform-style: preserve-3d` y las dos caras van superpuestas con `backface-visibility: hidden`. Al
tocar, `initPortaFlip()` agrega `.is-flipped` y el conjunto rota 180° en Y: adelante el arte
impreso, atrás el acrílico trasero con el chip NFC pegado detrás del punto de apoyo. Como la cara
trasera está espejada, el chip se posiciona al 71 % del ancho (el 29 % del frente visto del otro
lado), que es exactamente donde el cliente apoya el celular. El marco de acrílico no gira
(es simétrico), así que lo que da vuelta es la placa de adentro, no el mueble. El dorso se dibuja en
CSS (`.porta__face--dark` o `--light` según la placa) y el chip se dimensiona en `cqw`, con
`container-type: inline-size` en la cara trasera para que escale con la tarjeta.

Los QR de `assets/img/qr/` salen de `scripts/gen-qr.mjs`, una implementación propia de la ISO/IEC
18004 (modo byte, corrección L, versiones 2 a 4). Hoy la web muestra los QR impresos en el arte; los
generados quedan para las placas de clientes y para el personalizador. `scripts/verify-qr.mjs`
compara la matriz con la de un generador externo: si se toca el generador, ese test es la red de
seguridad.

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
- Los QR de la demo de porta reseñas apuntan a `barberfort.com.ar`, al sitio, al WhatsApp y al
  Instagram propios: son ejemplos reales, no los destinos de un cliente.
