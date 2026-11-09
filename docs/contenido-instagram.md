# Contenido para Instagram — brief de producción

Guía para producir las 9 piezas de la grilla. Está pensada para pasarla a mano a una IA de
imagen, a Canva o a un editor, sin perder la identidad.

## 0. Regla de oro antes de escribir un prompt

**La IA no hace el post: hace el fondo y las variantes.** Los textos van compuestos en Canva o
Figma con Sora e Inter. Si le pedís a una IA de imagen que escriba "AutomatizaHoy" o un titular,
el 90 % de las veces sale deformado o con faltas.

| Necesidad | Herramienta | Por qué |
|---|---|---|
| Fondo abstracto, textura, ilustración | Midjourney, Ideogram, Firefly | Generan bien lo visual |
| Texto dentro de la imagen | Ideogram (si es imprescindible) o Canva | Las demás deforman las letras |
| Armado del carrusel | Canva o Figma con brand kit | Control exacto de tipografía y márgenes |
| Capturas de los casos | Captura real del sitio / Excel | Una captura generada se nota y no es prueba |
| Copy | ChatGPT / Claude con el prompt de voz | Escribe variantes rápido |
| Reel del Excel | CapCut + grabación de pantalla | Subtítulos automáticos y corte |

## 1. Kit de marca (pegar en cada prompt)

```
Paleta
  negro fondo      #0B0D10
  rojo principal   #C8102E
  rojo acento      #FF5A73  (solo sobre fondo oscuro)
  blanco humo      #F7F8FB
  grafito          #2C3E50
  línea            #E6E9F0 (solo sobre claro)

Tipografía
  Títulos: Sora Bold / ExtraBold, tracking -2 %
  Texto:   Inter Medium / Regular

Formato
  Feed:    1080 × 1350 px (4:5)
  Story:   1080 × 1920 px (9:16)
  Márgenes: 96 px arriba y abajo, 72 px a los lados
  Logo:    chico, abajo a la derecha o arriba a la izquierda, nunca centrado

Estilo
  Fondo oscuro, alto contraste, una sola línea roja como gesto gráfico,
  mucho aire, cero decoración. Si dudás, sacá elementos.
```

**Negative prompt para todas las imágenes generadas:**

```
text, letters, words, typography, robot, humanoid, glowing brain, circuit board,
neon gradient, purple, blue glow, stock photo, people shaking hands, hands,
laptop with code, 3D spheres, glassmorphism cards, clutter, watermark, logo
```

## 2. Prompts maestros

### Fondo abstracto (Midjourney / Ideogram / Firefly)

```
Minimal editorial background for an automation agency, deep charcoal canvas #0B0D10,
one thin crimson #C8102E line entering from the left and turning into a clean arrow,
subtle 1px grid, soft red glow top-left, generous empty space in the center-left
for typography, fine film grain, high contrast, no text, no logo
--ar 4:5 --style raw
```

### Voz de marca (ChatGPT / Claude)

```
Actuá como copywriter argentino especializado en PyMEs. Escribí para el Instagram de
una agencia de automatización e IA llamada AutomatizaHoy. Reglas: voseo, frases de
menos de 14 palabras, un solo dato concreto por placa, cero adjetivos vacíos
("innovador", "integral"), cero emojis salvo uno por placa, y siempre nombrar el
problema antes que la tecnología. Devolveme 3 variantes por placa.
```

## 3. Las 9 piezas

### Pieza 1 — Presentación

- **Formato:** 1 placa 4:5 (opcional: 3 placas si querés contar más).
- **Objetivo:** que alguien que no te conoce entienda en dos segundos qué hacés y para quién.
- **Texto:**
  - Antetítulo: `AUTOMATIZACIÓN PARA PyMEs`
  - Título: `Tu negocio debería trabajar para vos.`
  - Bajada: `Webs que venden, turnos que se agendan solos y planillas que se actualizan sin que las toques.`
  - Pie: `automatizahoy.com.ar`
