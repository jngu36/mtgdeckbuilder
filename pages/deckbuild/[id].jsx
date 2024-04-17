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

  const [list, setList] = useState([]);
  const [deckName, setDeckName] = useState("");

  const [img, setImg] = useState("");

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
    if (name) {
      getDeck();
    }
  }, [name, id]);

  useEffect(() => {

  }, []);

  const getDeck = async () => {
    try {
      const res = await fetch('/api/getDeck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, id: id }),
      }).then((res) => res.json())
        .then((data) => {
          if (data.deck) {
            setDeckName(data.deck.name);
            let arr = [];
            data.deck.cards.forEach((element, index) => {
              arr.push({ key: index, name: element.name, img_small: element.img_small, img_normal: element.img_normal });
            })

            setList(arr);
          }
        });

    } catch (error) {
      console.log("error: ", error);
    }
  }

  const saveDeck = async () => {
    try {
      await fetch('/api/updateDeck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, cards: list }),
      });

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

  const pop_from_list = (index) => {
    let arr = list;
    arr.splice(index, 1);
    setList(arr);
    console.log(list);
  }

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Papyrus', padding: '20px', color: '#941221', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Hello {name}! Welcome To The Card Search</h1>
      <h2>Use the search bar to search for any MTG Cards!</h2>

      <hr />
      <hr />

      <div className="container" style={{ marginTop: "150x" }}>

        {/* LEFT SIDE IMAGE PREVIEW */}
        <div className='row'>
          <div className='col-sm'>
            <img src={img} alt="Preview" style={{ width: "410px" }} />
          </div>

          {/* MIDDLE LIST */}
          <div className='col-sm'>
            <p style={{ color: "blue" }}>{deckName}</p>
            
            <div style={{ border: "2px solid red" }}>
              {
                list ?
                  list.map((card, index) => (
                    <div key={index} className='row'>
                      <div className='col' style={{textAlign: "left"}}>
                        <p onMouseEnter={() => setImg(card.img_normal)} onMouseLeave={() => setImg("")}>{card.name}</p>
                      </div>
                      <div className='col-md-auto'>
                        <button onClick={() => pop_from_list(index)}>-</button>
                      </div>
                    </div>
                  )) : <p>Empty!</p>
              }
            </div>
            <button onClick={saveDeck} className="btn btn-primary">save</button>
          </div>

          {/* RIGHT SIDE SEARCH */}
          <div className='col-sm'>

            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              handleAdvancedSearch={handleAdvancedSearch}
              showAdvancedSearch={showAdvancedSearch}
              advancedSearch={advancedSearch}
              setAdvancedSearch={setAdvancedSearch}
            />

            <div style={{ width: '90%', backgroundColor: '#941221', padding: '10px', margin: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {searchResults.length === 0 ? (
                <p style={{ color: '#eedcb3' }}>{searchStatus}</p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {searchResults.map((card) => (
                    <button style={{ background: "transparent", border: "0px" }} onClick={() => {
                      let obj = { name: card.name, img_small: card.image_uris.normal, img_normal: card.image_uris.normal, img_small: card.image_uris.large }
                      setList([...list, obj]);
                    }}>
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
