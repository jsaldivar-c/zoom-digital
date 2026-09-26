# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Landing page de una sola página (demo) para **Estudio Fotográfico Zoom Digital** (fotografía y videografía de bodas, XV años y eventos, zona Ecatepec / Estado de México). El contenido del negocio y el copy están en español; el sitio y su copy deben ir en español.

Objetivo único: captar contactos por **WhatsApp** (55-5192-8856). CTA principal "Agenda tu sesión" → WhatsApp; CTA secundario Ver paquetes / Ver galería. Sin backend ni formularios: el contacto es directo a WhatsApp.

## Comandos

```bash
npm install        # instala dependencias
npm run dev        # servidor de desarrollo en http://localhost:3000
npm run build      # build de producción (incluye typecheck)
npm run start      # sirve el build de producción
npm run lint       # ESLint (ignora references/)
npx tsc --noEmit   # typecheck sin generar archivos
```

No hay pruebas automatizadas (quedaron fuera del alcance del spec 01), así que no hay comando de test ni forma de correr uno solo. La verificación es `lint` + `build` + revisión visual en el navegador.

## Stack

Next.js 16.3.6 (App Router, Turbopack) + React 19.2.8 + TypeScript + **CSS Modules**, sin Tailwind. Alias `@/*` apunta a la raíz. Iconos con `@phosphor-icons/react`. Fuente Inter vía `next/font/google` (pesos 400 y 500).

**Este no es el Next.js que conoces:** tiene cambios de APIs y convenciones (por ejemplo `priority` de `next/image` está deprecado a favor de `preload`). Antes de escribir código, leer la guía relevante en `node_modules/next/dist/docs/` (ver también `AGENTS.md`).

## Arquitectura

Página única estática: `app/page.tsx` monta las secciones en orden dentro de `<main>`.

```
app/
  layout.tsx        Inter (--font-inter), <html lang="es">, metadata en español
  page.tsx          Header, Hero, Services, Reasons, Gallery, Contact, SiteFooter, FloatingWhatsApp
  globals.css       Tokens Nocturne + clases base (.btn, .nav, .lighten, foco, fondo de body)
components/         Un componente por sección, cada uno con su .module.css
lib/
  site.ts           Datos de contacto (WhatsApp, Facebook, dirección, Maps, año)
  content.ts        Servicios, razones y galería (solo referencian claves de foto)
  photos.ts         Fotos con src, alt, dimensiones y crédito (autor, URL, licencia)
public/photos/      11 fotos JPEG optimizadas (≤ 1600 px, ≤ 300 KB)
specs/              Specs de Spec Driven Development
references/         Handoff de Claude Design (local, ignorado por git)
```

Ids de sección para los anclas: `inicio` (Hero), `servicios`, `galeria`, `contacto`.

### Convenciones (criterios del spec 01)

- Todo son **Server Components**: no usar `"use client"`. Los iconos se importan de `@phosphor-icons/react/ssr` (la raíz del paquete usa contexto de React) y el tipo `Icon` de `@phosphor-icons/react/lib`.
- **Colores**: los hex literales solo viven en `app/globals.css`. Los `.module.css` usan `var(--color-*)`. Un único acento (`--color-accent`).
- Nada en `app/`, `components/` ni `lib/` importa ni menciona `references/`, `support.js`, `image-slot.js` ni `x-dc`.
- **Header sticky y anclas:** el nav hace `flex-wrap` y crece a 2 y 3 filas en pantallas angostas. `--header-h` (en `globals.css`: 48 / 83 / 127 px según ancho) alimenta el `scroll-margin-top` de las secciones con ancla. Si cambia el contenido del header, volver a medir esas alturas.
- **Fotos:** se sirven con `next/image` desde `public/photos/`. Cada foto nueva necesita `alt` en español y su crédito en `lib/photos.ts`. Las actuales (Pexels) son **provisionales** hasta tener el portafolio real del cliente.
- `.lighten` (`mix-blend-mode: lighten`) funde los negros de la foto con el fondo: preferir fotos de tonos medios u oscuros.
- La galería usa `auto-fill` con columna mínima de 270 px (a 1280 px da 3 columnas).

## Diseño

**El diseño de `references/` manda sobre el brief del `README.md` en lo visual.** El brief pedía base crema y acento dorado; el diseño implementado es oscuro (`--color-bg`, un solo acento violeta `--color-accent`) con tipografía Inter en títulos y cuerpo. El README aporta contenido, copy y estructura.

- **Mobile-first**: la mayoría del tráfico llega desde WhatsApp/Facebook en celular.
- Minimalista y elegante: la fotografía es la protagonista, mucho espacio en blanco, poco texto.
- **Secciones, en orden**: Header/Nav → Hero → Servicios → "¿Por qué Zoom Digital?" → Galería → Contacto/Cierre → Footer, más el botón flotante de WhatsApp. El copy exacto vive en `lib/content.ts` y en los componentes, tomado de `references/Landing Zoom.dc.html`.
- Datos de contacto: WhatsApp 55-5192-8856; Facebook "Estudio Fotográfico Zoom Digital"; Bosque de Ombues 35, Jardines de Morelos, Ecatepec.

## Flujo de trabajo

El proyecto usa **Spec Driven Development** con los comandos `/spec` y `/spec-impl`, siguiendo las prácticas de https://github.com/Klerith/fernando-skills (instaladas con `npx skills@latest add Klerith/fernando-skills`). Verificar que estén instaladas antes de asumir que existen. Cada spec se implementa en su rama `spec-NN-slug` y se pausa tras cada paso del plan; no se hace commit sin que el usuario lo pida.

Fuera de alcance del spec 01 (candidatos a specs futuros): menú hamburguesa móvil, testimonios y precios, mapa embebido, analítica, pruebas automatizadas, despliegue, SEO avanzado (Open Graph, `LocalBusiness`), logo y favicon definitivos, portafolio real del cliente y URL oficial de Facebook (hoy es un enlace de búsqueda).
