# Manual de contenido

Todo el contenido está en `index.html`. Abajo, las tareas más comunes.

## 1. WhatsApp y email (lo primero)

En `assets/js/main.js`, arriba de todo:

```js
const CONFIG = {
  whatsapp: "",                      // Ej.: "5491123456789"
  email: "hola@automatizahoy.com",
};
```

- Formato del número: **país + área + número**, sin `+`, sin `0`, sin espacios ni guiones.
- Al guardar, **todos** los botones con `data-wa` pasan a abrir WhatsApp con el mensaje escrito.
- Con `whatsapp: ""`, esos botones llevan al formulario de contacto y el formulario manda un mail.
- Cambiar `email` actualiza el `mailto:` y el texto visible del link.

Cada botón puede tener su propio mensaje:

```html
<a href="#contacto" data-wa data-wa-msg="¡Hola! Quiero turnos online para mi barbería.">
  Quiero turnos online
</a>
```

## 2. Textos por sección

| Sección | ID / clase | Qué se edita |
|---|---|---|
| Nav | `.nav` | Links y texto del CTA |
| Hero | `#top` | Antetítulo, `h1`, bajada, botones y los tres puntos de prueba |
| Estadísticas | `.hero__stats` | Números (`data-count`) y etiquetas |
| Marquee | `.marquee` | Tecnologías y clientes (está duplicado: editar **las dos** mitades) |
| Servicios | `#servicios` | Cuatro tarjetas `.svc` |
| Proceso | `#proceso` | Cuatro pasos `.step` |
| Casos | `#casos` | Tres tarjetas `.case` |
| Filosofía | `#nosotros` | Texto y comparativa Antes/Después |
| FAQ | `#faq` | Cinco preguntas |
| Contacto | `#contacto` | Título, bullets, links directos y formulario |
| Footer | `.footer` | Descripción, columnas y copyright |

Los títulos de sección son `h2` con clase `.section__title`. Si agregás un `<br>` para cortar la
línea, revisá que en móvil no quede un corte raro.

## 3. Cambiar los links de los proyectos

Buscar en `index.html`:

- `barberfort.com.ar` → aparece en la portada del caso, en el botón "Visitar el sitio" y en el footer.
- `citroenmartinortiga.ar` → mismo criterio.

Los botones usan `target="_blank" rel="noopener"`: no quitar el `rel`.

## 4. Reemplazar las capturas del Excel

Archivos en `assets/img/excel/`:

| Archivo | Qué muestra | Dónde se usa |
|---|---|---|
| `planilla-antes.png` | La planilla vieja | Comparador de "Planilla diaria" (1919×1079) |
| `planilla-despues.png` | La planilla nueva | Comparador de "Planilla diaria" (1909×1079) |
| `resumen-antes.png` | El resumen viejo | Comparador de "Resumen semanal" (420×356) |
| `resumen-despues.png` | El resumen nuevo | Comparador de "Resumen semanal" (1006×853) |

Recomendaciones:

1. Capturá las dos versiones de cada vista **con el mismo zoom y el mismo tamaño de ventana** y
   recortá el par al mismo ratio; si no, al mover el comparador una imagen "salta" respecto de la
   otra. Por eso `resumen-antes.png` está recortado al bloque de totales.
2. Anonimizá: nombres de clientes, teléfonos, importes reales y nombre del archivo en la barra de
   título.
3. Mantené el mismo nombre de archivo para no tocar el HTML. Si cambiás el nombre, actualizá el
   `src`, el `alt` y el `width`/`height`.

Para que el "después" se vea convincente, cargá 8–10 turnos de ejemplo antes de capturar: un
tablero en $0 pierde fuerza al lado del "antes" lleno de datos — y en el resumen semanal hoy se ven
cinco semanas en cero.

## 5. Agregar un caso nuevo

Copiar este bloque dentro de `.cases`, antes del caso Excel:

```html
<article class="case" data-reveal>
  <a class="case__media" href="https://ejemplo.com" target="_blank" rel="noopener"
     aria-label="Abrir el sitio de Ejemplo en una pestaña nueva">
    <div class="browser">
      <div class="browser__top">
        <span class="browser__dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="browser__url">ejemplo.com</span>
      </div>
      <div class="browser__screen">
        <img src="assets/img/ejemplo.webp" alt="Descripción de la captura" width="1200" height="750" loading="lazy">
      </div>
    </div>
  </a>

  <div class="case__body">
    <div class="case__brand">
      <img src="assets/img/ejemplo-logo.webp" alt="Ejemplo" width="300" height="60" loading="lazy">
      <span class="case__badge">Sitio en producción</span>
    </div>
    <h3>Título del caso</h3>
    <p>Qué problema tenía y qué se resolvió, en dos o tres líneas.</p>
    <ul class="case__list">
      <li><svg class="icon"><use href="#i-check"/></svg> Resultado 1</li>
      <li><svg class="icon"><use href="#i-check"/></svg> Resultado 2</li>
      <li><svg class="icon"><use href="#i-check"/></svg> Resultado 3</li>
      <li><svg class="icon"><use href="#i-check"/></svg> Resultado 4</li>
    </ul>
    <div class="case__tags"><span>Etiqueta</span><span>Etiqueta</span></div>
    <div class="case__actions">
      <a class="btn btn--light" href="https://ejemplo.com" target="_blank" rel="noopener">
        Visitar el sitio <svg class="icon" aria-hidden="true"><use href="#i-ext"/></svg>
      </a>
      <span class="case__url">ejemplo.com</span>
    </div>
  </div>
</article>
```

