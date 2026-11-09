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

| Archivo | Qué muestra | Proporción actual |
|---|---|---|
| `planilla-antes.png` | La planilla vieja | 16:9 (1919×1079) |
| `planilla-despues.png` | La planilla nueva | 16:9 (1909×1079) |
| `resumen-antes.png` | El resumen viejo | 1,18:1 (742×629) |
| `resumen-despues.png` | El resumen nuevo | 1,18:1 (1006×853) |

Recomendaciones:

1. Capturá las dos versiones **con el mismo zoom y el mismo tamaño de ventana**.
2. Recortá el par al mismo ratio; si no, al mover el comparador una imagen "salta" respecto de la
   otra. La forma más rápida es recortar la que sobra (como se hizo con `resumen-antes.png`).
3. Anonimizá: nombres de clientes, teléfonos, importes reales y nombre del archivo en la barra de
   título.
4. Mantené el mismo nombre de archivo para no tocar el HTML. Si cambiás el nombre, actualizá el
   `src` y el `alt`.

Para que el "después" se vea convincente, cargá 8–10 turnos de ejemplo antes de capturar: un
tablero en $0 pierde fuerza al lado del "antes" lleno de datos.

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
`i-menu`. Para crear uno nuevo, copiá un `<symbol>` y cambiá el `id`.

## 7. Números y contadores

```html
<b data-count="12">0</b>
```

El número del `data-count` es el valor final; el `0` es lo que se ve si el JS no corre. Para
formatear con separador de miles no hace falta nada hasta 999; por encima habría que tocar
`initCounters`.

## 8. Cambiar el año del footer

Es automático (`#year` toma el año del sistema). No hay que tocarlo.

## 9. Cuidados al escribir

- **No inventar métricas.** Si no tenés el dato real ("−2 h por día"), describí el cambio.
- **Permiso del cliente.** Para mostrar un sitio o una planilla de un cliente, pedí autorización,
  y aun así anonimizá datos personales.
- **Coherencia de tono.** Voseo, frases cortas, beneficio concreto antes que tecnología.
- **Un solo `h1`.** El resto son `h2`/`h3`.
- **Texto alternativo.** Toda imagen necesita un `alt` que describa qué se ve, no "imagen 1".
