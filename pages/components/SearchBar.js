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
    <div className="search-bar-container" style={{ width: '70%', margin: '0 auto' }}>
      <div className="search-input-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by card name..."
          className="search-input"
          style={{ width: '70%', borderRadius: '10px' }}
        />
        <button onClick={handleSearchWithErrorHandling} className="search-button" style={{ borderRadius: '10px' }}>
          Search
        </button>
      </div>
      <button onClick={handleAdvancedSearch} className="advanced-search-button" style={{ borderRadius: '10px' }}>
        {showAdvancedSearch ? 'Hide Advanced Search' : 'Show Advanced Search'}
      </button>
      {showAdvancedSearch && (
        <div className="advanced-search-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', borderRadius: '10px', padding: '10px' }}>
          <div className="advanced-search-col">
            <label htmlFor="cmc" className="advanced-search-label">Enter CMC (Converted Mana Cost): </label>
            <input
              type="text"
              id="cmc"
              value={advancedSearch.cmc}
              onChange={(e) => setAdvancedSearch({ ...advancedSearch, cmc: e.target.value })}
              placeholder="Converted Mana Cost (CMC)..."
              className="advanced-input"
              style={{ borderRadius: '5px' }}
            />
          </div>
          <div className="advanced-search-col">
            <label htmlFor="type" className="advanced-search-label">Enter Card Type: </label>
            <input
              type="text"
              id="type"
              value={advancedSearch.type}
              onChange={(e) => setAdvancedSearch({ ...advancedSearch, type: e.target.value })}
              placeholder="Card type..."
              className="advanced-input"
              style={{ borderRadius: '5px' }}
            />
          </div>
          <div className="advanced-search-col">
            <label htmlFor="text" className="advanced-search-label">Enter card Oracle Text:</label>
            <input
              type="text"
              id="text"
              value={advancedSearch.text}
              onChange={(e) => setAdvancedSearch({ ...advancedSearch, text: e.target.value })}
              placeholder="Text to search in card rules..."
              className="advanced-input"
              style={{ borderRadius: '5px' }}
            />
          </div>
          <div className="advanced-search-col">
            <label htmlFor="commanderColor" className="advanced-search-label">Select Commander Color: </label>
            <select
              id="commanderColor"
              value={advancedSearch.commanderColor}
              onChange={(e) => setAdvancedSearch({ ...advancedSearch, commanderColor: e.target.value })}
              className="advanced-select"
              style={{ borderRadius: '5px' }}
            >
              <option value="">Select Commander Color</option>
              <option value="W">White</option>
              <option value="U">Blue</option>
              {/* Add other options */}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
