# Responsive

## 1. Estrategia

El CSS está escrito **desktop-first**: los estilos base son para pantalla grande y cada
`@media (max-width: …)` ajusta hacia abajo. Se eligió así porque el diseño tiene piezas que solo
existen en desktop (panel de flujo al costado, comparador ancho, columnas de casos) y es más
simple describirlas una vez y simplificarlas después.

Reglas generales:

- Ningún tamaño de texto es fijo: todos usan `clamp()` para escalar con el viewport.
- El ancho lo define el contenedor (`min(1180px, 100% - 2 × gutter)`), no los breakpoints.
- Los breakpoints se usan solo cuando **cambia la estructura**, no para "achicar" cosas.

## 2. Breakpoints

| Ancho | Qué cambia |
|---|---|
| `≤ 1200px` | Los chips flotantes del hero se acercan al panel |
| `≤ 1080px` | Se oculta la maqueta decorativa de servicios y los chips flotantes |
| `≤ 980px` | Hero a una columna · stats en 2×2 · servicios en 2 columnas · proceso en 2 · casos en 1 · caso Excel apilado · nosotros en 1 · FAQ en 1 (sin sticky) · contacto en 1 · footer en 2 |
| `≤ 860px` | El nav reemplaza los links por el botón hamburguesa; se oculta el CTA del nav |
| `≤ 720px` | Servicios, proceso y footer en 1 columna · listas de caso en 1 columna · formulario en 1 columna · botones de caso a ancho completo · inputs a 16 px |
| `≤ 520px` | Hero más compacto · panel de flujo sin etiquetas laterales · pestañas del Excel más chicas · comparador a sangre |
| `≤ 420px` | Gutter más chico · botones del hero a ancho completo |
| `≤ 380px` | Marca y paddings de tarjetas reducidos |

Además hay dos consultas por **capacidad**, no por ancho:

- `@media (hover: none)`: neutraliza los `:hover` de tarjetas y botones (en táctil quedan
  "pegados" después del toque) y agrega `:active` como feedback.
- `@media (pointer: coarse)`: lleva los objetivos táctiles a 44 px (pestañas del comparador,
  acordeón, botón "volver arriba").

## 3. Comportamiento por componente

### Navegación
- Desktop: links centrados + CTA "Hablemos".
- Tablet/móvil: hamburguesa de 44 px y menú a pantalla completa (`100dvh`) con links grandes,
  bloqueo del scroll del body y cierre con `Esc`, con el link tocado o al rotar a landscape.
- El nav se compacta al scrollear y agrega fondo con blur.

### Hero
- Dos columnas en desktop; en tablet y móvil el panel de flujo pasa abajo del texto.
- El panel de flujo reduce paddings y oculta las etiquetas de estado en pantallas chicas para
  que el texto respire.
- Los chips flotantes ("Nueva reseña", "Pedido") desaparecen por debajo de 1080 px: son
  decorativos y tapaban contenido.
- Las estadísticas pasan de 4 a 2 columnas.

### Servicios / proceso
- Grilla de 3 columnas con dos tarjetas anchas (2 columnas) en desktop.
- En tablet: 2 columnas, las anchas siguen ocupando las dos.
- En móvil: 1 columna y las tarjetas anchas pierden el `span`.

### Casos
- Desktop: dos tarjetas lado a lado y el caso Excel a ancho completo.
- Tablet/móvil: una tarjeta por fila; el caso Excel pasa a columna (comparador arriba, texto
  abajo).
- En móvil, el botón "Visitar el sitio" ocupa todo el ancho y la URL se centra debajo.

### Comparador antes/después
- Mantiene su proporción (16:9 para la planilla, 4:3 para el resumen) y usa `object-fit: contain`,
  así que nunca se deforma ni recorta información.
- En pantallas de menos de 520 px las capturas se ven chicas: es el compromiso de mostrar la
  hoja completa. Se puede hacer pinch-zoom en el celular (no está bloqueado).
- El `range` invisible tiene `touch-action: pan-y`: el arrastre horizontal mueve el comparador y
  el vertical sigue scrolleando la página.

### Formulario
- Una columna por debajo de 720 px.
- Los campos usan 16 px en móvil para evitar el zoom automático de iOS al enfocar.
- El botón queda a ancho completo y el texto de ayuda se mantiene visible.

### Footer
- 4 columnas → 2 → 1. El botón "volver arriba" se alinea a la derecha y respeta la barra de
  gestos del iPhone (`env(safe-area-inset-bottom)`).

## 4. Técnicas aplicadas

| Problema | Solución |
|---|---|
| Textos que no escalan | `clamp(min, vw, max)` en títulos y espaciados |
| Scroll horizontal fantasma | `overflow-x: clip` en `html` y `body` (con fallback `hidden`) |
| `position: sticky` roto por `overflow` | `clip` no crea contenedor de scroll, así el FAQ sigue funcionando |
| Hover pegado en táctil | `@media (hover: none)` |
| Objetivos táctiles chicos | `@media (pointer: coarse)` con mínimo 44 px |
| Zoom de iOS en inputs | `font-size: 16px` en campos bajo 720 px |
| Altura del menú con la barra del navegador | `100dvh` |
| Notch / barra de gestos | `env(safe-area-inset-bottom)` |
| Imágenes deformadas | `aspect-ratio` + `object-fit` |
| Capturas de distinta proporción | Recorte previo al mismo ratio (caso resumen del Excel) |

## 5. Matriz de prueba

| Dispositivo / ancho | Qué mirar |
|---|---|
| 320 px (iPhone SE 1ª gen) | Nada desborda; título del hero en 3–4 líneas; tabs del Excel entran en una fila |
| 360–390 px (Android / iPhone 12-15) | Formulario sin zoom; comparador usable con el dedo |
| 414 px (iPhone Plus) | Stats en 2×2 sin cortes |
| 768 px (iPad vertical) | Hero a una columna; servicios en 2 |
| 820–1024 px (iPad horizontal) | Nav con hamburguesa; casos en 1 columna |
| 1280–1440 px (notebook) | Layout completo; hero de dos columnas |
| 1920 px (monitor) | Contenedor centrado, sin líneas demasiado largas |
| Landscape < 520 px de alto | El menú móvil scrollea y el CTA final queda visible |

## 6. Checklist de QA (antes de publicar)

- [ ] En cada ancho no aparece scroll horizontal.
- [ ] Todos los links del nav llevan a la sección correcta y no quedan tapados por la barra fija.
- [ ] El menú móvil abre, cierra con la X, con `Esc` y al tocar un link.
- [ ] El comparador se mueve con el dedo sin trabar el scroll vertical.
- [ ] Las pestañas del Excel cambian de vista y no se desbordan.
- [ ] Ninguna imagen se estira ni se recorta información importante.
- [ ] El formulario se puede completar con el teclado abierto y el botón queda a la vista.
- [ ] El acordeón abre y cierra; no quedan dos abiertos.
- [ ] El botón "volver arriba" funciona.
- [ ] Con "reducir movimiento" activado no hay animaciones.
- [ ] Zoom al 200 %: el texto sigue legible y no se superpone.
- [ ] En iPhone con notch, el footer y el menú no quedan debajo de la barra de gestos.
