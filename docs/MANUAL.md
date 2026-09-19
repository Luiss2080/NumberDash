# Manual de Uso y Despliegue Técnico - NumberDash V2

## Introducción
NumberDash V2 es una **Single Page Application (SPA)** interactiva orientada al entrenamiento de agilidad mental matemática, diseñada originalmente en Python/Pygame y ahora migrada completamente a React y Vite para su distribución masiva.

## Requisitos Previos
- Node.js (v18+)
- NPM o Yarn

## Guía de Instalación Local
1. **Instalar Dependencias:** En la raíz del repositorio ejecuta `npm install`.
2. **Entorno de Desarrollo:** Ejecuta `npm run dev` para levantar el servidor local con *Hot Module Replacement* en el puerto 5173.
3. **Producción:** Ejecuta `npm run build`. Los artefactos optimizados se generarán en la carpeta `/dist`.

## Arquitectura del Proyecto
El código base principal reside en `src/`:
- **`App.jsx`**: Es el orquestador principal. Gestiona las vistas (Menú, Selección de Niveles, Juego, Modales de Opciones y Pantalla de Puntuaciones). Gestiona el estado de configuraciones globales (`localStorage`).
- **`components/GameEngine.jsx`**: El núcleo lógico. Utiliza un bucle de `requestAnimationFrame` para desplazar los números matemáticos de izquierda a derecha. Gestiona la lógica de vidas, combos (fever mode), partículas y efectos de sonido reactivos.
- **`components/Modal.jsx`**: Un wrapper con *glassmorphism* que permite renderizar diálogos flotantes como la Pausa y las Configuraciones del juego.
- **`components/Particles.jsx`**: Sistema de física simple en React para renderizar chispas de partículas CSS que reaccionan cuando el usuario acierta un resultado.
- **`index.css`**: Define las tokens de diseño HSL, los gradientes *Dark Mode*, y las clases de micro-animaciones (ej. `.animate-slide-in`).

## Configuración y Añadido de Niveles
Para modificar o añadir nuevos ejercicios y niveles de dificultad, dirígete a la función `generateExercise(difficulty)` en `GameEngine.jsx`.
La lógica interna evalúa la variable `difficulty` y asigna randómicamente valores para operandos y operaciones aritméticas (`+`, `-`, `*`).

## PWA (Aplicación Web Progresiva)
NumberDash es instalable en dispositivos móviles a través de `vite-plugin-pwa`. Toda la configuración (manifesto de la web app y service workers) está definida en `vite.config.js`.

---
*Desarrollado con arquitectura Spec-Driven Development (SDD).*
