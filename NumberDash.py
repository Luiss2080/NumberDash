import pygame
import random
import sys
import os

# Inicializar pygame
pygame.init()
pygame.mixer.init()

# Configurar pantalla
ANCHO, ALTO = 980, 780
BLANCO = (255, 255, 255)
ROJO = (255, 0, 0)
NEGRO = (0, 0, 0)
AZUL = (27, 19, 66)
TAMAÑO_FUENTE = 35

# Usar os.path.join para crear rutas de manera segura
directorio_actual = os.path.dirname(os.path.abspath(__file__))
directorio_fuente = os.path.join(directorio_actual, "Font")
TIPO = os.path.join(directorio_fuente, "CollegeClean-Regular.ttf")

# Inicializar pygame
pygame.init()

# Cargar la fuente
FUENTE = pygame.font.Font(TIPO, TAMAÑO_FUENTE)

PANTALLA = pygame.display.set_mode((ANCHO, ALTO))
pygame.display.set_caption("- LISA MATH CHALLENGE -")

posiciones_corazones = [(ANCHO - 60 - i * 60, 0) for i in range(3)]  # 3 corazones espaciados por 60 píxeles

directorio_material = os.path.join(directorio_actual, "Material")

sonidos = {
    "Stage1.wav": pygame.mixer.Sound(os.path.join(directorio_material, "Stage1.wav")),
    "Correcta.wav": pygame.mixer.Sound(os.path.join(directorio_material, "Correcta.wav")),
    "ganador.wav": pygame.mixer.Sound(os.path.join(directorio_material, "ganador.wav")),
    "equivocado.wav": pygame.mixer.Sound(os.path.join(directorio_material, "equivocado.wav")),
    "Stage2.wav": pygame.mixer.Sound(os.path.join(directorio_material, "Stage2.wav")),
    "Title.wav": pygame.mixer.Sound(os.path.join(directorio_material, "Title.wav")),
    "GameOver.wav": pygame.mixer.Sound(os.path.join(directorio_material, "GameOver.wav")),
    "Sonido_Fondo.wav": pygame.mixer.Sound(os.path.join(directorio_material, "Sonido_Fondo.wav")),
    "Stage4.wav": pygame.mixer.Sound(os.path.join(directorio_material, "Stage4.wav")),
    "Stage3.wav": pygame.mixer.Sound(os.path.join(directorio_material, "Stage3.wav"))
}

imagenes = {
    "Will.jpg": os.path.join(directorio_material, "Will.jpg"),
    "Comparativos.jpg": os.path.join(directorio_material, "Comparativos.jpg"),
    "PresentPerfect.png": os.path.join(directorio_material, "PresentPerfect.png"),
    "PastSimple.png": os.path.join(directorio_material, "PastSimple.jpg"),
    "corazon.png": os.path.join(directorio_material, "corazon.png"),
    "logo.png": os.path.join(directorio_material, "LISA.png"),
    "UPDS.png": os.path.join(directorio_material, "UPDS.png"),
    "Signo.png": os.path.join(directorio_material, "Signo.png"),
    "Boton.png": os.path.join(directorio_material, "Boton.png"),

}

