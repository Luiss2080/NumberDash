import React, { useState, useEffect } from 'react';
import GameEngine from './components/GameEngine';
import Modal from './components/Modal';
import { Play, Trophy, BookOpen, Settings, Home, RotateCcw } from 'lucide-react';

function App() {
  const [view, setView] = useState('menu'); // 'menu', 'instructions', 'playing', 'gameover', 'scores'
  const [difficulty, setDifficulty] = useState(null);
  const [finalScore, setFinalScore] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  
  // Opciones globales
  const [settings, setSettings] = useState({
    volume: 0.5,
    particlesEnabled: true
  });

  const [highScores, setHighScores] = useState({
    BÁSICO: 0,
    INTERMEDIO: 0,
    AVANZADO: 0,
    EXPERTO: 0
  });

  useEffect(() => {
    const savedScores = localStorage.getItem('numberdash_scores');
    if (savedScores) setHighScores(JSON.parse(savedScores));
    
    const savedSettings = localStorage.getItem('numberdash_settings');
    if (savedSettings) setSettings(JSON.parse(savedSettings));
  }, []);

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('numberdash_settings', JSON.stringify(newSettings));
  };


  const startGame = (level) => {
    setDifficulty(level);
    setView('playing');
  };

  const handleGameOver = (score) => {
    setFinalScore(score);
    setView('gameover');
    
    // Reproducir sonido Game Over
    const sndOver = new Audio('/sounds/GameOver.wav');
    sndOver.play().catch(() => {});
    
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
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} onClick={() => setView('levelSelect')}>
              <Play size={24} /> Jugar
            </button>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'transparent', border: '1px solid var(--glass-border)' }} onClick={() => setView('scores')}>
              <Trophy size={20} /> Puntuaciones
            </button>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'transparent', border: '1px solid var(--glass-border)' }} onClick={() => setView('instructions')}>
              <BookOpen size={20} /> Manual de Uso
            </button>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'transparent', border: '1px solid var(--glass-border)' }} onClick={() => setShowSettings(true)}>
              <Settings size={20} /> Opciones
            </button>
          </div>
        </div>
      )}

      {/* Modal de Opciones Globales */}
      <Modal isOpen={showSettings} onClose={() => setShowSettings(false)} title="Opciones">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem 0' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Volumen Maestro</label>
            <input 
              type="range" min="0" max="1" step="0.1" 
              value={settings.volume} 
              onChange={(e) => updateSetting('volume', parseFloat(e.target.value))} 
              style={{ width: '50%' }}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Efectos Visuales (Partículas)</label>
            <input 
              type="checkbox" 
              checked={settings.particlesEnabled} 
              onChange={(e) => updateSetting('particlesEnabled', e.target.checked)} 
              style={{ transform: 'scale(1.5)' }}
            />
          </div>
        </div>
      </Modal>

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
          <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <BookOpen /> Manual de Uso Interactivo
          </h2>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>¿Cómo Jugar?</h3>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '2', marginLeft: '1.5rem' }}>
              <li><strong>Objetivo:</strong> Resuelve las operaciones matemáticas antes de que crucen la pantalla.</li>
              <li><strong>Controles:</strong> Usa el teclado numérico directamente. Presiona <kbd style={{background: '#333', padding: '3px 8px', borderRadius: '4px'}}>Retroceso</kbd> para corregir.</li>
              <li><strong>Vidas:</strong> Tienes 3 vidas. Si una operación llega al borde derecho, pierdes una.</li>
              <li><strong>Combos:</strong> Acierta respuestas consecutivas para multiplicar tus puntos. Si fallas, ¡el combo vuelve a cero!</li>
            </ul>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '0 auto' }} onClick={() => setView('menu')}>
              <Home size={20} /> Volver al Menú
            </button>
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
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '0 auto' }} onClick={() => setView('menu')}>
            <Home size={20} /> Volver
          </button>
        </div>
      )}

      {view === 'playing' && (
        <GameEngine 
          difficulty={difficulty} 
          settings={settings} 
          onGameOver={handleGameOver} 
          onQuit={() => setView('menu')} 
        />
      )}

      {view === 'gameover' && (
        <div className="glass-panel animate-slide-in" style={{ width: '90%', maxWidth: '400px', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--danger)', fontSize: '2.5rem', marginBottom: '1rem' }}>Game Over!</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Puntuación: <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{finalScore}</span></p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} onClick={() => startGame(difficulty)}>
              <RotateCcw size={20} /> Reintentar
            </button>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'transparent', border: '1px solid var(--glass-border)' }} onClick={() => setView('menu')}>
              <Home size={20} /> Menú Principal
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
