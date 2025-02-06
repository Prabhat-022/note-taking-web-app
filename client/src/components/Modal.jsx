import React from 'react';

const Modal = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '5px',
          maxWidth: '600px',
          width: '90%',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '10px', right: '10px' }}
        >
          Close
        </button>
        <h2>Card Details</h2>
        <p>
          <strong>Text:</strong> {card.text}
        </p>
        <p>
          <strong>Time:</strong> {card.time}
        </p>

        {card.audio && (
          <div>
            <strong>Audio:</strong>
            <audio controls style={{ display: 'block', marginTop: '10px' }}>
              <source src={card.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Modal;
