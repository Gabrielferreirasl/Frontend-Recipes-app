import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const [searchBar, setSearchBar] = useState(false);
  return (
    <div>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
      </Link>
      <h2 data-testid="page-title">Comidas</h2>
      <button type="button" onClick={ () => setSearchBar(!searchBar) }>
        <img data-testid="search-top-btn" src={ searchIcon } alt="searchIcon" />
      </button>
      {searchBar && <SearchBar />}
    </div>
  );
}

export default Header;