- **Prompt de fondo:** el maestro, con la línea entrando desde la izquierda.
- **Composición:** título a la izquierda, en tres líneas, ocupando el 60 % del alto. La línea roja
  cruza por detrás del texto. Logo abajo a la derecha. Sin foto de personas.
- **Alternativa sin IA:** placa tipográfica pura, fondo #0B0D10, título en Sora 96 px y una barra
  roja de 6 px como único adorno.

### Pieza 2 — Caso Barber Fort

- **Formato:** carrusel de 6 placas.
- **Objetivo:** mostrar que el sistema existe y funciona, con capturas reales.
- **Texto por placa:**
  1. `2 sucursales. 7 barberos. Cero turnos anotados a mano.` · etiqueta `CASO · BARBER FORT`
  2. `Antes: cuaderno, WhatsApp y un turno pisado por semana.`
  3. `Ahora el cliente elige sucursal, barbero, servicio y horario. Solo.`
  4. `La confirmación llega por WhatsApp y la agenda se actualiza sola.`
  5. `Dos sedes, un solo sistema.` (si tenés un número real de turnos, va acá)
  6. `¿Tu barbería sigue con el cuaderno? Hablemos.`
- **Visual:** capturas reales del sitio (inicio, selector de sucursal, calendario, confirmación).
  La placa 1 puede ser tipográfica con la foto del local de fondo, oscurecida al 70 %.
- **Prompt:** no generar capturas. Si querés un fondo para la placa 1:
  `dark barbershop interior, moody lighting, deep shadows, crimson accent light, cinematic, no people, no text --ar 4:5`.
- **Nota:** cada captura va en un marco de navegador (como en el sitio), con la URL visible. Eso
  comunica "esto está online".

### Pieza 3 — Caso Citroën Martin Ortiga

- **Formato:** carrusel de 6 placas.
- **Texto por placa:**
  1. `Un negocio de 1963 que hoy vende repuestos a todo el mundo.` · etiqueta `CASO · CITROËN`
  2. `Antes: PDFs pesados, consultas una por una y precios desactualizados.`
  3. `Ahora: catálogo por categorías, búsqueda y carrito de consulta.`
  4. `Además: biblioteca de manuales técnicos y cotización de exportación.`
  5. `Pagan en efectivo, transferencia, Mercado Pago o Western Union. Reciben en cualquier país.`
  6. `¿Vendés por PDF? Se puede resolver.`
- **Visual:** capturas del catálogo, la ficha de producto y el carrito.
- **Prompt:** ninguno. Acá la prueba es el sitio real.

### Pieza 4 — Excel antes y después

- **Formato:** carrusel de 5 placas o reel de 10 segundos.
- **Texto por placa:**
  1. `Este Excel tenía cinco hojas y ninguno de los totales cerraba.`
  2. `Antes.` (imagen del resumen viejo, con la etiqueta ANTES)
  3. `Después.` (imagen del resumen nuevo, etiqueta DESPUÉS)
  4. `Una hoja por día, efectivo y Mercado Pago separados, totales que se calculan solos.`
  5. `¿Tenés un Excel así? Mandanos una captura.`
- **Visual:** las mismas imágenes del comparador del sitio, recortadas a 4:5.
- **Reel:** grabación de pantalla de 10 s arrastrando el comparador, con subtítulos y música suave.
  Guion en el documento de video (mismo orden: antes, transición, después, cierre).

### Pieza 5 — 3 tareas que podés automatizar esta semana

- **Formato:** carrusel de 5 placas (portada + 3 + cierre).
- **Texto:**
  1. `3 tareas que podés automatizar esta semana.`
  2. `Turnos. Que el cliente elija y la agenda se actualice sola.`
  3. `Presupuestos. Que el pedido llegue armado a tu WhatsApp.`
  4. `Reseñas. Que el cliente deje la opinión en el momento justo.`
  5. `¿Cuál de las tres te está pasando hoy?`
