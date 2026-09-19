import React, { useState, useEffect, useCallback } from 'react';
import GameEngine from './components/GameEngine';
import Modal from './components/Modal';
import { Play, Trophy, BookOpen, Settings, Home, RotateCcw, Medal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [view, setView] = useState('menu'); // 'menu', 'instructions', 'playing', 'gameover', 'scores', 'achievements'
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

  // Estadísticas y Logros
  const [stats, setStats] = useState({
    totalGames: 0,
    totalCorrect: 0,
    achievements: [] // IDs de logros desbloqueados
  });

  const ALL_ACHIEVEMENTS = [
    { id: 'first_blood', title: 'Primera Sangre', desc: 'Juega tu primera partida', icon: '🩸' },
    { id: 'combo_10', title: 'Máquina Humana', desc: 'Alcanza un combo de x10', icon: '🔥' },
    { id: 'math_genius', title: 'Genio Matemático', desc: 'Resuelve 50 operaciones en total', icon: '🧠' },
    { id: 'veteran', title: 'Veterano', desc: 'Juega 10 partidas', icon: '🎖️' }
  ];

  useEffect(() => {
    const savedScores = localStorage.getItem('numberdash_scores');
    if (savedScores) setHighScores(JSON.parse(savedScores));
    
    const savedSettings = localStorage.getItem('numberdash_settings');
    if (savedSettings) setSettings(JSON.parse(savedSettings));

    const savedStats = localStorage.getItem('numberdash_stats');
    if (savedStats) setStats(JSON.parse(savedStats));
  }, []);

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('numberdash_settings', JSON.stringify(newSettings));
  };

  const unlockAchievement = useCallback((id) => {
    setStats(prev => {
      if (prev.achievements.includes(id)) return prev;
      
      const ach = ALL_ACHIEVEMENTS.find(a => a.id === id);
      toast(`¡Logro Desbloqueado!\n${ach.title}`, {
        icon: ach.icon,
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
      
      const next = { ...prev, achievements: [...prev.achievements, id] };
      localStorage.setItem('numberdash_stats', JSON.stringify(next));
      return next;
    });
  }, []);

  const startGame = (level) => {
    setDifficulty(level);
    setView('playing');
  };

  const handleGameOver = (score, sessionCorrect) => {
    setFinalScore(score);
    setView('gameover');
    
    // Reproducir sonido Game Over
    const sndOver = new Audio('/sounds/GameOver.wav');
    sndOver.volume = settings.volume;
    sndOver.play().catch(() => {});
    
    // Guardar nuevo récord
    if (score > highScores[difficulty]) {
      const updatedScores = { ...highScores, [difficulty]: score };
      setHighScores(updatedScores);
      localStorage.setItem('numberdash_scores', JSON.stringify(updatedScores));
    }

    // Actualizar stats
    setStats(prev => {
      const next = {
        ...prev,
        totalGames: prev.totalGames + 1,
        totalCorrect: prev.totalCorrect + sessionCorrect
      };
      localStorage.setItem('numberdash_stats', JSON.stringify(next));
      
      // Chequear logros de stats
      if (next.totalGames === 1 && !next.achievements.includes('first_blood')) setTimeout(() => unlockAchievement('first_blood'), 500);
      if (next.totalGames === 10 && !next.achievements.includes('veteran')) setTimeout(() => unlockAchievement('veteran'), 500);
      if (next.totalCorrect >= 50 && !next.achievements.includes('math_genius')) setTimeout(() => unlockAchievement('math_genius'), 500);
      
      return next;
    });
  };

  // Variantes de animación de Framer Motion
  const pageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    in: { opacity: 1, y: 0, scale: 1 },
    out: { opacity: 0, y: -20, scale: 1.05 }
  };
  const pageTransition = { type: 'spring', stiffness: 300, damping: 25 };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Toaster position="top-right" />
      
      <AnimatePresence mode="wait">
        {view === 'menu' && (
          <motion.div key="menu" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="glass-panel" style={{ width: '90%', maxWidth: '500px', textAlign: 'center' }}>
            <h1 className="title-gradient">NumberDash</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Desafía tu agilidad mental matemática</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} onClick={() => setView('levelSelect')}>
                <Play size={24} /> Jugar
              </button>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'transparent', border: '1px solid var(--glass-border)' }} onClick={() => setView('scores')}>
                <Trophy size={20} /> Puntuaciones
              </button>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'transparent', border: '1px solid var(--glass-border)' }} onClick={() => setView('achievements')}>
                <Medal size={20} /> Logros y Estadísticas
              </button>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'transparent', border: '1px solid var(--glass-border)' }} onClick={() => setView('instructions')}>
                <BookOpen size={20} /> Manual de Uso
              </button>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'transparent', border: '1px solid var(--glass-border)' }} onClick={() => setShowSettings(true)}>
                <Settings size={20} /> Opciones
              </button>
            </div>
          </motion.div>
        )}

        {view === 'levelSelect' && (
          <motion.div key="levels" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="glass-panel" style={{ width: '90%', maxWidth: '500px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '2rem' }}>Selecciona Nivel</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button className="btn-primary" onClick={() => startGame('BÁSICO')}>Básico</button>
              <button className="btn-primary" onClick={() => startGame('INTERMEDIO')}>Intermedio</button>
              <button className="btn-primary" onClick={() => startGame('AVANZADO')}>Avanzado</button>
              <button className="btn-primary" onClick={() => startGame('EXPERTO')}>Experto</button>
              <button 
                className="btn-primary" 
                style={{ marginTop: '1rem', background: 'transparent', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }} 
                onClick={() => setView('menu')}
              >
                <Home size={20} /> Volver
              </button>
            </div>
          </motion.div>
        )}

        {view === 'instructions' && (
          <motion.div key="instructions" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="glass-panel" style={{ width: '90%', maxWidth: '600px' }}>
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
          </motion.div>
        )}

        {view === 'scores' && (
          <motion.div key="scores" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="glass-panel" style={{ width: '90%', maxWidth: '400px', textAlign: 'center' }}>
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
          </motion.div>
        )}

        {view === 'achievements' && (
          <motion.div key="achievements" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="glass-panel" style={{ width: '90%', maxWidth: '500px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-secondary)' }}>Logros y Estadísticas</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '2rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '10px' }}>
              <div>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Partidas Totales</p>
                <h3 style={{ margin: 0, color: 'var(--accent-primary)' }}>{stats.totalGames}</h3>
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Aciertos Totales</p>
                <h3 style={{ margin: 0, color: 'var(--accent-secondary)' }}>{stats.totalCorrect}</h3>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {ALL_ACHIEVEMENTS.map(ach => {
                const isUnlocked = stats.achievements.includes(ach.id);
                return (
                  <div key={ach.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: isUnlocked ? 'rgba(233, 69, 96, 0.1)' : 'rgba(255,255,255,0.02)', border: `1px solid ${isUnlocked ? 'var(--accent-primary)' : 'var(--glass-border)'}`, borderRadius: '8px', opacity: isUnlocked ? 1 : 0.5 }}>
                    <div style={{ fontSize: '2rem', filter: isUnlocked ? 'none' : 'grayscale(100%)' }}>{ach.icon}</div>
                    <div style={{ textAlign: 'left' }}>
                      <h4 style={{ margin: 0, color: isUnlocked ? 'white' : 'var(--text-secondary)' }}>{ach.title}</h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{ach.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '0 auto' }} onClick={() => setView('menu')}>
              <Home size={20} /> Volver
            </button>
          </motion.div>
        )}

        {view === 'playing' && (
          <motion.div key="playing" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} style={{ width: '100%', height: '100%' }}>
            <GameEngine 
              difficulty={difficulty} 
              settings={settings} 
              onGameOver={handleGameOver} 
              onQuit={() => setView('menu')} 
              onAchievementUnlock={unlockAchievement}
            />
          </motion.div>
        )}

        {view === 'gameover' && (
          <motion.div key="gameover" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="glass-panel" style={{ width: '90%', maxWidth: '400px', textAlign: 'center' }}>
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
          </motion.div>
        )}
      </AnimatePresence>

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

    </div>
  );
}

export default App;
