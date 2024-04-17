import React from 'react';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleAdvancedSearch,
  showAdvancedSearch,
  advancedSearch,
  setAdvancedSearch,
}) {
  
  // Add console.log to log the advancedSearch state whenever it changes
  React.useEffect(() => {
    console.log('Advanced Search State:', advancedSearch);
  }, [advancedSearch]);

  
  const handleSearchWithErrorHandling = async () => {
    try {
      await handleSearch();
    } catch (error) {
      setSearchQuery(''); // Clear search query
      alert(`An error occurred: ${error.message}`); // Display error message
      window.location.reload(); // Refresh the page
    }
  };

  return (
    <div className="search-bar-container" style={{ width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="search-input-container" style={{ width: '70%' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by card name..."
          className="search-input"
          style={{ width: '100%', borderRadius: '10px', marginBottom: '10px' }}
        />
        <button onClick={handleSearchWithErrorHandling} className="search-button" style={{ borderRadius: '10px', width: '100%' }}>
          Search
        </button>
      </div>
      <button onClick={handleAdvancedSearch} className="advanced-search-button" style={{ borderRadius: '10px', marginTop: '10px' }}>
        {showAdvancedSearch ? 'Hide Advanced Search' : 'Show Advanced Search'}
      </button>
      {showAdvancedSearch && (
        <div className="advanced-search-container" style={{ width: '70%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', borderRadius: '10px', padding: '10px', marginTop: '20px' }}>
          <div>
            <label htmlFor="cmc" className="advanced-search-label">Enter CMC: </label>
            <input
              type="text"
              id="cmc"
              value={advancedSearch.cmc}
              onChange={(e) => setAdvancedSearch({ ...advancedSearch, cmc: e.target.value })}
              placeholder="Converted Mana Cost (CMC)..."
              className="advanced-input"
              style={{ borderRadius: '5px', width: '100%' }}
            />
          </div>
          <div>
            <label htmlFor="type" className="advanced-search-label">Enter Card Type: </label>
            <input
              type="text"
              id="type"
              value={advancedSearch.type}
              onChange={(e) => setAdvancedSearch({ ...advancedSearch, type: e.target.value })}
              placeholder="Card type..."
              className="advanced-input"
              style={{ borderRadius: '5px', width: '100%' }}
            />
          </div>
          <div>
            <label htmlFor="text" className="advanced-search-label">Enter card Oracle Text:</label>
            <input
              type="text"
              id="text"
              value={advancedSearch.text}
              onChange={(e) => setAdvancedSearch({ ...advancedSearch, text: e.target.value })}
              placeholder="Text to search in card rules..."
              className="advanced-input"
              style={{ borderRadius: '5px', width: '100%' }}
            />
          </div>
          <div>
            <label htmlFor="commanderColor" className="advanced-search-label">Select Commander Color: </label>
            <select
              id="commanderColor"
              value={advancedSearch.commanderColor}
              onChange={(e) => setAdvancedSearch({ ...advancedSearch, commanderColor: e.target.value })}
              className="advanced-select"
              style={{ borderRadius: '5px', width: '100%' }}
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
        </div>
      )}
    </div>
  );
}
