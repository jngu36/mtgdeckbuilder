import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import CardModal from '../components/CardModal';
import SearchBar from '../components/SearchBar';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(5); // Number of results per page

  const [list, setList] = useState([]);
  const [deckName, setDeckName] = useState("");

  const [img, setImg] = useState("");
  const [desc, setDesc] = useState("");


  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
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
            setDesc(data.deck.description);
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
      const res = await fetch('/api/updateDeck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, cards: list, name: deckName, description: desc }),
      })

      const data = await res.json();
      toast(data.message);

    } catch (error) {
      console.log("error: ", error);
    }
  }

  const handleSearch = async () => {
    try {
      setSearchResults([]);
      setSearchStatus('Loading...');
      const offset = (currentPage - 1) * pageSize;
      let query = `q=${searchQuery}&format=json&include_extras=false&include_multilingual=false&order=name&page=${currentPage}&unique=cards`;

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

      const response = await axios.get(`https://api.scryfall.com/cards/search?${query}`);
      const allResults = response.data.data; // Store all search results
      setSearchResults(allResults); // Store all search results
      setTotalPages(Math.ceil(allResults.length / pageSize)); // Update totalPages state
      setSearchStatus(allResults.length === 0 ? 'No card matches' : '');

      // Clear search query after search
      setSearchQuery('');
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
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
    let arr = [...list];
    arr.splice(index, 1);
    setList(arr);
    console.log(list);
  }

  const notify = () => toast('Here is your toast.');

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Papyrus', padding: '20px', color: '#941221', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Hello {name}! Welcome To The Card Search</h1>
      <h2>Use the search bar to search for any MTG Cards!</h2>

      <hr />
      <hr />

      <div className="container" style={{ marginTop: "150px" }}>

        {/* LEFT SIDE IMAGE PREVIEW */}
        <div className='row'>
          <div className='col-sm'>
            <img src={img} alt="Preview" style={{ width: "410px" }} />
          </div>

          {/* MIDDLE LIST */}
          <div className='col-sm'>

            <label htmlFor="deck_name">Deck Name: </label>
            <input id="deck_name" style={{ color: "blue" }} value={deckName} onChange={(e) => { setDeckName(e.target.value) }} />

            <br />

            <label htmlFor="deck_desc">Description: </label>
            <input id="deck_desc" style={{ color: "blue" }} value={desc} onChange={(e) => { setDesc(e.target.value) }} />

            <br />
            <div style={{ border: "2px solid red" }}>
              {
                list ?
                  list.map((card, index) => (
                    <div key={index} className='row'>
                      <div className='col' style={{ textAlign: "left" }}>
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
            <Toaster />

          </div>

          {/* RIGHT SIDE SEARCH */}
          <div className='col-sm'>

            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />
            <div style={{ textAlign: 'center', marginLeft:'100px'}}>
              {totalPages > 1 && (
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                  </li>
                  <li className="page-item">
                    <span className="page-link">{currentPage} of {totalPages}</span>
                  </li>
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                  </li>
                </ul>
              )}
            </div>



            <div style={{ width: '90%', backgroundColor: '#941221', padding: '10px', margin: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {searchResults.length === 0 ? (
                <p style={{ color: '#eedcb3' }}>{searchStatus}</p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {searchResults.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((card) => (
                    <button onMouseEnter={() => setImg(card.image_uris.normal)} onMouseLeave={() => setImg("")} style={{ background: "transparent", border: "0px" }} key={card.id} onClick={() => {
                      let obj = { name: card.name, img_small: card.image_uris.normal, img_normal: card.image_uris.normal, img_small: card.image_uris.large }
                      setList([...list, obj]);
                    }}>
                      <img
                        src={card.image_uris.normal}
                        alt={card.name}
                        style={{ width: '150px', margin: '10px', cursor: 'pointer', border: '2px solid #D05766' }}
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
