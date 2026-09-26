# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Estado del repositorio

Al momento de escribir esto, el repo solo contiene `README.md` (el brief de diseño). No hay código fuente, `package.json`, build, lint ni tests todavía, así que no hay comandos de desarrollo que documentar. Cuando se elija el stack y se agregue código, actualizar este archivo con los comandos de build/lint/test (incluyendo cómo correr un solo test) y la arquitectura real.

## Proyecto

Landing page de una sola página (demo) para **Estudio Fotográfico Zoom Digital** (fotografía y videografía de bodas, XV años y eventos, zona Ecatepec / Estado de México). El contenido del negocio y el copy están en español; el sitio y su copy deben ir en español.

Objetivo único: captar contactos por **WhatsApp** (55-5192-8856). CTA principal "Agenda tu sesión" → WhatsApp; CTA secundario Ver paquetes / Ver galería. Sin backend ni formularios: el contacto es directo a WhatsApp.

## Requisitos de diseño (del brief en README.md)

- **Mobile-first**: la mayoría del tráfico llega desde WhatsApp/Facebook en celular.
- **Estilo**: minimalista, elegante, la fotografía es la protagonista (grillas grandes, mucho espacio en blanco, poco texto). Base blanco/crema, acento dorado o beige oscuro, texto en negro/gris oscuro. Serif editorial para títulos + sans-serif simple para cuerpo y botones.
- **Evitar**: fondos florales/ilustraciones recargadas, muchos colores, bordes dorados gruesos (eso es del flyer impreso).
- **Secciones, en orden**: Header/Nav (Servicios · Galería · Contacto + botón WhatsApp fijo o destacado) → Hero ("Capturamos los momentos que no se repiten") → Servicios ("Todo lo que necesitas para tu gran día") → Diferenciadores ("¿Por qué Zoom Digital?") → Galería → Testimonios (opcional) → Contacto/Cierre ("Hagamos juntos el recuerdo de tu vida", con dirección, Facebook y mini mapa opcional) → Footer.
- Datos de contacto: WhatsApp 55-5192-8856; Facebook "Estudio Fotográfico Zoom Digital"; Bosque de Ombues 35, Jardines de Morelos, Ecatepec.

## Flujo de trabajo

El proyecto usa **Spec Driven Development** con los comandos `/spec` y `/spec-impl`, siguiendo las prácticas de https://github.com/Klerith/fernando-skills (instaladas con `npx skills@latest add Klerith/fernando-skills`). Esas skills aún no están presentes en el repo; verificar que estén instaladas antes de asumir que `/spec` y `/spec-impl` existen.

`references/` (cuando exista) contendrá diseños de ejemplo para usar como base visual.
