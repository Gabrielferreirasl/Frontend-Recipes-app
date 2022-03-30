import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.png';
import searchIcon from '../images/searchIcon.png';
import SearchBar from './SearchBar';

function Header({ type }) {
  const [searchBar, setSearchBar] = useState(false);
  return (
    <header className="container-header-search">
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
      </Link>
      <h2 data-testid="page-title">{type}</h2>
      <button
        data-testid="search-button"
        type="button"
        onClick={ () => setSearchBar(!searchBar) }
      >
        <img data-testid="search-top-btn" src={ searchIcon } alt="searchIcon" />
      </button>
      {searchBar && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Header;
