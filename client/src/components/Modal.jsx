import React from 'react';
import { IoClose } from "react-icons/io5";

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
          <IoClose size={30} />
        </button>
        <div className=" ">
          <h2 className=" text-xl font-bold text-center underline">Card Details</h2>
          {/* {card.audio && ( */}
          <div>
            <strong>Audio:</strong>
            <audio controls className="w-full rounded-lg">
              <source src={card.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          {/* )} */}
          <p>
            <strong>Text:</strong> {card.text}
          </p>
          <p>
            <strong>Time:</strong> {new Date(card.createdAt).toLocaleString()}
          </p>



        </div>


      </div>
    </div>
  );
};

export default Modal;
