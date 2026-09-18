"""Comparación de respuestas de NumberDash sin depender de pygame."""
from fractions import Fraction


def parsear_respuesta(texto):
    """Convierte lo tecleado (entero, fracción 'a/b' o decimal) en Fraction.

    Devuelve None si el texto todavía no es un número válido (p. ej. '1/').
    """
    if texto is None:
        return None
    limpio = texto.strip().replace(",", ".").replace(" ", "")
    if not limpio:
        return None
    try:
        return Fraction(limpio)
    except (ValueError, ZeroDivisionError):
        return None


def es_correcta(ingresado, esperada):
    """True si ambos valen lo mismo (1/2 == 2/4 == 0.5)."""
    a = parsear_respuesta(ingresado)
    b = parsear_respuesta(esperada)
    return a is not None and b is not None and a == b
