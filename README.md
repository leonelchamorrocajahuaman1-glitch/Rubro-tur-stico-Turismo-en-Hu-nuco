# WILD · Turismo en Huánuco, Perú

Sitio web turístico dedicado exclusivamente a Huánuco: sus atractivos arqueológicos,
naturales, culturales y gastronómicos. HTML, CSS y JavaScript vanilla, sin frameworks
ni paso de compilación.

## Estructura

```
index.html              Página única: portada, destinos, experiencias, planifica, contacto
css/styles.css          Estilos y paleta (montaña, selva, río Huallaga, atardecer)
js/data.js              Contenido: destinos, experiencias y leyendas del video
js/main.js              Animación de la portada, fichas de destino, filtros, formulario
js/credits.js           Créditos de fotografía (generado)
assets/img/             Fotografías reales de Huánuco (Wikimedia Commons, licencias CC)
assets/video/           Video de la portada (montaje hecho con esas fotografías)
fonts/                  Inter variable, autoalojada
tools/                  Scripts para importar fotos y generar el video
```

## Ver el sitio

Sirve la carpeta con cualquier servidor estático, por ejemplo:

```bash
python3 -m http.server 8000
```

y abre <http://localhost:8000>.

## Editar el contenido

- **Destinos y experiencias:** `js/data.js`. Cada destino tiene `intro`, `see`
  (qué ver), `access` (cómo visitarlo) y `tips`. Su foto es `assets/img/<img>.jpg`;
  si falta, se muestra un fondo de color con el nombre.
- **Video de la portada:** reemplaza `assets/video/huanuco.mp4` por un video propio
  (2:1 apaisado, silencioso, en bucle) o vuelve a generarlo con
  `tools/build-hero-video.sh`. Ajusta `heroCaptions` en `js/data.js` a sus tiempos.
- **Formulario de contacto:** hoy valida y confirma en pantalla, pero no envía
  datos. Conéctalo a tu correo o servicio de formularios en el bloque *CONTACTO*
  de `js/main.js`.

## Información turística

Los textos son generales y referenciales. Horarios, tarifas y condiciones de acceso
cambian: confírmalos con SERNANP, el Ministerio de Cultura y PromPerú antes de publicar
datos más específicos.

## Fotografías

Todas las fotos provienen de Wikimedia Commons bajo licencias Creative Commons; la
autoría y licencia de cada una aparecen en «Créditos de fotografía», al pie del sitio,
y en las fichas de cada destino. Las licencias CC BY-SA exigen mantener esa atribución.
