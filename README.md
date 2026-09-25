# TraceIT — Web corporativa

Web de TraceIT (desarrollo de software a medida, Málaga), construida con [Astro 7](https://astro.build). Genera HTML estático: sin frameworks de JavaScript en el navegador, ~7 KB de JS propio, CSS incrustado en cada página e imágenes optimizadas automáticamente.

Páginas: Inicio, Servicios, Proyectos (listado con filtros y una página por proyecto), Cómo trabajamos, Nosotros, Contacto, Aviso legal, Privacidad, Cookies y 404.

## Requisitos

- Node.js 22.12 o superior

## Comandos

| Comando           | Qué hace                                                |
| ----------------- | ------------------------------------------------------- |
| `npm install`     | Instala las dependencias                                |
| `npm run dev`     | Servidor de desarrollo en `http://localhost:4321`       |
| `npm run build`   | Genera la web final en `dist/`                          |
| `npm run preview` | Sirve `dist/` en local para revisarla antes de publicar |

## Estructura

```text
brand/                  Kit de marca en vectorial (no se publica en la web)
public/                 Archivos servidos tal cual: logos, favicon, fuentes, robots.txt
src/
  assets/photos/        Fotos originales (Astro genera las versiones WebP)
  components/           Piezas reutilizables (cabecera, pie, tarjetas, sectores…)
  content/proyectos/    Un archivo Markdown por proyecto
  data/
    site.ts             Datos de contacto, legales, menú y tecnologías
    icons.json          Iconos y logotipos de tecnologías usados en la web
    mark-paths.json     Contornos del símbolo animado del fondo
  layouts/Base.astro    Estructura común: <head>, cabecera, pie y metadatos
  pages/                Una página por archivo (la ruta es el nombre)
  scripts/main.js       Interacciones: menú, animaciones, pestañas, formulario
  styles/global.css     Estilos y variables de diseño
```

## Dónde se edita cada cosa

| Qué                                                            | Dónde                                         |
| -------------------------------------------------------------- | --------------------------------------------- |
| Email, teléfono, LinkedIn, datos legales, clave del formulario | `src/data/site.ts` (`SITE`)                   |
| Menú y enlaces de servicios del pie                            | `src/data/site.ts` (`NAV`, `SERVICE_LINKS`)   |
| Tecnologías (carrusel de la portada y sección de Servicios)    | `src/data/site.ts` (`TECH`)                   |
| Proyectos                                                      | `src/content/proyectos/*.md`                  |
| Sectores de la portada                                         | `src/components/Sectors.astro`                |
| Preguntas frecuentes                                           | `src/pages/index.astro` (`faqs`)              |
| Textos de cada página                                          | `src/pages/*.astro`                           |
| Colores, tipografías y estilos                                 | `src/styles/global.css` (variables al inicio) |

### Añadir o cambiar un proyecto

Cada proyecto es un archivo Markdown en `src/content/proyectos/`. El nombre del archivo es su URL (`logistica.md` → `/proyectos/logistica/`). Copia uno existente y cambia:

- `title`, `sector`, `summary`: título, sector del cliente y resumen.
- `categories`: tipos para los filtros (`web`, `movil`, `intranet`, `dashboard`, `integracion`, `modernizacion`).
- `tags`: etiquetas visibles sobre la foto.
- `cover` y `coverAlt`: foto (en `src/assets/photos/`) y su descripción.
- `metrics` (máx. 2, en la tarjeta) y `results` (máx. 3, en la página del proyecto).
- `challenge`, `solution`, `stack` y, opcionalmente, `duration`.
- `featured: true` para que aparezca en la portada (se muestran los 3 primeros según `order`).
- Debajo del bloque `---`, el texto libre en Markdown ("Qué construimos").

Si falta un campo o tiene un formato incorrecto, `npm run build` avisa del error.

### Sectores

Cada sector de `src/components/Sectors.astro` tiene foto, textos, un proyecto relacionado opcional (`project`) y un punto de enfoque (`focus`). El enfoque indica qué parte de la foto queda visible al recortarla: por ejemplo, `"70% 40%"` desplaza el encuadre a la derecha y un poco hacia arriba.

### Tecnologías e iconos

Cada tecnología de `TECH` indica su nombre, su icono (`icon`), si es un logotipo de marca (`brand`) y su color oficial (`color`), que se usa en las baldosas. Si el número de tecnologías no completa la última fila de 3, se añade sola una baldosa de contacto.

Los iconos están en `src/data/icons.json`: las claves `i-*` son iconos de interfaz de [Lucide](https://lucide.dev) y las `t-*`, logotipos de tecnologías. Para añadir uno, copia el contenido del SVG (lo que va dentro de `<svg>…</svg>`) en una entrada nueva con su `viewBox`. Los logos de un solo color deben ir sin `fill` para que tomen el color de su baldosa.

## Marca y logos

- `brand/`: logo completo con subtítulo (en versión para fondo claro y para fondo oscuro) y símbolo, en vectorial. Es la referencia para imprenta, presentaciones o redes.
- `public/img/logo.svg` y `logo-light.svg`: logo sin subtítulo usado en la web, con el texto centrado verticalmente respecto al símbolo.
- `public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` e `img/icon-*.png`: iconos del navegador y de la app.
- `public/img/og-image.jpg`: imagen que aparece al compartir la web en redes sociales.
- `src/data/mark-paths.json`: contornos del símbolo que se dibuja animado en el fondo de las portadas.

Colores de marca: azul `#163458` y turquesa `#0AAA98`.

## Formulario de contacto (Web3Forms)

1. Regístrate gratis en <https://web3forms.com> con el email donde quieres recibir los mensajes.
2. Copia la _Access Key_ que te envían.
3. Pégala en `web3formsKey` dentro de `src/data/site.ts` y vuelve a compilar.

Mientras la clave empiece por `TU_`, el formulario abre el programa de correo del visitante con el mensaje ya preparado, para que ningún contacto se pierda.

## Publicar la web

Opción recomendada, **Netlify, Vercel o Cloudflare Pages** (gratis para una web así): conecta el repositorio y configura:

- Comando de compilación: `npm run build`
- Carpeta de publicación: `dist`

Opción **hosting tradicional** (FTP): ejecuta `npm run build` y sube el contenido de `dist/` a la raíz del dominio. En servidores Apache, añade un `.htaccess` con `ErrorDocument 404 /404.html` para usar la página de error propia.

## Pendiente antes de publicar

- [ ] Teléfono real (ahora `987 654 321`, provisional) y URL de LinkedIn (`src/data/site.ts`).
- [ ] Datos legales reales: razón social, NIF, domicilio y datos registrales (`src/data/site.ts`).
- [ ] Clave de Web3Forms (ver arriba).
- [ ] Sustituir los 6 proyectos de ejemplo por proyectos reales (`src/content/proyectos/`).
- [ ] Revisar con un asesor los textos legales (aviso legal, privacidad, cookies): son una plantilla orientativa.
- [ ] Revisar los textos de "Nosotros" (misión, significado del nombre y valores son una propuesta).
- [ ] Si se añade analítica (Google Analytics, etc.), actualizar la política de cookies y añadir un banner de consentimiento.

## Créditos

- Fotografías: [Unsplash](https://unsplash.com) (licencia Unsplash, uso comercial permitido).
- Iconos: [Lucide](https://lucide.dev) (ISC).
- Logotipos de tecnologías: [Simple Icons](https://simpleicons.org) (CC0), [Devicon](https://devicon.dev) (MIT) y [SVG Logos](https://github.com/gilbarbara/logos) (CC0). Las marcas pertenecen a sus respectivos titulares.
- Tipografías: [Sora](https://fonts.google.com/specimen/Sora) y [Geist](https://vercel.com/font) (SIL Open Font License), alojadas en el propio servidor.
