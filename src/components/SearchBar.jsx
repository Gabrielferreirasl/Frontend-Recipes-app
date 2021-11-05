import React, { useState } from 'react';

function SearchBar() {
  const [searchInfo, setSearchInfo] = useState({
    search: '',
    type: '',
  });

  const handleChange = ({ target: { value, name } }) => {
    setSearchInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <input
        onChange={ (ev) => handleChange(ev) }
        placeholder="Buscar Receita"
        value={ searchInfo.search }
        type="text"
        name="search"
        data-testid="search-input"
      />
    </div>
  );
}

export default SearchBar;
