import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import CardModal from './components/CardModal';
import jwt from 'jsonwebtoken';
import DeckInfoCard from './components/DeckInfoCard';

const Home = () => {
  const [randomLegendaryCards, setRandomLegendaryCards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [fetchCount, setFetchCount] = useState(0); // Keep track of the number of API calls

  //user decks
  const [username, setUser] = useState("");
  const [decks, setDecks] = useState([]);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tok = localStorage.getItem('token');

    if (tok) {
      setToken(tok);
      setUser(jwt.decode(tok).user.username);
      setMessage("Hello " + jwt.decode(tok).user.username); 
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [username]);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/getAllDeck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username }),
      });

      const data = await res.json();

      if (res.ok) {
        setDecks(data.decks);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  //Abdul stuff

  useEffect(() => {
    if (fetchCount < 4) { // Fetch only if the count is less than 4
      fetchRandomLegendaryCards();
    }
  }, [fetchCount]); // Trigger effect when fetchCount changes

  const fetchRandomLegendaryCards = async () => {
    try {
      const response = await axios.get('https://api.scryfall.com/cards/random?q=type%3ALegendary');
      setRandomLegendaryCards(prevCards => [...prevCards, response.data]);
      setFetchCount(prevCount => prevCount + 1); // Increment fetch count
    } catch (error) {
      console.error('Error fetching random legendary cards:', error);
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
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px', backgroundImage: 'url(https://i.pinimg.com/originals/3a/4e/88/3a4e882d1727232c5fece07bd59056bf.jpg)', backgroundSize: 'cover' }}>
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', padding: '20px', marginTop: '40px', color: '#eedcb3' }}>
        <h1>WELCOME TO OUR DECK BUILDING SITE</h1>
        <p>
          Magic: The Gathering (MTG) is a collectible card game created by mathematics professor Richard Garfield and
          introduced in 1993 by Wizards of the Coast. Players use decks of cards representing magical spells, creatures,
          and artifacts to defeat their opponents. The game can be played by two or more players, each using a customized
          deck of cards.
        </p>
      </div>
      <br></br>
      <h1 style={{backgroundColor: "red"}}>{message}</h1>
      <br></br>
      {/* Conditionally render the link based on whether the user is logged in */}
      {typeof window !== 'undefined' && localStorage.getItem('token') ? (
        <Link href="/deckbuild">
          <button className="btn btn-warning" style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}>Create Deck!</button>
        </Link>
      ) : (
        <Link href="/login">
          <br></br>
          <button style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px', backgroundColor: '#eedcb3', color: '#941221' }}>Create Deck!</button>
        </Link>
      )}


      <div className='container'>
        <div className='row'>
          {decks.map((deck) => (
            <DeckInfoCard name={deck.name} desc={deck.description} id={deck.id} />
          ))}
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', marginTop: '40px' }}>
        <h2 style={{ color: '#eedcb3', marginBottom: '20px' }}>Check out these Cards and let them inspire YOU!!</h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {randomLegendaryCards.map((card, index) => (
            <div key={index} style={{ margin: '0 10px', cursor: 'pointer' }} onClick={() => openModal(card)}>
              {card.image_uris && card.image_uris.normal && (
                <img src={card.image_uris.normal} alt={card.name} style={{ width: '200px', marginBottom: '10px' }} />
              )}
            </div>
          ))}
        </div>
      </div>
      <CardModal isOpen={modalOpen} closeModal={closeModal} card={selectedCard} />
    </div>
  );
};

export default Home;
