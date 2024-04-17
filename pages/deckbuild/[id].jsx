import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import CardModal from '../components/CardModal';
import SearchBar from '../components/SearchBar';
import { useRouter } from 'next/router';

export default function Home() {
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Clear default text
  const [searchResults, setSearchResults] = useState([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState({
    cmc: '',
    type: '',
    text: '',
    commanderColor: ''
  });
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchStatus, setSearchStatus] = useState('Enter a search input');

  const [list, setList] = useState("");

  const [deck, setDeck] = useState("");

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {

    // Set background color to brown parchment-like color
    document.body.style.backgroundColor = '#eedcb3';

    const token = localStorage.getItem('token');
    if (token) {
      setName(jwt.decode(token).user.username);
    }

  }, []);

  useEffect(() => {
    getDeck();
  }, [name]);


  const getDeck = async () => {
    try {
      const res = await fetch('/api/getDeck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, id: id }),
      });

      const data = await res.json();

      if (res.ok) {
        setDeck(data.deck);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }


  const handleSearch = async () => {
    try {
      setSearchResults([]);
      setSearchStatus('No card matches');
      let query = `q=${searchQuery}`;
      // Add advanced search parameters to the query string
      if (advancedSearch.cmc !== '') {
        query += `+cmc%3D${advancedSearch.cmc}`;
      }
      if (advancedSearch.type !== '') {
        query += `+type%3A${advancedSearch.type}`;
      }
      if (advancedSearch.text !== '') {
        query += `+o%3A"${advancedSearch.text}"`;
      }
      if (advancedSearch.commanderColor !== '') {
        query += `+commander%3A${advancedSearch.commanderColor}`;
      }
      const response = await axios.get(`https://api.scryfall.com/cards/search?${query}&format=json`);
      setSearchResults(response.data.data);
      setSearchStatus(response.data.data.length === 0 ? 'No card matches' : '');
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
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
    <div style={{ textAlign: 'center', fontFamily: 'Papyrus', padding: '20px', color: '#941221', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Hello {name}! Welcome To The Card Search</h1>
      <h2>Use the search bar to search for any MTG Cards!</h2>


      <div className="container" style={{ marginTop: "150x" }}>
        <div className='row'>

          {/* LEFT SIDE LIST */}
          <div className='col'>
            <p style={{ color: "blue" }}>{deck.name}</p>
            <div style={{ border: "1px" }}>
              <button className="btn btn-primary">save</button>
              {
                deck ?
                  deck.cards.map((card) => (
                    <p>{card.name}</p>
                  )) : <p>Empty!</p>
              }
            </div>
          </div>

          {/* RIGHT SIDE SEARCH */}
          <div className='col'>

            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              handleAdvancedSearch={handleAdvancedSearch}
              showAdvancedSearch={showAdvancedSearch}
              advancedSearch={advancedSearch}
              setAdvancedSearch={setAdvancedSearch}
            />

            <div style={{ width: '70%', backgroundColor: '#941221', padding: '10px', margin: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {searchResults.length === 0 ? (
                <p style={{ color: '#eedcb3' }}>{searchStatus}</p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {searchResults.map((card) => (
                    <button style={{background: "transparent", border: "0px"}} onClick={()=>{console.log("lmao get", card.name)}}>
                      <img
                        key={card.id}
                        src={card.image_uris.normal}
                        alt={card.name}
                        style={{ width: '150px', margin: '10px', cursor: 'pointer', border: '2px solid #D05766' }}
                        //onClick={() => openModal(card)}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <CardModal isOpen={modalOpen} closeModal={closeModal} card={selectedCard} />
          </div>
        </div>
      </div>

    </div>
  );
}
