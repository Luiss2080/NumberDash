"""Verifica cada respuesta del banco de NumberDash evaluando la operación.

Se lee NumberDash.py con ast (sin importarlo) para no necesitar pantalla ni
los .wav pesados.
"""
import ast
import re
import sys
from fractions import Fraction
from pathlib import Path

import pytest

RAIZ = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(RAIZ))
from respuestas import es_correcta, parsear_respuesta  # noqa: E402


def evaluar(nodo):
    if isinstance(nodo, ast.Constant) and isinstance(nodo.value, int):
        return Fraction(nodo.value)
    if isinstance(nodo, ast.BinOp):
        a, b = evaluar(nodo.left), evaluar(nodo.right)
        if isinstance(nodo.op, ast.Add):
            return a + b
        if isinstance(nodo.op, ast.Sub):
            return a - b
        if isinstance(nodo.op, ast.Mult):
            return a * b
        if isinstance(nodo.op, ast.Div):
            return a / b
        if isinstance(nodo.op, ast.Pow) and b.denominator == 1:
            return a ** int(b)
    raise ValueError("expresión no soportada")


def cargar_banco():
    arbol = ast.parse((RAIZ / "NumberDash.py").read_text(encoding="utf-8"))
    banco = []
    for nodo in ast.walk(arbol):
        if isinstance(nodo, ast.Dict):
            for k, v in zip(nodo.keys, nodo.values):
                if isinstance(k, ast.Constant) and k.value == "EJERCICIOS":
                    banco.extend(ast.literal_eval(v))
    return banco


BANCO = cargar_banco()


def test_banco_tiene_120_ejercicios():
    assert len(BANCO) == 120


@pytest.mark.parametrize("pregunta,respuesta", BANCO)
def test_respuesta_del_banco_es_correcta(pregunta, respuesta):
    expr = re.fullmatch(r"¿Cuánto es (.+)\?", pregunta).group(1).replace("^", "**")
    esperado = evaluar(ast.parse(expr, mode="eval").body)
    assert parsear_respuesta(respuesta) == esperado, f"{pregunta} -> {esperado}"
    # y la forma guardada está simplificada (lo que el jugador espera ver)
    assert str(esperado.numerator) + (
        "" if esperado.denominator == 1 else f"/{esperado.denominator}"
    ) == respuesta


def test_fracciones_equivalentes_se_aceptan():
    assert es_correcta("2/4", "1/2")
    assert es_correcta("0.5", "1/2")
    assert es_correcta("4,5", "9/2")
    assert es_correcta(" -1/24 ", "-1/24")


def test_respuestas_incorrectas_o_incompletas():
    assert not es_correcta("1/", "1/2")
    assert not es_correcta("", "0")
    assert not es_correcta("1/0", "1")
    assert not es_correcta("21", "17")
