import React from 'react';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(5px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="glass-panel animate-slide-in" style={{ 
        width: '90%', maxWidth: '500px', padding: '2rem',
        position: 'relative', display: 'flex', flexDirection: 'column', gap: '1.5rem'
      }}>
        {onClose && (
          <button 
            onClick={onClose}
            style={{ 
              position: 'absolute', top: '15px', right: '20px', 
              background: 'transparent', border: 'none', color: 'var(--text-secondary)',
              fontSize: '1.5rem', cursor: 'pointer' 
            }}
          >
            ✕
          </button>
        )}
        
        {title && <h2 style={{ color: 'var(--accent-primary)', margin: 0, textAlign: 'center' }}>{title}</h2>}
        
        <div style={{ width: '100%' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
