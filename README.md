# AutomatizaHoy — sitio web

Landing de una página (HTML + CSS + JS, sin build ni dependencias) para presentar servicios de
automatización, IA y desarrollo web, y mostrar los casos reales: Barber Fort, Citroën Martin
Ortiga y la transformación de un Excel de caja.

## Estructura

```
AutomatizaHoy/
├── index.html              # Contenido y estructura semántica
├── assets/
│   ├── css/styles.css      # Design system, componentes, animaciones y responsive
│   ├── js/main.js          # Interacciones: menú, reveal, contadores, comparador, formulario
│   └── img/
│       ├── ...             # Capturas y logos de Barber Fort y Citroën
│       ├── qr/             # QR del porta reseñas (SVG, generados)
│       ├── porta/          # Arte de las cuatro placas del porta reseñas
│       └── excel/          # Antes/después del Excel (planilla y resumen)
├── scripts/                # build.mjs (arma dist/) + gen-qr.mjs + verify-qr.mjs
├── docs/                   # Documentación (ver tabla abajo) + material de referencia
├── CHANGELOG.md
└── README.md
```

## Cómo verlo

Doble clic en `index.html`. No necesita servidor, instalación ni build.

Para publicarlo, subí la carpeta completa a Netlify, Vercel, GitHub Pages o cualquier hosting
estático (el paso a paso está en [calidad y publicación](docs/calidad-y-publicacion.md)).

## Empezar rápido: WhatsApp y email

En `assets/js/main.js`, arriba de todo:

```js
const CONFIG = {
  whatsapp: "",                      // Ej.: "5491123456789"
  email: "hola@automatizahoy.com",
};
```

Mientras `whatsapp` esté vacío, los botones llevan al formulario y el formulario manda un mail.
Al pegar el número, **todos** los botones de la web se actualizan solos.

## Documentación

| Documento | Contenido |
|---|---|
| [Arquitectura](docs/arquitectura.md) | Cómo está armado, qué hace cada archivo, cómo extenderlo |
| [Guía de estilos](docs/guia-de-estilos.md) | Paleta, tipografía, componentes y reglas visuales |
| [Responsive](docs/responsive.md) | Breakpoints, comportamiento por dispositivo y checklist de QA |
| [Manual de contenido](docs/manual-de-contenido.md) | Cambiar textos, links, imágenes y agregar casos o servicios |
| [Calidad y publicación](docs/calidad-y-publicacion.md) | SEO, accesibilidad, performance, deploy y mantenimiento |

## Detalles técnicos

- **Sin dependencias**: no usa Tailwind ni Font Awesome por CDN; los íconos son SVG inline
  (sprite al inicio del `body`), así que carga rápido y funciona offline.
- **Responsive**: layout fluido con `clamp()`, breakpoints de 1200 a 380 px, ajustes para
  dispositivos táctiles (sin hover pegado, objetivos de 44 px), zonas seguras del iPhone y
  `prefers-reduced-motion`.
- **Animaciones**: scroll reveal con `IntersectionObserver`, contadores, marquee infinito,
  spotlight en tarjetas, navbar con blur al scrollear, barra de progreso y acordeón animado.
- **Comparador antes/después**: sin librerías, con `clip-path` y `input[type=range]`; dos vistas
  (planilla diaria y resumen semanal), con línea divisoria en rojo para que se entienda el arrastre.
- **Porta reseñas**: marco de acrílico dibujado en CSS (degradés, brillo y espesor) con la placa
  impresa adentro como WebP 2:3; la inclinación se endereza al pasar el mouse. Los QR del arte
  salen de `scripts/gen-qr.mjs`.
- **Accesibilidad**: HTML semántico, skip link, `aria-expanded`, pestañas con teclado y foco visible.
- **SEO**: metadatos, Open Graph y JSON-LD (`ProfessionalService`).

## Pendientes sugeridos

- [ ] Pegar el número de WhatsApp real en `CONFIG.whatsapp` y crear el buzón
      `hola@automatizahoy.com.ar`.
- [ ] Cargar 8–10 turnos de ejemplo en el Excel nuevo y volver a capturar: el "después" hoy se
      ve con todos los totales en $0 y pierde fuerza al lado del "antes".
- [ ] Definir el refresh del isotipo (ver [brand/](brand/README.md)) y usarlo en el header, el
      favicon y el avatar de Instagram: hoy el sitio muestra un rayo y el logo es la A con flecha.
- [ ] Definir precio y plazo del porta reseñas: la sección no muestra precio y la FAQ todavía no
      tiene preguntas del producto.

## Publicar

```bash
node scripts/build.mjs   # genera dist/ con solo lo que se publica
```

Después se arrastra `dist/` en Netlify Drop. El paso a paso está en
[calidad y publicación](docs/calidad-y-publicacion.md).
