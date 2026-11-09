# Documentación — AutomatizaHoy

Índice de la documentación del sitio. Está pensada para que puedas volver en tres meses y
entender qué hay, cómo se toca y por qué está hecho así.

| Documento | Para qué sirve | Cuándo leerlo |
|---|---|---|
| [Arquitectura](arquitectura.md) | Cómo está armado el proyecto, qué hace cada archivo y cómo se conectan las piezas | Antes de tocar código |
| [Guía de estilos](guia-de-estilos.md) | Colores, tipografía, componentes y reglas visuales | Cuando agregás una sección o un componente |
| [Responsive](responsive.md) | Breakpoints, comportamiento en cada dispositivo y checklist de prueba | Antes de publicar o después de un cambio de layout |
| [Manual de contenido](manual-de-contenido.md) | Dónde cambiar textos, links, imágenes y datos de contacto | Para actualizaciones del día a día |
| [Calidad y publicación](calidad-y-publicacion.md) | SEO, accesibilidad, performance, deploy y checklist final | Antes de subirlo y después de cada release |

## Resumen en 10 líneas

- Es un sitio estático: **un HTML, un CSS y un JS**, sin build, sin frameworks y sin backend.
- Se abre haciendo doble clic en `index.html`; no necesita servidor.
- Todo el contenido está escrito a mano en `index.html`.
- El único dato "vivo" es la configuración de WhatsApp y email en `assets/js/main.js`.
- Los casos muestran dos sitios en producción y un comparador antes/después de un Excel.
- No hay base de datos: el formulario arma un mensaje de WhatsApp o un mail.
- No hay analytics ni cookies de terceros (solo Google Fonts).
- Los íconos son SVG inline: no hay Font Awesome ni Tailwind por CDN.
- Todo el movimiento respeta `prefers-reduced-motion`.
- El sitio se publica en cualquier hosting estático (Netlify, Vercel, GitHub Pages).

## Material de trabajo

En `docs/material/` quedaron los dos PDFs que estaban sueltos en la raíz
(`Nombres para Agencia Digital`, `Fabricación de Exhibidores Personalizados`). No forman parte
del sitio: son referencia.
