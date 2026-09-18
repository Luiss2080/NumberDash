<div align="center">
  <img src="docs/assets/logo.svg" width="96" alt="Logo de NumberDash" />
  <h1>NumberDash</h1>
  <p><b>Juego de escritorio en pygame para practicar cálculo mental: escribe la respuesta antes de que la operación cruce la pantalla.</b></p>
  <img src="https://img.shields.io/badge/estado-funcional%20(prototipo)-orange?style=for-the-badge" alt="Estado: funcional, prototipo" />
  <img src="https://img.shields.io/badge/python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python 3" />
  <img src="https://img.shields.io/badge/pygame-requerido-2C8C3C?style=for-the-badge" alt="pygame" />
  <img src="https://img.shields.io/badge/tests-123%20pasan-brightgreen?style=for-the-badge" alt="123 tests" />
  <p>
    <a href="#-inicio-rápido">Inicio rápido</a> ·
    <a href="#-características">Características</a> ·
    <a href="#-arquitectura">Arquitectura</a> ·
    <a href="#-pruebas">Pruebas</a> ·
    <a href="#-lo-que-todavía-no-existe">Limitaciones</a>
  </p>
</div>

NumberDash (título de ventana: *LISA MATH CHALLENGE*) es un juego de un solo archivo (`NumberDash.py`, ~720 líneas) hecho con pygame. Las operaciones aparecen a la izquierda y se desplazan hacia la derecha; el jugador teclea el resultado y, al coincidir, la operación desaparece (no hay tecla Enter). Es un proyecto educativo/de práctica: **no** tiene puntuaciones guardadas, multijugador ni instalador,.

## 🎬 Vista rápida

<p align="center">
  <img src="docs/screenshots/menu.png" width="32%" alt="Menú principal con el logo LISA Math Challenge y los botones Instrucciones, Cálculos y Salir" />
  <img src="docs/screenshots/niveles.png" width="32%" alt="Pantalla de selección de dificultad" />
  <img src="docs/screenshots/juego.png" width="32%" alt="Partida en el nivel intermedio con dos operaciones en pantalla, puntos, tiempo y vidas" />
</p>

<sub>Capturas reales generadas con SDL en modo `dummy` (sin audio). En la de partida se fijó a mano la puntuación y el texto tecleado para mostrar varias operaciones a la vez.</sub>

## ✨ Características

| Característica | Detalle |
|---|---|
| Cuatro niveles | Básico (suma/resta/multiplicación/división), Intermedio (operaciones combinadas con paréntesis), Avanzado (fracciones) y Experto (potencias). 30 ejercicios por nivel, 120 en total. |
| Vidas | 3 vidas; se pierde una cada vez que una operación sale por el borde derecho sin ser respondida. |
| Dificultad progresiva | Aparece una operación más cada 8 puntos y la velocidad crece con la puntuación (`0.1 + puntos/50` px por frame). |
| Sin repetición inmediata | Evita repetir ninguna de las últimas 10 operaciones mostradas. |
| Entrada por teclado | Se compara el valor numérico de lo escrito con la respuesta (`1/2`, `2/4` y `0.5` son equivalentes); acierta al instante, sin Enter. Retroceso borra. |
| Interfaz | Menú con logo animado, pantalla de instrucciones, fondo e imagen distintos por nivel, música por nivel y efectos de acierto/fallo/fin de juego. |
| Marcador | Puntos, tiempo transcurrido y corazones de vida en pantalla. |

## 🏗️ Arquitectura

Todo vive en `NumberDash.py`: datos (diccionario `temas`), estado global y una función por pantalla que ejecuta su propio bucle de eventos.

```mermaid
flowchart TD
    M["main()"] --> V["ventana_principal()"]
    V -->|"INSTRUCCIONES"| I["mostrar_instrucciones()"]
    V -->|"CALCULOS"| N["menu_niveles()"]
    V -->|"SALIR"| X(["pygame.quit()"])
    I -->|"VOLVER"| V
    N -->|"elegir nivel"| B["bucle_juego()"]
    N -->|"VOLVER"| V
    B -->|"0 vidas o ESC"| G["game_over()"]
    B -->|"VOLVER"| V
    G -->|"reinicia estado"| N
    T[("temas: 4 niveles<br/>ejercicios, fondo, sonidos")] --> B
    E["nueva_EJERCICIO()"] --> B
```

<details>
<summary>Estructura de carpetas</summary>

```text
NumberDash.py      # todo el juego
Font/              # tipografías .ttf (CollegeClean, Pixelletters)
Material/          # imágenes (.png/.jpg) y audio (.wav) de niveles y menú
docs/              # logo y capturas de este README
```

Los recursos se cargan con rutas relativas al propio script, así que se puede ejecutar desde cualquier directorio.
</details>

## 🚀 Inicio rápido

| Requisito | Versión |
|---|---|
| Python | 3.x (verificado con 3.14) |
| pygame | `pygame` o `pygame-ce` (verificado con pygame-ce 2.5.7) |

1. Clona el repositorio. Ojo: `Material/` pesa ~80 MB por los `.wav`.
   ```bash
   git clone https://github.com/Luiss2080/NumberDash.git
   cd NumberDash
   ```
2. Instala pygame (el repo no incluye `requirements.txt`).
   ```bash
   pip install pygame
   ```
3. Ejecuta el juego (necesita pantalla y dispositivo de audio; carga todos los `.wav` al arrancar).
   ```bash
   python NumberDash.py
   ```

Controles: clic en los botones del menú; en partida, teclado para la respuesta, `ESC` para abandonar (lleva a *Game Over*) y clic en **VOLVER** para regresar al menú.

> No pude comprobar el sonido ni jugar de forma interactiva; solo verifiqué que el juego arranca y renderiza sus pantallas en modo headless.

## 🧪 Pruebas

`tests/test_banco_ejercicios.py` recorre las 120 preguntas del banco, evalúa cada operación con aritmética exacta (`fractions.Fraction`, sin `eval`) y comprueba que la respuesta guardada es correcta y está simplificada; también prueba la comparación de respuestas. No necesita pantalla ni los `.wav`.

```bash
pip install pytest
python -m pytest -q tests   # 123 tests
```

## 🚧 Lo que todavía no existe

- Los ejercicios son fijos (listas escritas a mano); no se generan de forma aleatoria.
- Sin `requirements.txt`, sin instalador ni empaquetado, sin CI.
- Sin guardado de puntuaciones ni récords. `VOLVER` desde la partida no reinicia puntos/vidas.
- Detalles del código: el clic de `VOLVER` sale del bucle con cualquier clic del ratón durante la partida; las pantallas se llaman unas a otras de forma recursiva; no hay menú de pausa (las instrucciones ya lo indican: `ESC` abandona la partida).
- El repositorio arrastra ~80 MB de audio `.wav` sin comprimir, lo que hace lento el clonado.

## 📄 Licencia

Sin licencia definida: todos los derechos reservados por defecto.

<div align="center">
  <sub>Hecho por Luiss2080 · juego educativo de cálculo mental con pygame</sub>
</div>
