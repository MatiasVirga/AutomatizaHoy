# Changelog

Todos los cambios relevantes del sitio. Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
versionado semántico.

## [1.3.0] — 2026-11-09

### Agregado
- **Isotipo oficial de marca**: Nuevo isotipo recortado en alta fidelidad (`assets/img/isotipo.webp`) en el navbar y footer, dentro de cápsula blanca de alto contraste.
- **Favicon multiplataforma**: Generación de `favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png` y `apple-touch-icon.png` con la identidad corporativa.
- **Efecto Typewriter en el Hero**: Animación con cursor titilante en *"Tu negocio debería trabajar para vos,"*.
- **Spotlight dinámico**: Efecto de luz reactivo a las coordenadas del cursor en tarjetas de servicios y casos reales.
- **Aceleración exponencial (Quintic Easing)**: Desaceleración suave en los contadores numéricos al llegar a la meta.
- **Seguridad CSP (Content-Security-Policy)**: Reglas en `_headers` que bloquean inyecciones de scripts/iframes de terceros (incluyendo marcas de agua forzadas).

### Cambiado
- **Automatización CI/CD**: Configurado `netlify.toml` con comando de build (`node scripts/build.mjs`) y directorio `dist`.
- **Git & Repositorio**: Vinculado al repositorio remoto `git@github.com:MatiasVirga/AutomatizaHoy.git` bajo la cuenta `matias.virga@gmail.com`.
- **Caso Excel**: Renombrada etiqueta a *"PLANILLA BARBERÍA"*.
- **Alineación Footer**: Ícono de Instagram alineado en una sola línea con clase `.footer__link-icon`.

### Eliminado
- Referencias al correo electrónico temporal en el formulario, enlaces directos y schema JSON-LD, centralizando el canal de contacto en WhatsApp e Instagram.

### Agregado
- Pasada responsive fina: ajustes para 520 px y 380 px, feedback táctil (`:active`), objetivos
  táctiles de 44 px, inputs a 16 px en móvil (evita el zoom de iOS), `100dvh` en el menú móvil y
  respeto por las zonas seguras del iPhone.
- Documentación completa en `docs/`: arquitectura, guía de estilos, responsive, manual de
  contenido y calidad/publicación, más este changelog.

### Cambiado
- `overflow-x` pasa de `hidden` a `clip` con fallback, para no romper el `position: sticky` del FAQ.
- El menú móvil usa `overscroll-behavior: contain` y respeta la barra de gestos.

## [1.1.0] — 2026-11-01

### Agregado
- Tercer caso: **Excel de Barber Fort** como tarjeta ancha, con comparador antes/después de dos
  vistas (planilla diaria y resumen semanal) y pestañas accesibles.
- Animación de invitación que mueve el comparador una vez al entrar en pantalla.
- Cuatro capturas en `assets/img/excel/`.

### Cambiado
- El título de la sección de casos pasa a “No es un mockup. Esto está andando.” para cubrir tanto
  los sitios como el Excel.

### Corregido
- Recorte de `resumen-antes.png` al mismo ratio que el “después” para que el comparador no salte.

## [1.0.0] — 2026-11-01

### Agregado
- Rediseño completo del sitio: hero con panel de flujo automatizado, franja de tecnologías,
  servicios en grilla, proceso en cuatro pasos, casos con marco de navegador, filosofía con
  comparativa antes/después, FAQ en acordeón y contacto con formulario.
- Sistema de diseño en `assets/css/styles.css` con tokens, componentes y responsive.
- Interacciones en `assets/js/main.js`: scroll reveal, contadores, menú móvil, acordeón,
  spotlight, barra de progreso, botón “volver arriba” y validación del formulario.
- Página de casos con Barber Fort y Citroën Martin Ortiga, con botón “Visitar el sitio”.

### Eliminado
- Tailwind y Font Awesome por CDN: ahora el CSS es propio y los íconos son SVG inline.
