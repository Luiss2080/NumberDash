import React, { useState, useEffect, useRef, useCallback } from 'react';

// Generador de ejercicios simple basado en el nivel
const generateExercise = (difficulty) => {
  const ops = ['+', '-', '*'];
  let a, b, op;
  
  if (difficulty === 'BÁSICO') {
    a = Math.floor(Math.random() * 10) + 1;
    b = Math.floor(Math.random() * 10) + 1;
    op = ops[Math.floor(Math.random() * 2)]; // Solo + y -
  } else if (difficulty === 'INTERMEDIO') {
    a = Math.floor(Math.random() * 20) + 5;
    b = Math.floor(Math.random() * 10) + 2;
    op = ops[Math.floor(Math.random() * 3)];
  } else {
    a = Math.floor(Math.random() * 50) + 10;
    b = Math.floor(Math.random() * 20) + 2;
    op = ops[Math.floor(Math.random() * 3)];
  }

  let answer;
  switch (op) {
    case '+': answer = a + b; break;
    case '-': answer = a - b; break;
    case '*': answer = a * b; break;
    default: answer = a + b;
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    text: `${a} ${op} ${b}`,
    answer: answer.toString(),
    x: 0,
    y: Math.random() * 60 + 10, // Porcentaje de 10 a 70% de la altura de la pantalla
    color: `hsl(${Math.random() * 360}, 70%, 70%)`
  };
};

function GameEngine({ difficulty, onGameOver, onQuit }) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [input, setInput] = useState('');
  const [exercises, setExercises] = useState([]);
  
  const exercisesRef = useRef(exercises);
  const scoreRef = useRef(score);
  const livesRef = useRef(lives);
  const requestRef = useRef();
  
  // Sincronizar refs
  useEffect(() => { exercisesRef.current = exercises; }, [exercises]);
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { livesRef.current = lives; }, [lives]);

  const removeExercise = useCallback((id) => {
    setExercises(prev => prev.filter(e => e.id !== id));
  }, []);

  // Bucle principal del juego
  const gameLoop = useCallback((time) => {
    // Generar nuevos ejercicios periódicamente
    const currentExercises = exercisesRef.current;
    
    // Si hay pocos, agregar uno
    if (currentExercises.length < Math.floor(scoreRef.current / 5) + 1 && Math.random() < 0.02) {
      setExercises(prev => [...prev, generateExercise(difficulty)]);
    }

    // Mover ejercicios
    let livesLost = 0;
    const speed = 0.2 + (scoreRef.current * 0.01);
    
    setExercises(prev => {
      const next = [];
      for (const ex of prev) {
        const newX = ex.x + speed;
        if (newX > 100) {
          livesLost++;
        } else {
          next.push({ ...ex, x: newX });
        }
      }
      return next;
    });

    if (livesLost > 0) {
      const newLives = livesRef.current - livesLost;
      setLives(newLives);
      if (newLives <= 0) {
        onGameOver(scoreRef.current);
        return; // Salir del loop
      }
    }

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [difficulty, onGameOver]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameLoop]);

  // Manejo de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onQuit();
        return;
      }
      if (e.key === 'Backspace') {
        setInput(prev => prev.slice(0, -1));
        return;
      }
      if (e.key.length === 1 && !isNaN(e.key)) { // Solo números (simplificado)
        // o si permitimos negativos:
        // if (e.key.length === 1 && (/[0-9\-]/.test(e.key)))
        setInput(prev => {
          const newVal = prev + e.key;
          // Validar respuestas
          const matchedEx = exercisesRef.current.find(ex => ex.answer === newVal);
          if (matchedEx) {
            removeExercise(matchedEx.id);
            setScore(s => s + 1);
            return ''; // Limpiar input
          }
          return newVal;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onQuit, removeExercise]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      
      {/* UI Overlay */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '2rem', zIndex: 10 }}>
        <div className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Nivel: <strong style={{ color: 'var(--text-primary)'}}>{difficulty}</strong></span>
          <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Puntos: <strong style={{ color: 'var(--accent-primary)'}}>{score}</strong></span>
          <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Vidas: <strong style={{ color: 'var(--danger)'}}>{'❤️'.repeat(lives)}</strong></span>
        </div>
      </div>
      
      <button 
        className="btn-primary" 
        style={{ position: 'absolute', top: '20px', right: '20px', padding: '0.8rem 1.5rem', background: 'transparent', border: '1px solid var(--glass-border)' }}
        onClick={onQuit}
      >
        Salir (ESC)
      </button>

      {/* Input de usuario centrado abajo */}
      <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 10 }}>
        <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Tu respuesta:</div>
        <div className="glass-panel" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', minWidth: '150px', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--accent-primary)' }}>
          {input || '_'}
        </div>
      </div>

      {/* Área de juego */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {exercises.map(ex => (
          <div 
            key={ex.id}
            className="operation-item"
            style={{
              left: `${ex.x}%`,
              top: `${ex.y}%`,
              color: ex.color
            }}
          >
            {ex.text}
          </div>
        ))}
      </div>

    </div>
  );
}

export default GameEngine;
