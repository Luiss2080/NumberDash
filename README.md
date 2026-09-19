# NumberDash V3 🚀

NumberDash es un juego interactivo de agilidad mental matemática, originalmente desarrollado en Python/Pygame y rediseñado desde cero como una **Aplicación Web Moderna (SPA)** utilizando Vite, React y Vanilla CSS.

![NumberDash Logo](public/images/LISA.png)

## 🌟 Características Principales

- **Físicas y Animaciones Fluidas:** Interfaz de usuario elástica e hiper-interactiva construida con `framer-motion`.
- **Gamificación Avanzada:** Sistema de Logros desbloqueables (Achievements) y rastreo de estadísticas globales.
- **PWA (Progressive Web App):** Instalable en teléfonos móviles y escritorios para una experiencia nativa offline.
- **Glassmorphism UI:** Diseño visual Premium con desenfoques de fondo, variables HSL estructuradas y efectos Glow 3D.
- **Combos y BGM:** Efectos de sonido reactivos, música de fondo dinámica por nivel y "Fever Mode" al encadenar combos.
- **Rendimiento Máximo:** Motor de juego (`GameEngine.jsx`) desligado de los renderizados de estado de React, corriendo a 60 FPS fijos a través de `requestAnimationFrame`.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18
- **Build Tool:** Vite
- **Estilos:** Vanilla CSS (Dark Mode, Glassmorphism)
- **Animaciones:** Framer Motion
- **Iconografía:** Lucide React
- **Notificaciones:** React Hot Toast

## 🚀 Instalación y Despliegue Local

1. Clona este repositorio o descarga los archivos.
2. Abre la terminal en el directorio del proyecto y asegúrate de tener Node.js instalado.
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Levanta el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
5. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 📚 Documentación Técnica

Si eres un desarrollador y quieres modificar la lógica matemática, añadir nuevos niveles, o aprender cómo están estructurados los componentes, consulta el manual interactivo dentro del juego o dirígete a:
👉 [Manual de Arquitectura (docs/MANUAL.md)](docs/MANUAL.md)

## ☁️ Despliegue a Producción

El proyecto incluye los archivos `vercel.json` y `netlify.toml` preconfigurados para asegurar que el enrutamiento SPA funcione perfectamente en producción. Simplemente ejecuta:
```bash
npm run build
```
O conecta tu repositorio directamente a plataformas como Vercel o Netlify para despliegue continuo.

---
*NumberDash V3 - Reconstruido usando un flujo de desarrollo Spec-Driven Development (SDD).*
