import React, { useEffect } from 'react';

const Overlay = ({ isOpen, onClose, children }) => {
  // Prevent background scrolling when the overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={styles.backdrop} onClick={onClose}>
      {/* Close Button (Instagram style top-right 'X') */}
      <button style={styles.closeButton} onClick={onClose}>
        &times;
      </button>

      {/* Content Container - stops click propagation so clicking inside doesn't close it */}
      <div style={styles.contentContainer} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.65)', // Semi-transparent dark background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensures it sits on top of the dashboard
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    maxWidth: '935px', // Instagram's standard desktop post width
    width: '90%',
    maxHeight: '90vh',
    display: 'flex',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '3rem',
    cursor: 'pointer',
    lineHeight: 1,
  },
};

export default Overlay;