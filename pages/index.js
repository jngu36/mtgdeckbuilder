import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import CardModal from './components/CardModal';

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setName(jwt.decode(token).user.username);
    }
  }, []);

  const handleSearch = async () => {
    try {
      setSearchResults([]);
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
    <div style={{ textAlign: 'center' }}>
      <p>Hello {name}</p>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter card name..."
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleAdvancedSearch}>Advanced Search</button>
      </div>
      {showAdvancedSearch && (
        <div>
          <input
            type="text"
            value={advancedSearch.cmc}
            onChange={(e) => setAdvancedSearch({ ...advancedSearch, cmc: e.target.value })}
            placeholder="Enter Converted Mana Cost (CMC)..."
          />
          <input
            type="text"
            value={advancedSearch.type}
            onChange={(e) => setAdvancedSearch({ ...advancedSearch, type: e.target.value })}
            placeholder="Enter card type..."
          />
          <input
            type="text"
            value={advancedSearch.text}
            onChange={(e) => setAdvancedSearch({ ...advancedSearch, text: e.target.value })}
            placeholder="Enter text to search in card rules..."
          />
          <select
            value={advancedSearch.commanderColor}
            onChange={(e) => setAdvancedSearch({ ...advancedSearch, commanderColor: e.target.value })}
          >
            <option value="">Select Commander Color</option>
            <option value="W">White</option>
            <option value="U">Blue</option>
            <option value="B">Black</option>
            <option value="R">Red</option>
            <option value="G">Green</option>
            <option value="WU">Azorius</option>
            <option value="UB">Dimir</option>
            <option value="BR">Rakdos</option>
            <option value="RG">Gruul</option>
            <option value="WG">Selesnya</option>
            <option value="WB">Orzhov</option>
            <option value="UR">Izzet</option>
            <option value="BG">Golgari</option>
            <option value="RW">Boros</option>
            <option value="GU">Simic</option>
            <option value="WUB">Esper</option>
            <option value="UBR">Grixis</option>
            <option value="BRG">Jund</option>
            <option value="RGW">Naya</option>
            <option value="GWU">Bant</option>
            <option value="WBR">Mardu</option>
            <option value="URG">Temur</option>
            <option value="BGW">Abzan</option>
            <option value="RGU">Jeskai</option>
            <option value="WUBRG">Five-color</option>
          </select>
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {searchResults.map((card) => (
          <img
            key={card.id}
            src={card.image_uris.normal}
            alt={card.name}
            style={{ width: '150px', margin: '10px', cursor: 'pointer' }}
            onClick={() => openModal(card)}
          />
        ))}
      </div>
      <CardModal isOpen={modalOpen} closeModal={closeModal} card={selectedCard} />
    </div>
  );
}
