# Guía de estilos

Sistema visual del sitio. Si agregás algo nuevo, esto es lo que tiene que respetar para que no
parezca de otro sitio.

## 1. Principios

1. **Oscuro para el impacto, claro para leer.** El hero y los casos van en negro; el resto en
   blanco/gris muy claro.
2. **El rojo es del cliente, no del fondo.** El acento se usa en botones, íconos y detalles; nunca
   en bloques grandes de texto.
3. **Todo está en una grilla de 12 columnas mentales.** Los anchos salen de `grid` con `gap`, no
   de márgenes mágicos.
4. **Movimiento corto y con intención.** Nada tarda más de 0,8 s ni se mueve porque sí.

## 2. Color

| Token | Hex | Uso |
|---|---|---|
| `--red` | `#C8102E` | Acción principal, íconos de check, badges, acento de sección |
| `--red-2` | `#E11D3C` | Gradiente de botones, hover, barra de progreso |
| `--red-3` | `#FF5A73` | Texto de acento **sobre fondo oscuro** (el rojo puro no contrasta) |
| `--red-soft` | `#FFF1F3` | Fondos suaves de íconos y chips |
| `--ink` | `#0B0D10` | Fondo oscuro principal, texto sobre claro |
| `--ink-2` | `#12161C` | Superficies oscuras (cards de casos) |
| `--ink-3` | `#1A2028` | Superficies elevadas |
| `--graphite` | `#2C3E50` | Heredado de la paleta original, uso puntual |
| `--body` | `#4A5568` | Texto de párrafo sobre fondo claro |
| `--muted` | `#6B7787` | Notas, metadatos, placeholders |
| `--line` | `#E6E9F0` | Bordes de tarjetas y divisores |
| `--paper` | `#F7F8FB` | Fondo de secciones alternas |
| `--white` | `#FFFFFF` | Fondo principal y superficies de formulario |

Superficies oscuras específicas (no son tokens porque se usan una sola vez): `#131820` → `#0D1117`
en las tarjetas de casos, `#141A22` en el panel de contacto, `#080A0D` en el footer.

**Regla de contraste:** sobre `--ink`, el texto de párrafo es `#98A4B1` o más claro; nunca usar
`--body` sobre oscuro. Sobre blanco, el rojo solo se usa en tamaños grandes o en íconos.

## 3. Tipografía

- **Títulos y marca:** `Sora`, pesos 600 / 700 / 800, `letter-spacing` negativo (`-.02em` a `-.035em`).
- **Texto:** `Inter`, pesos 400 / 500 / 600, `line-height` 1.6.
- Se cargan desde Google Fonts con `display=swap`; si no cargan, cae a `system-ui`.

| Rol | Tamaño | Peso |
|---|---|---|
| H1 hero | `clamp(2.15rem, 5.1vw, 4rem)` (móvil: `clamp(1.9rem, 9vw, 2.55rem)`) | 800 |
| H2 de sección | `clamp(1.85rem, 3.5vw, 2.9rem)` | 700 |
| H2 del panel de contacto | `clamp(1.75rem, 3.2vw, 2.7rem)` | 700 |
| H3 de tarjeta | `1.22rem` – `1.4rem` | 600 |
| Lead / bajada | `clamp(.98rem, 1.2vw, 1.1rem)` | 400 |
| Cuerpo | `0.9rem` – `1rem` | 400 |
| Eyebrow (antetítulo) | `0.71rem`, mayúsculas, `letter-spacing .18em` | 600 |
| Etiquetas y chips | `0.58rem` – `0.72rem`, mayúsculas | 600/700 |

## 4. Espaciado y layout

- Contenedor: `min(1180px, 100% - 2 × --gutter)`, con `--gutter: clamp(1.15rem, 4vw, 2rem)`.
- Secciones: `padding: var(--section-y) 0` con `--section-y: clamp(72px, 8vw, 124px)`.
- Grillas: `gap` de 18–22 px entre tarjetas, 26–28 px en layouts de dos columnas.
- Padding interno de tarjeta: 28–30 px en desktop, 20–24 px en móvil.

