import React, { useState } from 'react';
import GameEngine from './components/GameEngine';

function App() {
  const [view, setView] = useState('menu'); // 'menu', 'instructions', 'playing', 'gameover'
  const [difficulty, setDifficulty] = useState(null);
  const [finalScore, setFinalScore] = useState(0);

  const startGame = (level) => {
    setDifficulty(level);
    setView('playing');
  };

  const handleGameOver = (score) => {
    setFinalScore(score);
    setView('gameover');
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {view === 'menu' && (
        <div className="glass-panel animate-slide-in" style={{ width: '90%', maxWidth: '500px', textAlign: 'center' }}>
          <h1 className="title-gradient">NumberDash</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Desafía tu agilidad mental matemática</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button className="btn-primary" onClick={() => setView('levelSelect')}>Jugar</button>
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
