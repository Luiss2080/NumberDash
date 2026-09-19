import React, { useState, useEffect } from 'react';

function Particles({ targetPos, color = 'var(--accent-secondary)' }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generar partículas cuando el componente se monta (cuando se destruye un enemigo)
    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: targetPos.x,
      y: targetPos.y,
      vx: (Math.random() - 0.5) * 15, // Velocidad X
      vy: (Math.random() - 0.5) * 15, // Velocidad Y
      life: 1.0,
      size: Math.random() * 8 + 4
    }));
    
    setParticles(newParticles);

    // Animar las partículas
    let animationFrame;
    const animate = () => {
      setParticles(prev => {
        const updated = prev.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life - 0.05,
          vy: p.vy + 0.5 // Gravedad ligera
        })).filter(p => p.life > 0);
        
        if (updated.length > 0) {
          animationFrame = requestAnimationFrame(animate);
        }
        return updated;
      });
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [targetPos]);

  if (particles.length === 0) return null;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 15 }}>
      {particles.map(p => (
        <div 
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: color,
            borderRadius: '50%',
            opacity: p.life,
            transform: `scale(${p.life})`,
            boxShadow: `0 0 10px ${color}`
          }}
        />
      ))}
    </div>
  );
}

export default Particles;