## 5. Formas y profundidad

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | 12px | Inputs, chips chicos |
| `--radius` | 20px | Tarjetas medianas |
| `--radius-lg` | 28px | Tarjetas de caso |
| `--radius-xl` | 34px | Panel de contacto |
| `--shadow-card` | `0 30px 60px -40px rgba(27,35,50,.38)` | Hover de tarjetas claras |
| `--shadow-dark` | `0 40px 80px -40px rgba(0,0,0,.85)` | Superficies oscuras |

Los bordes son de 1 px y casi siempre translúcidos (`rgba(255,255,255,.08)`) sobre oscuro, o
`--line` sobre claro.

## 6. Componentes

### Botones (`.btn`)

| Variante | Cuándo |
|---|---|
| `.btn--primary` | Acción principal de la pantalla (máx. una por bloque) |
| `.btn--ghost` | Acción secundaria sobre fondo oscuro |
| `.btn--light` | Acción sobre fondo oscuro o tarjeta oscura ("Visitar el sitio") |
| `.btn--sm` / `.btn--lg` / `.btn--block` | Tamaño y ancho completo |

Estados: hover sube 2 px y agranda la sombra; en táctil no hay hover, hay `:active` con
`scale(.98)`. El botón primario tiene un brillo que cruza al hacer hover.

### Tarjetas

- `.svc` — servicios, con ícono en degradé, número decorativo y halo que sigue al mouse.
- `.step` — pasos del proceso, con número en cubo rojo.
- `.case` — casos, fondo oscuro; `.case--wide` ocupa las dos columnas.
- `.browser` — marco de navegador falso para las capturas de sitios.

### Navegación

`.nav` es fija y transparente; al scrollear agrega `.is-scrolled` (fondo negro al 84 % + blur).
En móvil se reemplazan los links por `.burger` y `.mobile-menu` a pantalla completa.

### Comparador (`.cmp`)

Marco blanco con dos imágenes superpuestas, etiquetas **Antes / Después**, línea con círculo y
un `range` invisible encima. Las pestañas (`.excel-tab`) cambian de vista.

### Acordeón (`.acc`)

Botón con chevron que rota, panel con animación de altura. Solo uno abierto a la vez.

### Formulario (`.form`)

Inputs blancos sobre tarjeta blanca, borde `#DDE3EC`, foco con halo rojo de 4 px. Estado de error
con borde rojo y fondo rosado; nota inferior con estado `is-error` / `is-ok`.

## 7. Animaciones

| Patrón | Detalle |
|---|---|
| Aparición al scroll | `[data-reveal]`: opacidad 0 → 1 y 26 px de desplazamiento, 0,8 s |
| Retardo escalonado | `style="--d:1..4"` → 100 ms por paso |
| Entrada del hero | `[data-reveal="zoom"]` escala 0,965 → 1 |
| Hover de tarjeta | −6 px y sombra, 0,45 s |
| Contadores | 1,5 s con easing cúbico |
| Marquee | 42 s lineal, loop infinito |
| Invitación del comparador | 1,8 s, una sola vez |

Easing estándar: `--ease: cubic-bezier(.22, 1, .36, 1)`. Todo se anula con
`prefers-reduced-motion: reduce`.

## 8. Reglas de copy

- Español rioplatense, voseo ("elegí", "mirá", "contanos").
- Frases cortas, sin adjetivos vacíos ("innovador", "sinergia", "soluciones integrales").
- Beneficio concreto antes que tecnología: "el pedido llega listo para cobrar" > "integración de API".
- No inventar métricas. Si no hay número real, describir el cambio cualitativamente.
- Los tecnicismos van entre comillas o en cursiva, y siempre explicados por contexto.

## 9. Do / Don't

| Sí | No |
|---|---|
| Usar `--red` en un botón o un check | Pintar un párrafo entero de rojo |
| Un `h2` por sección | Varios `h2` compitiendo |
| Máximo dos tipografías | Sumar una tercera familia |
| Sombras suaves y grandes | Bordes duros o `box-shadow` negra chica |
| Animaciones de 0,3–0,8 s | Animaciones de 2 s o rebotes exagerados |
| Íconos SVG del sprite | Emojis como íconos de interfaz |
