import React, { useState, useEffect } from 'react';
import GameEngine from './components/GameEngine';

function App() {
  const [view, setView] = useState('menu'); // 'menu', 'instructions', 'playing', 'gameover', 'scores'
  const [difficulty, setDifficulty] = useState(null);
  const [finalScore, setFinalScore] = useState(0);
  const [highScores, setHighScores] = useState({
    BÁSICO: 0,
    INTERMEDIO: 0,
    AVANZADO: 0,
    EXPERTO: 0
  });

  useEffect(() => {
    const saved = localStorage.getItem('numberdash_scores');
    if (saved) {
      setHighScores(JSON.parse(saved));
    }
  }, []);


  const startGame = (level) => {
    setDifficulty(level);
    setView('playing');
  };

  const handleGameOver = (score) => {
    setFinalScore(score);
    setView('gameover');
    
    // Guardar nuevo récord si es mayor
    if (score > highScores[difficulty]) {
      const updatedScores = { ...highScores, [difficulty]: score };
      setHighScores(updatedScores);
      localStorage.setItem('numberdash_scores', JSON.stringify(updatedScores));
    }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {view === 'menu' && (
        <div className="glass-panel animate-slide-in" style={{ width: '90%', maxWidth: '500px', textAlign: 'center' }}>
          <h1 className="title-gradient">NumberDash</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Desafía tu agilidad mental matemática</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button className="btn-primary" onClick={() => setView('levelSelect')}>Jugar</button>
            <button className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--glass-border)' }} onClick={() => setView('scores')}>
              Puntuaciones
            </button>
            <button className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--glass-border)' }} onClick={() => setView('instructions')}>
              Instrucciones
            </button>
          </div>
        </div>
      )}

      {view === 'levelSelect' && (
        <div className="glass-panel animate-slide-in" style={{ width: '90%', maxWidth: '500px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '2rem' }}>Selecciona Nivel</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button className="btn-primary" onClick={() => startGame('BÁSICO')}>Básico</button>
            <button className="btn-primary" onClick={() => startGame('INTERMEDIO')}>Intermedio</button>
            <button className="btn-primary" onClick={() => startGame('AVANZADO')}>Avanzado</button>
            <button className="btn-primary" onClick={() => startGame('EXPERTO')}>Experto</button>
            <button 
              className="btn-primary" 
              style={{ marginTop: '1rem', background: 'transparent', border: '1px solid var(--glass-border)' }} 
              onClick={() => setView('menu')}
            >
              Volver
            </button>
          </div>
        </div>
      )}

      {view === 'instructions' && (
        <div className="glass-panel animate-slide-in" style={{ width: '90%', maxWidth: '600px' }}>
          <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Instrucciones</h2>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginLeft: '1.5rem' }}>
            <li>Selecciona un nivel: básico, intermedio, avanzado o experto.</li>
            <li>Responde las operaciones matemáticas antes de que desaparezcan de la pantalla.</li>
            <li>Si un ejercicio desaparece sin ser respondido, perderás una vida de las tres que tienes.</li>
            <li>Usa el teclado para escribir la respuesta correcta.</li>
            <li>Si pierdes todas las vidas, deberás reiniciar el nivel.</li>
          </ul>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="btn-primary" onClick={() => setView('menu')}>Volver al Menú</button>
          </div>
        </div>
      )}

      {view === 'scores' && (
        <div className="glass-panel animate-slide-in" style={{ width: '90%', maxWidth: '400px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>Récords Locales</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', textAlign: 'left', padding: '0 2rem' }}>
            {Object.entries(highScores).map(([level, score]) => (
              <div key={level} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{level}:</span>
                <strong style={{ fontSize: '1.2rem' }}>{score}</strong>
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={() => setView('menu')}>Volver</button>
        </div>
      )}

      {view === 'playing' && (
        <GameEngine difficulty={difficulty} onGameOver={handleGameOver} onQuit={() => setView('menu')} />
      )}

      {view === 'gameover' && (
        <div className="glass-panel animate-slide-in" style={{ width: '90%', maxWidth: '400px', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--danger)', fontSize: '2.5rem', marginBottom: '1rem' }}>Game Over!</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Puntuación: <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{finalScore}</span></p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button className="btn-primary" onClick={() => startGame(difficulty)}>Reintentar</button>
            <button className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--glass-border)' }} onClick={() => setView('menu')}>
              Menú Principal
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