- **Visual:** íconos lineales blancos (calendario, carrito, estrella) sobre fondo oscuro, sin
  ilustraciones generadas. Se arman en Canva con el sprite del sitio como referencia.

### Pieza 6 — El proceso en 4 pasos

- **Formato:** carrusel de 5 placas.
- **Texto:**
  1. `De la charla al sistema andando.`
  2. `01 · Diagnóstico. 30 minutos para entender qué te frena. Sin costo.`
  3. `02 · Prototipo. Ves el diseño antes de pagar el desarrollo.`
  4. `03 · Implementación. Entre una y tres semanas, probado con datos reales.`
  5. `04 · Mejora continua. Medimos qué funciona y ajustamos.`
- **Visual:** una línea roja continua que atraviesa las cuatro placas y se convierte en flecha en la
  última. Es el mismo gesto del logo y da continuidad al carrusel.

### Pieza 7 — Testimonio

- **Formato:** 1 o 2 placas.
- **Texto:** `Lo que dicen los que ya lo usan.` + cita textual + nombre y rubro.
- **Visual:** captura real de la reseña (Google o WhatsApp), con el apellido tapado. Fondo oscuro,
  captura centrada con sombra.
- **Nota:** si todavía no tenés una reseña, no inventes una. Usá una frase del cliente en la pieza
  del caso, citada con permiso.

### Pieza 8 — Detrás de escena

- **Formato:** 1 a 3 placas o reel corto.
- **Texto:** `Así se arma un sistema: menos magia, más orden.`
- **Visual:** fotos reales del escritorio, la pantalla con el editor, un pizarrón con el flujo.
  Luz cálida, desorden controlado. Nada de stock.
- **Prompt (solo si no tenés fotos):** `overhead desk of a developer at night, dark room, warm
  lamp, notebook with hand-drawn flow diagram, mechanical keyboard, subtle red accent, film
  grain, no people, no text --ar 4:5`.

### Pieza 9 — CTA

- **Formato:** 1 placa 4:5 + versión story con sticker de encuesta.
- **Texto:**
  - Título: `¿Qué te está robando más tiempo?`
  - Bajada: `Contanos en dos líneas. Si se puede automatizar, te decimos cómo.`
  - Pie: `automatizahoy.com.ar`
- **Visual:** fondo oscuro, una flecha roja apuntando al link (abajo a la derecha). Nada más.
- **Story:** misma placa + encuesta "¿Cuál te duele más?" con tres opciones.

## 4. Calendario sugerido

| Semana | Publicaciones |
|---|---|
| 1 | Pieza 1 (presentación), Pieza 5 (3 tareas), Pieza 9 (CTA) |
| 2 | Pieza 2 (Barber Fort), Pieza 6 (proceso), Pieza 7 (testimonio) |
| 3 | Pieza 3 (Citroën), Pieza 4 (Excel), Pieza 8 (detrás de escena) |

Tres por semana: martes, jueves y sábado a las 18-20 h. Fijá las piezas 2, 3 y 4.

## 5. Hashtags y texto alternativo

Hashtags (5 a 8): `#automatizacion #pymes #inteligenciaartificial #paginasweb #turnosonline
#barberia #emprendedores #buenosaires`

Texto alternativo: describí lo que se ve, no lo que querés vender. Ejemplo:
"Captura del calendario de turnos de Barber Fort con los horarios ocupados en rojo".

## 6. Checklist antes de publicar

- [ ] Una idea por placa.
- [ ] Ningún titular con más de 12 palabras.
- [ ] Mismo margen y mismo lugar para el logo en todas las placas.
- [ ] Solo dos colores por placa (negro + rojo, o blanco + rojo).
- [ ] Las capturas son reales y no muestran datos de clientes.
- [ ] El texto está compuesto en Canva, no generado por IA.
- [ ] Última placa con una acción concreta.
