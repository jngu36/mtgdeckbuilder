import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import CardModal from './components/CardModal';

const Home = () => {
  const [randomCards, setRandomCards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetchRandomCards();
  }, []);

  const fetchRandomCards = async () => {
    try {
      const response = await axios.get('https://api.scryfall.com/cards/random', {
        params: {
          format: 'json',
          // Add any other parameters you want to include here
        },
      });
      // Append the new card to the existing randomCards array
      setRandomCards(prevCards => [...prevCards, response.data]);
    } catch (error) {
      console.error('Error fetching random cards:', error);
    }
  };

  const openModal = (card) => {
    setSelectedCard(card);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setModalOpen(false);
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>WELCOME TO OUR DECK BUILDING SITE</h1>
      <p>
        Magic: The Gathering (MTG) is a collectible card game created by mathematics professor Richard Garfield and
        introduced in 1993 by Wizards of the Coast. Players use decks of cards representing magical spells, creatures,
        and artifacts to defeat their opponents. The game can be played by two or more players, each using a customized
        deck of cards.
      </p>
      {/* Conditionally render the link based on whether the user is logged in */}
      {typeof window !== 'undefined' && localStorage.getItem('token') ? (
        <Link href="/deckbuild">
          <button style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}>Create Deck!</button>
        </Link>
      ) : (
        <Link href="/login">
          <button style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}>Create Deck!</button>
        </Link>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}>
        {randomCards.map((card, index) => (
          <div key={index} style={{ margin: '0 10px', cursor: 'pointer' }} onClick={() => openModal(card)}>
            <img src={card.image_uris.normal} alt={card.name} style={{ width: '200px', marginBottom: '10px' }} />
          </div>
        ))}
      </div>
      <CardModal isOpen={modalOpen} closeModal={closeModal} card={selectedCard} />
    </div>
  );
};

export default Home;
