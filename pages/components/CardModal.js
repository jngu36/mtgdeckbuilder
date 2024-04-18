import React from 'react';
import Image from 'next/image';

const CardModal = ({ isOpen, closeModal, card }) => {
  if (!isOpen || !card) {
    return null; // Return null if modal is not open or card is null
  }

  console.log('Card Object:', card); // Log the card object

  const handleCloseModal = (e) => {
    e.stopPropagation();
    closeModal();
  };

  const legalities = card.legalities; // Access the legalities object

  // Define the desired legalities to display
  const desiredLegalities = {
    Standard: legalities.standard,
    Alchemy: legalities.alchemy,
    Pioneer: legalities.pioneer,
    Explorer: legalities.explorer,
    Modern: legalities.modern,
    Historic: legalities.historic,
    Legacy: legalities.legacy,
    Brawl: legalities.brawl,
    Vintage: legalities.vintage,
    Timeless: legalities.timeless,
    Commander: legalities.commander,
    Pauper: legalities.pauper,
    Oathbreaker: legalities.oathbreaker,
    Penny: legalities.penny,
  };

  // Split the legalities into two arrays
  const firstSevenLegalities = Object.entries(desiredLegalities).slice(0, 7);
  const secondSevenLegalities = Object.entries(desiredLegalities).slice(7);

  return (
    <>
      {/* Semi-transparent overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
          zIndex: 999, // Ensure the overlay is on top of other content
        }}
        onClick={handleCloseModal} // Close modal if user clicks outside the modal content
      ></div>
      {/* Modal content */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#eedcb3', // Set modal background color to eedcb3
          padding: '20px',
          borderRadius: '5px',
          maxWidth: '800px', // Adjusted maxWidth
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          zIndex: 1000, // Ensure the modal appears on top of the overlay
        }}
      >
        <div style={{ flex: 1 }}>
          <button
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              fontSize: '20px',
              color: '#333',
            }}
            onClick={handleCloseModal}
          >
            &#10006;
          </button>
          {/* Display the image */}
          
          <Image src={card.image_uris.large} alt={card.name} style={{ maxWidth: '100%' }} />
        </div>
        <div style={{ flex: 1, marginLeft: '20px' }}>
          <h2>{card.name}</h2>
          <hr></hr>
          <p>{card.mana_cost}</p>
          <hr></hr>
          <p>{card.type_line}</p>
          <hr></hr>
          <p>{card.oracle_text}</p>
          <hr></hr>
          <p>Illustrated by {card.artist}</p>
          <hr></hr>
          <h3>Legalities:</h3>
          <div style={{ display: 'flex'}}>
            {/* First column */}
            <div style={{ flex: 1 }}>
              {firstSevenLegalities.map(([format, legality]) => (
                <p key={format}>
                  <span>{format}:</span>{' '}
                  <span style={{ color: legality === 'legal' ? 'green' : 'red'}}>{legality}</span>
                </p>
              ))}
            </div>
            {/* Second column */}
            <div style={{ flex: 1 }}>
              {secondSevenLegalities.map(([format, legality]) => (
                <p key={format}>
                  <span>{format}:</span>{' '}
                  <span style={{ color: legality === 'legal' ? 'green' : 'red' }}>{legality}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardModal;
