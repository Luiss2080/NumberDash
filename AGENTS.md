# AGENTS.md — NumberDash Modernization

## Proyecto
NumberDash es una aplicación web interactiva (Single Page Application) construida con Vite, React y Vanilla CSS.
El objetivo del proyecto es ofrecer un juego de agilidad mental matemático con un diseño premium, moderno y un alto valor comercial.

## Comandos
- Inicializar proyecto: `npx create-vite@latest ./ --template react` (si es necesario)
- Instalar dependencias: `npm install`
- Ejecutar entorno de desarrollo: `npm run dev`
- Compilar para producción: `npm run build`

## Estilo y convenciones
- Lenguaje: JavaScript (ES6+) y HTML5.
- Estilos: **Vanilla CSS** estricto, priorizando diseño premium (Dark modes, glassmorphism, tipografías modernas como 'Inter' o 'Outfit', micro-animaciones).
- Nomenclatura: PascalCase para componentes React, camelCase para variables y funciones. BEM o utilitario semántico para clases CSS.
- Idioma de código y comentarios: Español/Inglés mixto (documentación principal en Español para alinearse con la spec, código interno en Inglés estándar).

## Reglas (Spec-Driven Development)
- Siempre revisa `implementation_plan.md` y la spec activa antes de implementar código.
- El código **DEBE** reflejar fielmente lo definido en los Requisitos Funcionales (EARS) de la spec.
- No uses TailwindCSS.
- Mantén la estética premium: prohíbido usar colores primarios planos, se deben usar paletas ricas y armoniosas.
