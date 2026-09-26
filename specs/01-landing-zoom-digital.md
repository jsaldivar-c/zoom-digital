# SPEC 01 — Landing de Zoom Digital

> **Estado:** Implementado
> **Depende de:** ninguno (primer spec del proyecto)
> **Fecha:** 2026-09-26
> **Objetivo:** Implementar en Next.js (App Router) + TypeScript + CSS Modules la landing de una sola página de Estudio Fotográfico Zoom Digital definida en `references/Landing Zoom.dc.html`, con fotografías gratuitas self-hosted y un único objetivo de conversión: abrir WhatsApp.

## Por qué existe este spec

Es el primer spec: el repo solo tiene `README.md` (brief), `CLAUDE.md` y el handoff de Claude Design en `references/`. El diseño ya está resuelto (tokens, secciones, copy, grillas responsive); falta convertirlo en código de producción con la misma base técnica que `umbra-studio` (Next 16 + React 19 + CSS Modules).

Hallazgos que condicionan el trabajo:

- **El diseño manda sobre el brief en lo visual.** El README pide crema/dorado; el diseño es oscuro (`--color-bg` #161826) con un solo acento violeta (`--color-accent` #9184d9). Se implementa el diseño; el README aporta contenido y estructura.
- **El `.dc.html` no es código de producción.** Usa un runtime propio (`support.js`, `<x-dc>`, `<sc-if>`, `<sc-for>`, `<image-slot>`) y cargas por CDN (Phosphor web, unpkg). Se traduce a React; no se porta el runtime.
- **No hay interacción de cliente.** Solo enlaces ancla, `scroll-behavior: smooth` y hover/focus por CSS. Todo son Server Components.
- **Las fotos de `references/assets/` no sirven para producción:** ~600 px de ancho, recortadas de capturas, con personas reales del cliente. Se sustituyen por fotos de licencia libre.
- **`.lighten` (`mix-blend-mode: lighten`) hace desaparecer los valores oscuros de la foto contra el fondo.** El design system recomienda fotos con fondo oscuro; con fotos claras de boda el efecto puede lavar la imagen (ver Riesgos).

## Alcance

**Dentro:**

- Scaffold Next.js (App Router, TypeScript, ESLint, npm, sin Tailwind, alias `@/*`) en la raíz, sin sobrescribir `README.md`, `CLAUDE.md` ni `references/`. Versiones alineadas con `umbra-studio` (`next` 16.3.6, `react`/`react-dom` 19.2.8).
- Tokens Nocturne portados de `references/_ds/nocturne-…/styles.css` a `app/globals.css` (variables `--color-*`, `--space-*`, `--radius-*`, `--shadow-*`, reglas base de tipografía, `.btn` / `.btn-primary` / `.btn-ghost` / `.btn-icon`, `.lighten`, `:focus-visible`, `::selection`, `.nav`, `.nav-brand`) y el fondo de `body` con los dos gradientes radiales del diseño.
- Inter con `next/font/google` (pesos 400 y 500) enlazada a `--font-heading` / `--font-body`; `<html lang="es">`; `metadata` con título y descripción en español.
- Las secciones del diseño, en este orden y con el copy exacto del `.dc.html`: Header sticky, Hero (título, subtítulo, 3 CTAs, collage de 3 fotos), Servicios (6), "¿Por qué Zoom Digital?" (4 razones, banda `--color-section`), Galería (8 fotos con `grid-row: span`), Contacto/Cierre, Footer y botón flotante de WhatsApp.
- Datos reales: WhatsApp `https://wa.me/525551928856?text=Hola%2C%20quiero%20informes%20para%20agendar%20una%20sesi%C3%B3n.`, teléfono 55-5192-8856, Facebook "Estudio Fotográfico Zoom Digital", dirección Bosque de Ombues 35, Jardines de Morelos, Ecatepec (enlace a Google Maps), © 2026.
- Iconos con `@phosphor-icons/react` (`Camera`, `VideoCamera`, `CalendarHeart`, `BookOpen`, `Usb`, `SlidersHorizontal`, `WhatsappLogo`, `Phone`, `FacebookLogo`, `MapPin`); los de servicios con peso `light`.
- 11 fotografías gratuitas (3 hero + 8 galería) descargadas a `public/photos/`, optimizadas, servidas con `next/image`, con autor, URL de origen y licencia registrados en `lib/photos.ts`.
- Responsive con las grillas `auto-fit` / `auto-fill` del diseño (mobile-first) y `scroll-margin-top` en las secciones para que el header sticky no tape el título al saltar por ancla.
- Accesibilidad base: foco visible con `outline` del acento (nunca el anillo azul por defecto), `alt` descriptivo en cada foto, `aria-label` en botones de solo icono, íconos decorativos con `aria-hidden`, y `prefers-reduced-motion: reduce` desactiva `scroll-behavior: smooth`.
- Actualizar `CLAUDE.md` con los comandos y la arquitectura reales una vez que exista el código.

**Fuera de este spec (para specs futuros):**

- Menú hamburguesa móvil: el diseño deja que el nav haga `flex-wrap`; se conserva así.
- Testimonios, precios o sección de paquetes con tarifas: el diseño no los incluye; "Ver paquetes" ancla a `#servicios`.
- Mapa embebido: el diseño usa un enlace a Google Maps.
- Formularios, backend, analítica (Meta Pixel, GA), pruebas automatizadas y auditorías automatizadas de accesibilidad.
- Despliegue (Vercel, dominio, DNS) y SEO avanzado (imagen Open Graph, datos estructurados `LocalBusiness`, sitemap).
- Logo, favicon e isotipo definitivos del cliente: el brief solo menciona el logo del flyer y no hay archivo entregado; se usa el wordmark de texto del diseño.
- Sustituir las fotos gratuitas por el portafolio real del cliente (quedan marcadas como provisionales).
- Variante `heroLayout: "single"` del diseño y el componente `<image-slot>` (subir/arrastrar fotos en runtime).
- URL oficial de la página de Facebook (se usa el enlace de búsqueda del diseño hasta tenerla).

## Modelo de datos

Sin persistencia ni backend. Contenido tipado en memoria:

```ts
// lib/site.ts
export const site = {
  name: "Zoom Digital",
  kicker: "Estudio Fotográfico",
  phoneLabel: "55-5192-8856",
  whatsapp:
    "https://wa.me/525551928856?text=" +
    encodeURIComponent("Hola, quiero informes para agendar una sesión."),
  facebook:
    "https://www.facebook.com/search/top?q=Estudio%20Fotogr%C3%A1fico%20Zoom%20Digital",
  address: "Bosque de Ombues 35, Jardines de Morelos, Ecatepec",
  maps: "https://www.google.com/maps/search/?api=1&query=Bosque%20de%20Ombues%2035%2C%20Jardines%20de%20Morelos%2C%20Ecatepec",
  year: 2026,
} as const;

// lib/content.ts
export type Service = { icon: string; title: string; copy: string }; // 6 elementos, copy exacto del .dc.html
export const reasons: string[]; // 4 elementos
export type GalleryItem = { id: string; photo: PhotoKey; label: string; rows: 1 | 2 };

// lib/photos.ts
export type Photo = {
  src: string;        // "/photos/<nombre>.jpg"
  alt: string;        // descriptivo, en español
  width: number;
  height: number;
  credit: { author: string; sourceUrl: string; license: "Unsplash" | "Pexels" | "CC0" };
};
export const photos: Record<PhotoKey, Photo>; // 11 entradas: heroA, heroB, heroC, g1…g8
```

Convenciones:

- Los nombres de icono se mapean a componentes de `@phosphor-icons/react` en el componente, no en los datos.
- `PhotoKey` es la unión de las 11 claves; `content.ts` solo referencia claves, nunca rutas.
- Ningún estado de cliente.

## Plan de implementación

1. **Scaffold.** Leer `node_modules/next/dist/docs/` tras instalar. Generar el proyecto con `create-next-app` en un directorio temporal (TypeScript, App Router, ESLint, sin Tailwind, alias `@/*`, npm), copiar a la raíz sin tocar `README.md`, `CLAUDE.md` ni `references/`, fijar versiones de `next`/`react` iguales a `umbra-studio`, añadir `@phosphor-icons/react`, fusionar `.gitignore`, borrar los SVG y la página de ejemplo de Next. Queda funcional: `npm run dev` sirve una página vacía en español.
2. **Tokens y base global.** Portar los tokens y clases listados en Alcance a `app/globals.css`; configurar Inter con `next/font` y `<html lang="es">` en `app/layout.tsx`; añadir el fondo de `body`, `scroll-behavior: smooth` y su regla `prefers-reduced-motion`. Queda funcional: la página vacía ya se ve con el fondo y la tipografía Nocturne.
3. **Datos.** Crear `lib/site.ts` y `lib/content.ts` (servicios, razones, galería) con el copy exacto del `.dc.html`, y `lib/photos.ts` con placeholders temporales de tipo. Queda funcional: compila y lint pasa.
4. **Header y Hero.** `components/Header.tsx` (marca "Estudio Fotográfico / ZOOM DIGITAL", enlaces Servicios · Galería · Contacto, botón "Agendar por WhatsApp") y `components/Hero.tsx` (h1, subtítulo, 3 CTAs, collage de 3 fotos con `.lighten`), cada uno con su `.module.css`. Queda funcional: la portada completa con nav sticky.
5. **Fotografías gratuitas.** Elegir 11 fotos (Unsplash / Pexels / CC0; bodas, XV años, detalles, sesiones; preferir tonos medios u oscuros por `.lighten`; sin rostros identificables de menores), descargarlas, redimensionarlas a ≤ 1600 px de lado largo y exportarlas a `public/photos/` (≤ 300 KB cada una), y llenar `lib/photos.ts` con `src`, `alt`, dimensiones y crédito. Queda funcional: el hero muestra las fotos reales.
6. **Servicios y "Por qué Zoom Digital".** `components/Services.tsx` (6 filas con línea que se desvanece en los extremos, icono + título + copy) y `components/Reasons.tsx` (banda `--color-section` con 4 razones y marca de acento de 44 px). Queda funcional: portada + dos secciones.
7. **Galería.** `components/Gallery.tsx` con la grilla `auto-fill` (columna mínima 260 px, filas de 240 px, `grid-auto-flow: dense`, 4 fotos `rows: 2` y 4 `rows: 1`) dentro de `.lighten`. Queda funcional: galería completa.
8. **Contacto, Footer y WhatsApp flotante.** `components/Contact.tsx` (h2, párrafo, botón grande de WhatsApp, filas de teléfono / Facebook / dirección con "Ver en Google Maps"), `components/SiteFooter.tsx` (marca, © 2026, iconos de Facebook y WhatsApp) y `components/FloatingWhatsApp.tsx` (botón fijo de 56 px). Ensamblar todo en `app/page.tsx` con los `id` `inicio`, `servicios`, `galeria`, `contacto` y `scroll-margin-top`. Queda funcional: landing completa.
9. **Documentación del repo.** Actualizar `CLAUDE.md` (comandos `dev` / `build` / `start` / `lint`, arquitectura real, nota de que el diseño está en `references/` y la advertencia de leer los docs de Next antes de escribir código) y añadir el crédito de fotos al `README.md` si aplica. Queda funcional y completo según el alcance.

## Criterios de aceptación

- [ ] `npm run dev` levanta sin errores de build ni de consola.
- [ ] `npm run lint` y `npm run build` pasan sin errores.
- [ ] La página contiene, en este orden: Header, Hero, Servicios, "¿Por qué Zoom Digital?", Galería, Contacto, Footer, con los `id` `inicio`, `servicios`, `galeria` y `contacto` en sus secciones.
- [ ] El texto de títulos, subtítulos, botones, 6 servicios y 4 razones coincide carácter por carácter con `references/Landing Zoom.dc.html`.
- [ ] El header es `position: sticky` y sigue visible al hacer scroll; al pulsar Servicios, Galería o Contacto el título de la sección queda visible, no oculto bajo el header.
- [ ] Todos los CTAs de WhatsApp (header, hero, botón grande de contacto, fila de teléfono, icono del footer y botón flotante) apuntan a `https://wa.me/525551928856?text=…` con `target="_blank"` y `rel="noopener"`.
- [ ] El botón flotante de WhatsApp es fijo abajo a la derecha (16 px), mide 56 × 56 px y tiene `aria-label="Escríbenos por WhatsApp"`.
- [ ] Los enlaces de Facebook y Google Maps coinciden con los de `lib/site.ts` y se abren en pestaña nueva.
- [ ] La galería muestra 8 fotos y el hero 3; todas usan `next/image`, tienen `alt` no vacío y se sirven desde `/photos/`.
- [ ] Cada foto de `lib/photos.ts` tiene autor, URL de origen y licencia (Unsplash, Pexels o CC0), y ningún archivo de `public/photos/` supera 300 KB.
- [ ] Ningún archivo en `app/`, `components/` ni `lib/` importa ni referencia `references/`, `support.js`, `image-slot.js` ni `x-dc`.
- [ ] Ningún `.css` fuera de `app/globals.css` contiene un color hexadecimal literal; todo usa `var(--color-*)`.
- [ ] Ningún componente contiene `"use client"`.
- [ ] Sin desbordamiento horizontal (`document.documentElement.scrollWidth <= window.innerWidth`) a 390, 834, 1280 y 1920 px.
- [ ] A 1280 px: hero en 2 columnas, servicios en 3, razones en 4, galería en 3 y contacto en 2. A 834 px: hero 1, servicios 2, razones 3, galería 2, contacto 1. A 390 px: todas en 1 columna.
- [ ] El foco de teclado muestra el anillo de 2 px del acento en enlaces y botones; no aparece el anillo azul del navegador.
- [ ] Con `prefers-reduced-motion: reduce`, `html` no tiene `scroll-behavior: smooth`.
- [ ] La página usa un solo color de acento (`--color-accent`); no se introduce ningún otro tono saturado fuera de los tokens.

## Decisiones tomadas y descartadas

- **Sí:** el diseño de Claude Design manda sobre la paleta del README. Decisión explícita del usuario; el README aporta contenido y estructura.
- **Sí:** Next.js + React + TypeScript + CSS Modules como `umbra-studio`. Descartado Tailwind: el design system ya son variables CSS cerradas que se portan tal cual.
- **Sí:** Server Components sin JavaScript de cliente. El diseño no tiene estado; añadir `"use client"` sería peso sin beneficio.
- **Sí:** traducir `sc-if` / `sc-for` / `<image-slot>` a React + `next/image`. Descartado portar `support.js` (69 KB) y `image-slot.js` (65 KB): son runtime de la herramienta de diseño.
- **Sí:** fotos gratuitas descargadas a `public/photos/` con crédito en `lib/photos.ts`. Descartado hotlink a Unsplash: dependencia externa en build y en producción. Descartado usar `references/assets/`: baja resolución y personas reales del cliente.
- **Sí:** Phosphor vía `@phosphor-icons/react`. Descartado `@phosphor-icons/web` por CDN del diseño: petición externa y sin tree-shaking.
- **Sí:** un solo spec. Es una landing estática sin backend; dividirla en scaffold y secciones no reduciría el riesgo.
- **Sí:** conservar `.lighten` como en el diseño y validarlo visualmente con las fotos elegidas (plan B en Riesgos).
- **Sí:** `prefers-reduced-motion` desactiva el scroll suave. Es una adición al diseño; costo mínimo y evita scroll animado a quien lo rechaza.
- **Sí:** scaffold en directorio temporal y copia a la raíz. Descartado `create-next-app` directo sobre la raíz: choca con `README.md`, `CLAUDE.md` y `references/`.
- **No:** menú hamburguesa, mapa embebido, testimonios ni precios; no están en el diseño.
- **No:** la variante `single` del hero ni el conmutador `floatingWhatsApp`; el botón flotante queda siempre visible.

## Riesgos identificados

| Riesgo | Mitigación |
| --- | --- |
| `.lighten` lava o hace desaparecer partes de fotos claras de boda contra el fondo oscuro | Elegir fotos de tonos medios/oscuros; revisar cada foto en su slot; plan B: quitar `.lighten` de la galería y mantenerlo solo en el hero, documentando la desviación |
| La licencia de una foto resulta no ser libre para uso comercial | Registrar URL y licencia por foto en `lib/photos.ts` y abrir la página de licencia de cada una al descargarla; descartar cualquier foto con duda |
| Hay pocas fotos gratuitas de XV años en México | Aceptar fotos de eventos/quinceañeras de cualquier país o de vestidos y detalles; quedan como provisionales hasta tener el portafolio real |
| Este Next 16 difiere de lo conocido (APIs, convenciones) | Paso 1 lee `node_modules/next/dist/docs/` antes de escribir código |
| Con nav con `flex-wrap`, a 390 px el header puede ocupar 2–3 filas y tapar contenido | Comprobar la altura real del header a 390 px y ajustar `scroll-margin-top` a ese valor |
| El enlace de Facebook es una búsqueda, no la página oficial | Marcado como pendiente en Fuera de alcance; reemplazar cuando el cliente entregue la URL |
| Nombres de icono Phosphor del diseño (`usb`, `calendar-heart`) sin equivalente exacto en el paquete React | Verificar los 10 iconos al importarlos en el paso 6/8 y sustituir por el más cercano si falta alguno |

## Lo que **no** está en este spec

- Menú móvil tipo hamburguesa, testimonios, precios y mapa embebido.
- Formularios, backend, analítica y pruebas automatizadas.
- Despliegue, dominio y SEO avanzado (Open Graph, datos estructurados).
- Logo, favicon e isotipo definitivos; portafolio real del cliente; URL oficial de Facebook.
- Variante `single` del hero y edición de imágenes en runtime.

Cada uno de esos puntos, si se hace, va en su propio spec.
