import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ type }) {
  const [searchBar, setSearchBar] = useState(false);
  return (
    <nav>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
      </Link>
      <h2 data-testid="page-title">{type}</h2>
      <button type="button" onClick={ () => setSearchBar(!searchBar) }>
        <img data-testid="search-top-btn" src={ searchIcon } alt="searchIcon" />
      </button>
      {searchBar && <SearchBar />}
    </nav>
  );
}

Header.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Header;