Si el caso es ancho (como el Excel), sumá `case--wide` al `<article>` y no lo envuelvas en un
link: adentro van controles (pestañas, comparador) y un `<a>` no puede contener botones.

## 6. Agregar un servicio

```html
<article class="svc" data-spotlight data-reveal>
  <span class="svc__num" aria-hidden="true">05</span>
  <span class="svc__icon"><svg class="icon"><use href="#i-flow"/></svg></span>
  <h3>Título del servicio</h3>
  <p>Qué problema resuelve, en dos líneas.</p>
  <ul class="svc__list">
    <li><svg class="icon"><use href="#i-check"/></svg> Beneficio 1</li>
    <li><svg class="icon"><use href="#i-check"/></svg> Beneficio 2</li>
  </ul>
</article>
```

La grilla `.bento` es de 3 columnas: si agregás una quinta tarjeta, revisá que el total cierre
(2+1 / 1+2) o pasá todas a `svc--wide` según el diseño que quieras.

Íconos disponibles en el sprite: `i-bolt`, `i-arrow`, `i-ext`, `i-check`, `i-chev`, `i-x`, `i-wa`,
`i-cart`, `i-flow`, `i-bot`, `i-qr`, `i-star`, `i-mail`, `i-clock`, `i-up`, `i-spark`, `i-globe`,
`i-menu`, `i-ig`. Para crear uno nuevo, copiá un `<symbol>` y cambiá el `id`.

## 7. Porta reseñas (producto)

La sección `#porta-resenas` (después de Servicios) muestra el producto con cuatro placas: una
personalizada (Barber Fort) y tres estilos base (Google, WhatsApp, Instagram).

### Cambiar una placa por otra

Cada placa es un `<figure class="porta">` con dos partes: la imagen del arte adentro del marco de
acrílico (`.porta__glass`) y el epígrafe (`figcaption`).

```html
<figure class="porta" data-reveal>
  <div class="porta__glass">
    <img class="porta__art" src="assets/img/porta/barberfort.webp"
      alt="Tarjeta de Barber Fort para el porta reseñas"
      width="800" height="1200" loading="lazy" decoding="async">
  </div>
  <figcaption class="porta__cap">
    <span class="porta__tag porta__tag--gold">Personalizado</span>
    <strong>Barber Fort</strong>
    <span class="porta__desc">Negro y dorado, con su QR y su Instagram.</span>
  </figcaption>
</figure>
```

Para reemplazar el arte: guardá la imagen en `assets/img/porta/` con proporción **2:3** (800 × 1200
es suficiente) y actualizá el `src`, el `width`/`height` y el `alt` del `<img>`. El marco de
acrílico es CSS: se adapta solo, no hay que tocarlo. El epígrafe va aparte, así que la misma placa
puede cambiar de nombre sin reexportar nada.

### El dorso y el giro

Cada placa gira al tocarla y muestra el dorso, donde va pegado el chip NFC. El frente es la imagen
del arte; el dorso está dibujado en CSS.

- `porta__face--dark` (fondo negro, para Barber Fort) o `porta__face--light` (claro, para los
  estilos base). Para una placa nueva, elegí el que combine con su arte.
- El chip es `.porta__chip`: disco con anillo dorado y la palabra NFC. Va al **71 %** del ancho y a
  la altura de la zona de apoyo (`top: 44%` en el dorso oscuro, `51%` en los claros). El 71 % no es
  capricho: el dorso está espejado respecto al frente, así que ese es el punto que queda
  físicamente detrás del apoyo (que en el frente está al 29 %).
- El giro lo maneja `initPortaFlip()` en `main.js`: no hay que tocar el HTML para cambiar nada de
  esto.
- Sin JS la placa queda del lado del frente y el botón no hace nada (el dorso no se ve).

### Los QR

Los QR ya vienen impresos en el arte. Si necesitás generar uno nuevo (para la placa de un cliente),
`scripts/gen-qr.mjs` produce el SVG listo para imprimir:

1. Editá `TARGETS` en `scripts/gen-qr.mjs` con la URL de destino.
2. Corré `node scripts/gen-qr.mjs`: escribe en `assets/img/qr/`.
3. `node scripts/verify-qr.mjs` comprueba el generador contra uno externo.

### Precio

Hoy el cierre de la sección no muestra precio: dice que se coordina por WhatsApp. Si querés
publicarlo, agregá un `<p>` debajo del `<h3>` de `.porta-cta` con el precio y un estilo corto en la
sección 13 de `styles.css`. Conviene precio "desde" si hay variantes (acrílico, tamaño, con envío).

## 8. Números y contadores

```html
<b data-count="12">0</b>
```

El número del `data-count` es el valor final; el `0` es lo que se ve si el JS no corre. Para
formatear con separador de miles no hace falta nada hasta 999; por encima habría que tocar
`initCounters`.

## 9. Cambiar el año del footer

Es automático (`#year` toma el año del sistema). No hay que tocarlo.

## 10. Cuidados al escribir

- **No inventar métricas.** Si no tenés el dato real ("−2 h por día"), describí el cambio.
- **Permiso del cliente.** Para mostrar un sitio o una planilla de un cliente, pedí autorización,
  y aun así anonimizá datos personales.
- **Coherencia de tono.** Voseo, frases cortas, beneficio concreto antes que tecnología.
- **Un solo `h1`.** El resto son `h2`/`h3`.
- **Texto alternativo.** Toda imagen necesita un `alt` que describa qué se ve, no "imagen 1".