# Estructura de temas
temas = {
    "- NIVEL BASICO -": {
        "fondo": sonidos["Stage1.wav"],
        "clic": sonidos["Correcta.wav"],
        "exito": sonidos["ganador.wav"],
        "fracaso": sonidos["equivocado.wav"],
        "imagen_fondo": imagenes["PastSimple.png"],
        "imagen_corazon": imagenes["corazon.png"],
        "EJERCICIOS": [
           ("¿Cuánto es 2 + 2?", "4"),
            ("¿Cuánto es 5 - 3?", "2"),
            ("¿Cuánto es 3 * 4?", "12"),
            ("¿Cuánto es 8 / 2?", "4"),
            ("¿Cuánto es 7 + 5?", "12"),
            ("¿Cuánto es 9 - 4?", "5"),
            ("¿Cuánto es 6 * 2?", "12"),
            ("¿Cuánto es 10 / 2?", "5"),
             ("¿Cuánto es 3 + 6?", "9"),
            ("¿Cuánto es 7 - 4?", "3"),
            ("¿Cuánto es 5 * 2?", "10"),
            ("¿Cuánto es 9 / 3?", "3"),
            ("¿Cuánto es 6 + 8?", "14"),
            ("¿Cuánto es 10 - 3?", "7"),
            ("¿Cuánto es 4 * 3?", "12"),
            ("¿Cuánto es 16 / 4?", "4"),
            ("¿Cuánto es 2 + 9?", "11"),
            ("¿Cuánto es 7 - 2?", "5"),
            ("¿Cuánto es 3 * 5?", "15"),
            ("¿Cuánto es 18 / 6?", "3"),
            ("¿Cuánto es 6 + 7?", "13"),
            ("¿Cuánto es 9 - 6?", "3"),
            ("¿Cuánto es 4 * 4?", "16"),
            ("¿Cuánto es 4 + 6?", "10"),
            ("¿Cuánto es 8 - 5?", "3"),
            ("¿Cuánto es 5 * 3?", "15"),
            ("¿Cuánto es 12 / 3?", "4"),
            ("¿Cuánto es 7 + 8?", "15"),
            ("¿Cuánto es 10 - 7?", "3"),
            ("¿Cuánto es 2 * 9?", "18")
        ]
    },
    "- NIVEL INTERMEDIO -": {
        "fondo": sonidos["Stage2.wav"],
        "clic": sonidos["Correcta.wav"],
        "exito": sonidos["ganador.wav"],
        "fracaso": sonidos["equivocado.wav"],
        "imagen_fondo": imagenes["Comparativos.jpg"],
        "imagen_corazon": imagenes["corazon.png"],

        "EJERCICIOS": [
            ("¿Cuánto es 3 + 5 - 2?", "6"),
            ("¿Cuánto es (7 + 3) * 2?", "20"),
            ("¿Cuánto es 15 / 3 + 4?", "9"),
            ("¿Cuánto es (8 - 4) * 3?", "12"),
            ("¿Cuánto es 20 - 5 + 3?", "18"),
            ("¿Cuánto es 4 * (6 + 2)?", "32"),
            ("¿Cuánto es 18 / (3 + 3)?", "3"),
            ("¿Cuánto es 8 + 4 - 3?", "9"),
            ("¿Cuánto es (6 + 2) * 3?", "24"),
            ("¿Cuánto es 20 / 4 + 5?", "10"),
            ("¿Cuánto es (9 - 3) * 4?", "24"),
            ("¿Cuánto es 15 - 7 + 3?", "11"),
            ("¿Cuánto es 3 * (5 + 3)?", "24"),
            ("¿Cuánto es 16 / (2 + 2)?", "4"),
            ("¿Cuánto es (8 + 3) * 2 - 5?", "21"),
            ("¿Cuánto es (20 / 5) + 6?", "10"),
            ("¿Cuánto es 18 - 4 + 3 * 2?", "20"),
            ("¿Cuánto es 7 * 4 - 8?", "20"),
            ("¿Cuánto es 24 / 2 + 6?", "18"),
            ("¿Cuánto es 5 + 7 * 2 - 4?", "15"),
            ("¿Cuánto es (6 + 5) * 2?", "22"),
            ("¿Cuánto es 30 - 9 * 2?", "12"),
            ("¿Cuánto es (5 + 4) * 2 - 3?", "15"),
            ("¿Cuánto es (12 / 4) + 7?", "10"),
            ("¿Cuánto es 14 - 6 + 2 * 3?", "14"),
            ("¿Cuánto es 8 * 3 - 7?", "17"),
            ("¿Cuánto es 16 / 2 + 5?", "13"),
            ("¿Cuánto es 9 + 6 * 2 - 3?", "18"),
            ("¿Cuánto es (7 + 5) * 3?", "36"),
            ("¿Cuánto es 25 - 7 * 2?", "11")
                   ]
    },
    "- NIVEL AVANZADO -": {
        "fondo": sonidos["Stage3.wav"],
        "clic": sonidos["Correcta.wav"],
        "exito": sonidos["ganador.wav"],
        "fracaso": sonidos["equivocado.wav"],
        "imagen_fondo": imagenes["PresentPerfect.png"],
        "imagen_corazon": imagenes["corazon.png"],

        "EJERCICIOS": [
           ("¿Cuánto es (3/4) + (1/6)?", "11/12"),
            ("¿Cuánto es (5/8) - (2/3)?", "1/24"),
            ("¿Cuánto es (2/5) * (7/9)?", "14/45"),
            ("¿Cuánto es (5/12) + (1/8)?", "17/24"),
            ("¿Cuánto es (7/10) - (2/5)?", "3/10"),
            ("¿Cuánto es (2/3) * (5/7)?", "10/21"),
            ("¿Cuánto es (1/2) + (3/4)?", "5/4"),
            ("¿Cuánto es (1/2) + (1/3)?", "5/6"),
            ("¿Cuánto es (3/5) - (1/4)?", "7/20"),
            ("¿Cuánto es (2/3) * (4/5)?", "8/15"),
            ("¿Cuánto es (7/8) + (1/2)?", "11/8"),
            ("¿Cuánto es (5/6) - (2/5)?", "7/30"),
            ("¿Cuánto es (3/7) * (5/9)?", "15/63"),
            ("¿Cuánto es (1/4) + (3/8)?", "5/8"),
            ("¿Cuánto es (5/6) - (1/3)?", "1/2"),
            ("¿Cuánto es (7/10) + (3/5)?", "13/10"),
            ("¿Cuánto es (4/9) * (5/8)?", "20/72"),
            ("¿Cuánto es (9/12) - (2/6)?", "1/6"),
            ("¿Cuánto es (2/5) * (3/4)?", "6/20"),
            ("¿Cuánto es (11/12) + (1/6)?", "13/12"),
            ("¿Cuánto es (5/7) - (3/14)?", "4/14"),
            ("¿Cuánto es (6/8) + (2/5)?", "19/20"),
            ("¿Cuánto es (3/5) - (1/2)?", "1/10"),
            ("¿Cuánto es (2/7) + (5/8)?", "51/56"),
            ("¿Cuánto es (4/9) * (2/5)?", "8/45"),
            ("¿Cuánto es (5/6) - (1/3)?", "1/2"),
            ("¿Cuánto es (3/8) * (5/7)?", "15/56"),
            ("¿Cuánto es (7/8) + (3/4)?", "13/8"),
            ("¿Cuánto es (5/6) + (2/9)?", "13/18"),
            ("¿Cuánto es (9/10) - (7/15)?", "11/30")
                   ]
    },
    "- NIVEL EXPERTO -": {
        "fondo": sonidos["Stage4.wav"],
        "clic": sonidos["Correcta.wav"],
        "exito": sonidos["ganador.wav"],
        "fracaso": sonidos["equivocado.wav"],
        "imagen_fondo": imagenes["Will.jpg"],
        "imagen_corazon": imagenes["corazon.png"],

        "EJERCICIOS": [
            ("¿Cuánto es 2^3 * 4?", "32"),
            ("¿Cuánto es (2^4) / (2^2)?", "4"),
            ("¿Cuánto es (3^2) + (4^2)?", "25"),
            ("¿Cuánto es 5^3 - 2^3?", "117"),
            ("¿Cuánto es (2^5) / (2^3)?", "4"),
            ("¿Cuánto es (4^2) * (3^2)?", "144"),
            ("¿Cuánto es 9^2 - 3^3?", "54"),
            ("¿Cuánto es 3^3 * 2?", "54"),
            ("¿Cuánto es (4^2) / (2^2)?", "4"),
            ("¿Cuánto es 5^3 - 4^2?", "101"),
            ("¿Cuánto es 2^5 + 3^3?", "41"),
            ("¿Cuánto es (7^2) - (5^2)?", "24"),
            ("¿Cuánto es (3^3) + (4^3)?", "91"),
            ("¿Cuánto es 6^2 / 2^3?", "9"),
            ("¿Cuánto es (5^4) - (3^2)?", "619"),
            ("¿Cuánto es (4^3) + (2^5)?", "96"),
            ("¿Cuánto es 9^2 - 6^2?", "45"),
            ("¿Cuánto es (10^2) - (4^2)?", "84"),
            ("¿Cuánto es (2^6) + (3^3)?", "73"),
            ("¿Cuánto es (5^5) / (5^3)?", "25"),
            ("¿Cuánto es (7^3) - (3^2)?", "334"),
            ("¿Cuánto es (8^2) * (2^3)?", "512"),
            ("¿Cuánto es (5^2) + (2^3)?", "33"),
            ("¿Cuánto es (6^2) - (4^2)?", "20"),
            ("¿Cuánto es (7^2) * (2^3)?", "392"),
            ("¿Cuánto es (8^2) / (2^2)?", "16"),
            ("¿Cuánto es 10^2 - 5^2?", "75"),
            ("¿Cuánto es (3^3) + (4^3)?", "91"),
            ("¿Cuánto es (5^3) / (5^1)?", "25"),
            ("¿Cuánto es 2^6 - 2^4?", "48")

            ]
    }
}

