# TraceIT — Web corporativa

Web de TraceIT (desarrollo de software a medida, Málaga), construida con [Astro 7](https://astro.build). Genera HTML estático: sin frameworks de JavaScript en el navegador, con ~6 KB de JS propio y las imágenes optimizadas automáticamente.

## Requisitos

- Node.js 22.12 o superior

## Comandos

| Comando           | Qué hace                                               |
| ----------------- | ------------------------------------------------------ |
| `npm install`     | Instala las dependencias                               |
| `npm run dev`     | Servidor de desarrollo en `http://localhost:4321`      |
| `npm run build`   | Genera la web final en `dist/`                         |
| `npm run preview` | Sirve `dist/` en local para revisarla antes de publicar |

## Dónde se edita cada cosa

| Qué                                              | Dónde                                         |
| ------------------------------------------------ | --------------------------------------------- |
| Email, teléfono, LinkedIn, datos legales, clave del formulario | `src/data/site.ts`               |
| Menú, enlaces de servicios del pie, tecnologías  | `src/data/site.ts`                            |
| Proyectos                                        | `src/content/proyectos/*.md`                  |
| Fotos                                            | `src/assets/photos/` (Astro las optimiza)     |
| Textos de cada página                            | `src/pages/*.astro`                           |
| Colores, tipografías y estilos                   | `src/styles/global.css` (variables al inicio) |
| Interacciones (menú, animaciones, formulario)    | `src/scripts/main.js`                         |
| Logos, favicon, imagen para redes sociales       | `public/` y `public/img/`                     |

### Añadir o cambiar un proyecto

Cada proyecto es un archivo Markdown en `src/content/proyectos/`. El nombre del archivo es su URL (`logistica.md` → `/proyectos/logistica/`). Copia uno existente y cambia:

- `title`, `sector`, `summary`: título, sector del cliente y resumen.
- `categories`: tipos para los filtros (`web`, `movil`, `intranet`, `dashboard`, `integracion`, `modernizacion`).
- `tags`: etiquetas visibles sobre la foto.
- `cover` y `coverAlt`: foto (en `src/assets/photos/`) y su descripción.
- `metrics` (máx. 2, en la tarjeta) y `results` (máx. 3, en la página del proyecto).
- `challenge`, `solution`, `stack`, `duration`.
- `featured: true` para que aparezca en la portada (se muestran los 3 primeros según `order`).
- Debajo del bloque `---`, el texto libre en Markdown ("Qué construimos").

Si falta un campo o tiene un formato incorrecto, `npm run build` avisa del error.

## Formulario de contacto (Web3Forms)

1. Regístrate gratis en <https://web3forms.com> con el email donde quieres recibir los mensajes.
2. Copia la *Access Key* que te envían.
3. Pégala en `web3formsKey` dentro de `src/data/site.ts` y vuelve a compilar.

Mientras la clave empiece por `TU_`, el formulario abre el programa de correo del visitante con el mensaje ya preparado, para que ningún contacto se pierda.

## Publicar la web

Opción recomendada, **Netlify, Vercel o Cloudflare Pages** (gratis para una web así): conecta el repositorio y configura:

- Comando de compilación: `npm run build`
- Carpeta de publicación: `dist`

Opción **hosting tradicional** (FTP): ejecuta `npm run build` y sube el contenido de `dist/` a la raíz del dominio. En servidores Apache, añade un `.htaccess` con `ErrorDocument 404 /404.html` para usar la página de error propia.

## Pendiente antes de publicar

- [ ] Teléfono real y URL de LinkedIn (`src/data/site.ts`).
- [ ] Datos legales reales: razón social, NIF, domicilio y datos registrales (`src/data/site.ts`).
- [ ] Clave de Web3Forms (ver arriba).
- [ ] Sustituir los 6 proyectos de ejemplo por proyectos reales (`src/content/proyectos/`).
- [ ] Revisar con un asesor los textos legales (aviso legal, privacidad, cookies): son una plantilla orientativa.
- [ ] Revisar los textos de "Nosotros" (misión, significado del nombre y valores son una propuesta).
- [ ] Si se añade analítica (Google Analytics, etc.), actualizar la política de cookies y añadir un banner de consentimiento.

## Créditos

- Fotografías: [Unsplash](https://unsplash.com) (licencia Unsplash, uso comercial permitido).
- Iconos: [Lucide](https://lucide.dev) (ISC) y [Simple Icons](https://simpleicons.org) (CC0).
- Tipografías: [Sora](https://fonts.google.com/specimen/Sora) y [Geist](https://vercel.com/font) (SIL Open Font License), alojadas en el propio servidor.
