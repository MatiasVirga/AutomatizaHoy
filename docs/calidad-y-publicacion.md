# Calidad y publicación

## 1. Checklist antes de publicar

- [ ] `CONFIG.whatsapp` tiene el número real (hoy está vacío) y el buzón
      `hola@automatizahoy.com.ar` existe.
- [ ] Los tres casos abren los links correctos en una pestaña nueva.
- [ ] No quedan datos reales de clientes en las capturas (nombres, teléfonos, importes).
- [ ] El `title` y la `meta description` están actualizados.
- [x] `og:image` apunta a una imagen absoluta de 1200×630 (`assets/img/og.png`).
- [x] `canonical` y `og:url` apuntan a `https://automatizahoy.com.ar/`.
- [ ] Se probó en celular, tablet y desktop (ver [responsive.md](responsive.md)).
- [ ] El formulario abre WhatsApp o el mail con el mensaje armado.
- [ ] No hay errores en la consola del navegador.
- [ ] Los archivos pesan lo razonable (ideal: menos de 1 MB en la primera carga).

## 2. SEO

Lo que ya está implementado en el `<head>`:

| Etiqueta | Estado | Qué hacer |
|---|---|---|
| `<title>` | Listo | Mantener entre 50 y 60 caracteres |
| `meta description` | Listo | Mantener entre 140 y 160 caracteres, con beneficio concreto |
| `canonical` | Placeholder | Reemplazar por el dominio final |
| Open Graph | Parcial | Cambiar `og:url`, `og:image` (absoluta) y `og:title` si cambia el enfoque |
| Twitter Card | Listo | — |
| JSON-LD `ProfessionalService` | Básico | Agregar `telephone`, `sameAs` (Instagram/LinkedIn) y `address` cuando existan |
| `lang="es-AR"` | Listo | — |
| Favicon | SVG en data URI | Reemplazar por un `.ico`/`.svg` propio si cambia la marca |

Recomendaciones:

1. **Una sola `h1`** por página (hoy es el título del hero).
2. Los textos de los casos conviene que incluyan el rubro y la ciudad si el negocio es local.
3. Si sumás más páginas, agregá `sitemap.xml` y `robots.txt`.
4. Los links externos llevan `rel="noopener"`; si algún día son pagos, sumar `sponsored`.

## 3. Accesibilidad

Ya resuelto:

- Skip link al contenido (`Saltar al contenido`).
- Estructura semántica: `header`, `nav`, `main`, `section`, `article`, `footer`.
- `aria-expanded` y `aria-controls` en menú móvil y acordeón.
- Pestañas del comparador con `role="tablist"`, `aria-selected` y navegación con flechas.
- `aria-label` en el `range` del comparador y en los links que solo tienen ícono.
- Foco visible en todos los interactivos (`:focus-visible`).
- Imágenes con `alt` descriptivo; íconos decorativos con `aria-hidden="true"`.
- Contraste: el rojo sobre oscuro se reemplaza por `--red-3` cuando es texto chico.
- `prefers-reduced-motion` desactiva animaciones y el auto-movimiento del comparador.

Al editar, cuidá:

- No borrar los `alt` ni los `aria-*`.
- Si agregás un botón que solo tiene un ícono, ponele `aria-label`.
- No usar `div` clickeable: siempre `<a>` o `<button>`.
- Si agregás un video, poné subtítulos y no lo autoplayees con sonido.

## 4. Performance

Referencias prácticas:

- El sitio no tiene JS de terceros: mantenerlo así (nada de jQuery, sliders externos ni fuentes de
  íconos).
- Las imágenes nuevas: WebP, ancho máximo 1600 px, y `loading="lazy"` si están debajo del pliegue.
- Las capturas del Excel conviene comprimirlas si superan los 250 KB cada una.
- Google Fonts ya está con `preconnect` y `display=swap`; no sumar más familias.
- Para medir: Lighthouse en Chrome (modo incógnito) o PageSpeed Insights con la URL publicada.
  Objetivo razonable: Performance > 90 en desktop y > 80 en móvil.

## 5. Publicación

El sitio es estático. Antes de publicar se arma la carpeta de salida:

```bash
node scripts/build.mjs
```

Eso genera `dist/` con **solo** los archivos del sitio (`index.html`, `404.html`, `assets/`,
`robots.txt`, `sitemap.xml`, `_headers` y `_redirects`). Quedan afuera `docs/`, `brand/`, el
README, el CHANGELOG y el propio script.

### Netlify (lo más rápido)

1. Entrar a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastrar la carpeta **`dist`** (no la raíz del proyecto).
3. Listo: queda una URL `algo.netlify.app`. Desde *Domain settings* se conecta
   `automatizahoy.com.ar` y `www.automatizahoy.com.ar`.
4. `_redirects` ya deja el dominio sin `www` como canónico y redirige `/index.html` a `/`.
5. `_headers` agrega seguridad básica y caché para CSS, JS e imágenes.

Si más adelante conectás un repo de Git, configurá:
**Build command:** `node scripts/build.mjs` · **Publish directory:** `dist`.

### Vercel

1. Importar el proyecto o arrastrar la carpeta en el dashboard.
2. Framework preset: **Other**. Build command: `node scripts/build.mjs`. Output directory: `dist`.

### GitHub Pages

1. Subir el repo a GitHub.
2. *Settings → Pages → Deploy from a branch*: `main` / `/root`.
3. La URL queda como `usuario.github.io/repo/`. Los paths son relativos, así que funciona igual.

### Dominio y HTTPS

- Cargar el dominio en el hosting y apuntar los DNS (A/CNAME) según indique la plataforma.
- El certificado HTTPS lo emite el hosting automáticamente (Netlify/Vercel/GitHub Pages).
- Después de conectar el dominio, actualizar `canonical`, `og:url` y `og:image` con la URL final.

### Cuidado con mayúsculas

Windows no distingue mayúsculas en los nombres de archivo, pero los servidores Linux **sí**.
Mantené todo en minúsculas (`assets/img/excel/...`) para que no se rompa al publicar.

## 6. Después de publicar

- Probar el sitio real en un celular (no solo en el emulador).
- Probar el botón de WhatsApp desde el teléfono.
- Enviar el formulario y verificar que el mensaje llegue completo.
- Pasar el sitio por [validator.w3.org](https://validator.w3.org/) y corregir lo que marque.
- Guardar una copia del estado publicado (un ZIP) antes de la próxima tanda de cambios.

## 7. Mantenimiento sugerido

| Frecuencia | Tarea |
|---|---|
| Cada caso nuevo | Sumar la tarjeta, comprimir la imagen, actualizar el contador de "sitios en producción" |
| Mensual | Revisar links externos (pueden cambiar de dominio) y el número de WhatsApp |
| Cada 3 meses | Revisar textos y precios de referencia; correr Lighthouse |
| Cuando cambie la marca | Actualizar `--red`, logos y favicon |