EJERCICIOS_recientes = []
# Otras variables del juego
reloj = pygame.time.Clock()
puntuacion = 0
vidas = 3
texto_ingresado = ""
EJERCICIOS_en_pantalla = []
tiempo_inicio = None
tema_actual = None
velocidad_palabra = 0.4
imagen_corazon = pygame.image.load(imagenes["corazon.png"])
# Ajusta el tamaño según sea necesario
imagen_corazon = pygame.transform.scale(imagen_corazon, (70, 70))







global titulo_sonando, canal_titulo
titulo_sonando = pygame.mixer.Sound(sonidos["Sonido_Fondo.wav"])
canal_titulo = None


def controlar_titulo(accion):
    global canal_titulo, titulo_sonando
    if accion == "iniciar":
        if canal_titulo:
            canal_titulo.stop()
        canal_titulo = titulo_sonando.play(-1)  # -1 para reproducir en bucle
    elif accion == "detener":
        if canal_titulo:
            canal_titulo.stop()
            canal_titulo = None





def nueva_EJERCICIO(tema):
    global EJERCICIOS_recientes
    if not tema:
        return None

    # Obtener una nueva EJERCICIO aleatoria que no esté en las EJERCICIOS recientes
    nueva_EJERCICIO_data = None
    while nueva_EJERCICIO_data is None:
        indice_EJERCICIO = random.randint(0, len(temas[tema]["EJERCICIOS"]) - 1)
        EJERCICIO, palabra_correcta = temas[tema]["EJERCICIOS"][indice_EJERCICIO]
        if EJERCICIO not in EJERCICIOS_recientes:
            nueva_EJERCICIO_data = {
                "EJERCICIO": EJERCICIO,
                "palabra_correcta": palabra_correcta,
                "x": 0,
                "y": random.randint(50, 500),
                "color": (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
            }

    # Agregar la nueva EJERCICIO a la lista de EJERCICIOS recientes
    EJERCICIOS_recientes.append(nueva_EJERCICIO_data["EJERCICIO"])

    # Limitar la lista de EJERCICIOS recientes para que no sea demasiado larga
    if len(EJERCICIOS_recientes) > 10:
        EJERCICIOS_recientes = EJERCICIOS_recientes[1:]

    return nueva_EJERCICIO_data


def crear_boton(texto, x, y, ancho=400, alto=60):
    boton_img = pygame.image.load(imagenes["Boton.png"])
    boton_img = pygame.transform.scale(boton_img, (ancho, alto))
    boton_rect = boton_img.get_rect(center=(x, y))
    PANTALLA.blit(boton_img, boton_rect)
    
    texto_render = FUENTE.render(texto, True, NEGRO)
    texto_rect = texto_render.get_rect(center=boton_rect.center)
    PANTALLA.blit(texto_render, texto_rect)
    
    return boton_rect  # Devuelve el rectángulo del botón






def ventana_principal():
    controlar_titulo("iniciar")
    PANTALLA.fill(AZUL)

    # Imprimir el contenido del diccionario imagenes para depuración
    print("Contenido del diccionario imagenes:")
    for key, value in imagenes.items():
        print(f"{key}: {value}")

    # Verificar si 'logo.png' está en el diccionario imagenes
    if 'logo.png' in imagenes:
        logo_path = imagenes['logo.png']
    elif 'LISA.png' in imagenes:
        logo_path = imagenes['LISA.png']
    else:
        print("Error: No se encontró la imagen del logo en el diccionario imagenes")
        return

    try:
        # Cargar y mostrar el logo fuera de la pantalla
        logo = pygame.image.load(logo_path)
        logo = pygame.transform.scale(logo, (700, 600))
        logo_rect = logo.get_rect(center=(-200, ALTO // 3))  # Comienza fuera de la pantalla
        PANTALLA.blit(logo, logo_rect)

        # Definir la posición objetivo para el logo (centro de la pantalla)
        posicion_objetivo = pygame.Rect(ANCHO // 2 - 350, ALTO // 3, 500, 500)

        # Deslizar el logo hacia el centro de la pantalla
        while logo_rect.x < posicion_objetivo.x:
            PANTALLA.fill(AZUL)
            logo_rect.x += 5  # Ajustar la velocidad del deslizamiento si es necesario
            PANTALLA.blit(logo, logo_rect)
            pygame.display.flip()
            pygame.time.delay(20)

    except pygame.error as e:
        print(f"Error al cargar o mostrar el logo: {e}")
    except KeyError as e:
        print(f"Error: La clave {e} no está en el diccionario imagenes")
    finally:
        # Código de limpieza o procesamiento adicional si es necesario
        pass

    boton_instrucciones = crear_boton("INSTRUCCIONES", ANCHO // 2, ALTO - 220)
    boton_calculos = crear_boton("CALCULOS", ANCHO // 2, ALTO - 145)
    boton_salir = crear_boton("SALIR", ANCHO // 2, ALTO - 70)

    pygame.display.flip()

    while True:
        
        for evento in pygame.event.get():
            if evento.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif evento.type == pygame.MOUSEBUTTONDOWN:
                if boton_instrucciones.collidepoint(evento.pos):
                    sonidos["Correcta.wav"].play()
                    mostrar_instrucciones()
                elif boton_calculos.collidepoint(evento.pos):
                    sonidos["Correcta.wav"].play()
                    menu_niveles()
                elif boton_salir.collidepoint(evento.pos):
                    pygame.quit()
                    sys.exit()

        pygame.display.flip()







def mostrar_instrucciones():
    controlar_titulo("detener")
    try:
        imagen_izquierda = pygame.image.load(imagenes["logo.png"])
        imagen_derecha = pygame.image.load(imagenes["UPDS.png"])
        imagen_izquierda = pygame.transform.scale(imagen_izquierda, (140, 140))
        imagen_derecha = pygame.transform.scale(imagen_derecha, (110, 110))
    except pygame.error as e:
        print(f"Error al cargar las imágenes: {e}")
        imagen_izquierda = imagen_derecha = pygame.Surface((80, 80))
        imagen_izquierda.fill(BLANCO)
        imagen_derecha.fill(BLANCO)
    except KeyError as e:
        print(f"Error: La clave de imagen no existe en el diccionario. {e}")
        imagen_izquierda = imagen_derecha = pygame.Surface((80, 80))
        imagen_izquierda.fill(BLANCO)
        imagen_derecha.fill(BLANCO)

    margen_superior = 90
    espacio_entre_lineas = 40
    ancho_maximo_texto = ANCHO - 100

    while True:
        PANTALLA.fill(AZUL)
        texto_titulo = FUENTE.render("- INSTRUCCIONES -", True, BLANCO)
        PANTALLA.blit(texto_titulo, (ANCHO // 2 - texto_titulo.get_width() // 2, 30))

        instrucciones = [
           "1. Selecciona un nivel: básico, intermedio, avanzado o experto.",
    "2. Responde las operaciones matemáticas antes de que desaparezcan de la pantalla.",
    "3. Si un ejercicio desaparece sin ser respondido, perderás una vida de las tres que tienes al iniciar el juego.",
    "4. La dificultad y velocidad aumentan a medida que avanzas en los niveles.",
    "5. Usa el teclado para escribir la respuesta correcta.",
    "6. Si pierdes todas las vidas, deberás reiniciar el nivel.",
    "7. Pausa el juego en cualquier momento desde el menú de pausa.",
    "8. El objetivo es responder correctamente la mayor cantidad de ejercicios."
        ]

        y_offset = margen_superior
        for instruccion in instrucciones:
            palabras = instruccion.split()
            linea_actual = ""
            for palabra in palabras:
                linea_prueba = linea_actual + " " + palabra if linea_actual else palabra
                if FUENTE.size(linea_prueba)[0] <= ancho_maximo_texto:
                    linea_actual = linea_prueba
                else:
                    superficie_texto = FUENTE.render(linea_actual, True, BLANCO)
                    rect_texto = superficie_texto.get_rect(center=(ANCHO // 2, y_offset))
                    PANTALLA.blit(superficie_texto, rect_texto)
                    y_offset += espacio_entre_lineas
                    linea_actual = palabra
            if linea_actual:
                superficie_texto = FUENTE.render(linea_actual, True, BLANCO)
                rect_texto = superficie_texto.get_rect(center=(ANCHO // 2, y_offset))
                PANTALLA.blit(superficie_texto, rect_texto)
                y_offset += espacio_entre_lineas

        boton_volver = crear_boton("VOLVER", ANCHO // 2, ALTO - 90)

        PANTALLA.blit(imagen_izquierda, (30, ALTO - 150))
        PANTALLA.blit(imagen_derecha, (ANCHO - 150, ALTO - 140))

        pygame.display.flip()

        for evento in pygame.event.get():
            if evento.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif evento.type == pygame.MOUSEBUTTONDOWN:
                if boton_volver.collidepoint(evento.pos):
                    sonidos["Correcta.wav"].play()
                    controlar_titulo("iniciar")
                    ventana_principal()  # Llama directamente a ventana_principal() en lugar de retornar
                    return  # Asegura que se salga de mostrar_instrucciones() después de llamar a ventana_principal()

        pygame.display.flip()




def menu_niveles():
    controlar_titulo("detener")
    global tema_actual
    PANTALLA.fill(AZUL)
    texto_menu = FUENTE.render("- SELECCIONA TU DIFICULTAD -", True, BLANCO)
    PANTALLA.blit(texto_menu, (ANCHO // 2 - texto_menu.get_width() // 2, 50))

    y = 100
    botones_niveles = []
    for tema in temas.keys():
        boton_nivel = pygame.Rect(ANCHO // 2 - 200, y, 400, 50)
        botones_niveles.append(boton_nivel)
        boton_img = pygame.image.load(imagenes["Boton.png"])
        boton_img = pygame.transform.scale(boton_img, (400, 50))
        PANTALLA.blit(boton_img, boton_nivel)

        texto_tema = FUENTE.render(tema, True, NEGRO)
        text_x = boton_nivel.x + (boton_nivel.width - texto_tema.get_width()) // 2
        text_y = boton_nivel.y + (boton_nivel.height - texto_tema.get_height()) // 2
        PANTALLA.blit(texto_tema, (text_x, text_y))

        y += 100

    # Crear botón VOLVER
    boton_volver = pygame.Rect(ANCHO // 2 - 100, ALTO - 80, 200, 50)
    boton_img_volver = pygame.image.load(imagenes["Boton.png"])
    boton_img_volver = pygame.transform.scale(boton_img_volver, (200, 50))
    PANTALLA.blit(boton_img_volver, boton_volver)

    texto_volver = FUENTE.render("VOLVER", True, NEGRO)
    text_x_volver = boton_volver.x + (boton_volver.width - texto_volver.get_width()) // 2
    text_y_volver = boton_volver.y + (boton_volver.height - texto_volver.get_height()) // 2
    PANTALLA.blit(texto_volver, (text_x_volver, text_y_volver))

    while True:
        for evento in pygame.event.get():
            if evento.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif evento.type == pygame.MOUSEBUTTONDOWN:
                for i, boton in enumerate(botones_niveles):
                    if boton.collidepoint(evento.pos):
                        tema_actual = list(temas.keys())[i]
                        bucle_juego()
                if boton_volver.collidepoint(evento.pos):
                    sonidos["Correcta.wav"].play()
                    ventana_principal()
                    return  # Asegura que se salga de menu_niveles() después de llamar a ventana_principal()

        pygame.display.flip()

        

# Bucle del juego
def bucle_juego():
    controlar_titulo("detener")
    global puntuacion, vidas, texto_ingresado, EJERCICIOS_en_pantalla, tiempo_inicio

    jugando = True
    temporizador_puntuacion = 0
    duracion_puntuacion = 60  # Duración en frames (1 segundo a 60 FPS)
    posicion_puntuacion = None


    # Cargar fondo y sonido del nivel
    try:
        fondo = pygame.image.load(temas[tema_actual]["imagen_fondo"])
        fondo = pygame.transform.scale(fondo, (ANCHO, ALTO))
    except KeyError:
        print(f"Error: No se encontró la imagen de fondo para el tema '{tema_actual}'")
        fondo = pygame.Surface((ANCHO, ALTO))
        fondo.fill((0, 0, 0))  # Fondo negro como fallback

    try:
        sonido_nivel = temas[tema_actual]["fondo"]
        sonido_nivel.play(-1)  # Reproducir sonido en bucle
    except KeyError:
        print(f"Error: No se encontró el sonido de fondo para el tema '{tema_actual}'")

    # Cargar y posicionar el signo
    try:
        signo_img = pygame.image.load(imagenes["Signo.png"])
        signo_img = pygame.transform.scale(signo_img, (350, 158))
        signo_rect = signo_img.get_rect(center=(ANCHO // 2, ALTO // 2))
        
        # Para mover el signo, ajusta estas coordenadas
        signo_rect.topleft = (100, 100)  # Ejemplo: mueve el signo a (100, 100)
    except KeyError:
        print("Error: No se encontró la imagen 'Signo.png'")
        signo_img = pygame.Surface((350, 158))
        signo_img.fill((255, 0, 0))  # Rectángulo rojo como fallback
        signo_rect = signo_img.get_rect(center=(ANCHO // 2, ALTO // 2))

# Crear botón VOLVER
    boton_volver = pygame.Rect(ANCHO - 220, ALTO - 70, 200, 50)
    boton_img_volver = pygame.image.load(imagenes["Boton.png"])
    boton_img_volver = pygame.transform.scale(boton_img_volver, (200, 50))
    tiempo_inicio = pygame.time.get_ticks()  # Obtener el tiempo de inicio







    while jugando:
            PANTALLA.blit(fondo, (0, 0))  # Dibujar fondo

            # Draw a rectangle around the text "Points: {puntuacion}"
            texto_puntuacion = FUENTE.render(
                f"Points: {puntuacion}", True, ROJO)
            rect_puntuacion = texto_puntuacion.get_rect(topleft=(10, 10))
            # Fill the rectangle with white color
            pygame.draw.rect(PANTALLA, BLANCO, rect_puntuacion)
            PANTALLA.blit(texto_puntuacion, (10, 10))
            # Dibujar corazones
            for i, (x, y) in enumerate(posiciones_corazones[:vidas]):
                PANTALLA.blit(imagen_corazon, (x, y))

            PANTALLA.blit(signo_img, (330, 698))  # Dibujar signo


 # Dibujar botón VOLVER
            PANTALLA.blit(boton_img_volver, boton_volver)
            texto_volver = FUENTE.render("VOLVER", True, NEGRO)
            text_x_volver = boton_volver.x + (boton_volver.width - texto_volver.get_width()) // 2
            text_y_volver = boton_volver.y + (boton_volver.height - texto_volver.get_height()) // 2
            PANTALLA.blit(texto_volver, (text_x_volver, text_y_volver))

            # Manejo de eventos
            for evento in pygame.event.get():
                if evento.type == pygame.QUIT:
                    jugando = False
                elif evento.type == pygame.KEYDOWN:
                    if evento.key == pygame.K_ESCAPE:
                        jugando = False
                        sonido_nivel.stop()
                        game_over()
                    elif evento.key == pygame.K_BACKSPACE:
                        texto_ingresado = texto_ingresado[:-1]
                    else:
                        texto_ingresado += evento.unicode
                elif evento.type == pygame.MOUSEBUTTONDOWN:
                    if boton_volver.collidepoint(evento.pos):
                       sonidos["Correcta.wav"].play()
                       sonido_nivel.stop()
                       controlar_titulo("iniciar")
                       ventana_principal()
                    return  # Salir de bucle_juego() y volver a la ventana principal

            # Agregar más EJERCICIOS gradualmente según la puntuación
            while len(EJERCICIOS_en_pantalla) < (puntuacion // 8) + 1:
                nueva_EJERCICIO_data = nueva_EJERCICIO(tema_actual)
                if nueva_EJERCICIO_data:
                    EJERCICIOS_en_pantalla.append(nueva_EJERCICIO_data)
                else:
                    break  # No hay más EJERCICIOS en el tema actual

                # Update the velocidad_palabra based on puntuacion
            velocidad_palabra = 0.1 + (puntuacion/50)

            # Dibujar EJERCICIOS y verificar colisiones
            for EJERCICIO in EJERCICIOS_en_pantalla[:]:
                # Renderizar texto con fondo blanco
                texto_con_fondo = FUENTE.render(
                    EJERCICIO["EJERCICIO"], True, NEGRO, BLANCO)
                rect_fondo = texto_con_fondo.get_rect(
                    topleft=(EJERCICIO["x"], EJERCICIO["y"]))
                PANTALLA.fill(BLANCO, rect_fondo)
                PANTALLA.blit(texto_con_fondo, rect_fondo)
                EJERCICIO["x"] += velocidad_palabra

                if EJERCICIO["x"] > ANCHO:
                    EJERCICIOS_en_pantalla.remove(EJERCICIO)
                    vidas -= 1
                    temas[tema_actual]["fracaso"].play()
                    if vidas == 0:
                        jugando = False
                        pygame.time.delay(4000)
                        temas[tema_actual]["fondo"].stop()
                        game_over()

                if texto_ingresado.strip().lower() == EJERCICIO["palabra_correcta"].lower():
                    puntuacion += 1
                    temas[tema_actual]["clic"].play()
                    # Encontrar la EJERCICIO correcta y eliminarla
                    for p in EJERCICIOS_en_pantalla:
                        if p["palabra_correcta"].lower() == EJERCICIO["palabra_correcta"].lower():
                            EJERCICIOS_en_pantalla.remove(p)
                            # Establecer la posición de la puntuación
                            if not posicion_puntuacion:
                                posicion_puntuacion = p["x"]
                            break  # Salir del bucle después de eliminar la EJERCICIO correcta
                    texto_ingresado = ""  # Limpiar texto ingresado después de una palabra correcta
                    temporizador_puntuacion = duracion_puntuacion

            # Mostrar puntuación
            tiempo_transcurrido = (
                pygame.time.get_ticks() - tiempo_inicio) / 1000
            texto_puntuacion = FUENTE.render(
                f"Points: {puntuacion}", True, ROJO)
            PANTALLA.blit(texto_puntuacion, (10, 10))

            # Mostrar tiempo transcurrido
            texto_tiempo = FUENTE.render(f"Time: {int(tiempo_transcurrido)}s", True, ROJO)
            rect_tiempo = texto_tiempo.get_rect(midtop=(ANCHO // 2, 10))
            pygame.draw.rect(PANTALLA, BLANCO, rect_tiempo)  
            PANTALLA.blit(texto_tiempo, rect_tiempo)


            # Mostrar texto ingresado
            texto_ingresado_render = FUENTE.render(
                texto_ingresado, True, NEGRO)
            PANTALLA.blit(texto_ingresado_render, (ANCHO // 2 -
                          texto_ingresado_render.get_width() // 2, ALTO - 50))

            pygame.display.flip()
            reloj.tick(60)
    sonido_nivel.stop()  # Detener el sonido del nivel cuando el juego termina
    pygame.quit()
    sys.exit()


# Función para mostrar pantalla de game over

def game_over():
    global tema_actual, puntuacion, vidas, texto_ingresado, EJERCICIOS_en_pantalla, tiempo_inicio
    PANTALLA.fill(AZUL)
    sonidos["GameOver.wav"].play()
    texto_game_over = FUENTE.render("Game Over!", True, BLANCO)
    PANTALLA.blit(texto_game_over, (ANCHO // 2 -
                  texto_game_over.get_width() // 2, ALTO // 2))

    pygame.display.flip()
    pygame.time.delay(6000)  # Esperar 6 segundos

    # reiniciar stats
    puntuacion = 0
    vidas = 3
    texto_ingresado = ""
    EJERCICIOS_en_pantalla = []
    tiempo_inicio = None
    menu_niveles()


def main():
    ventana_principal()

if __name__ == "__main__":
    main()
