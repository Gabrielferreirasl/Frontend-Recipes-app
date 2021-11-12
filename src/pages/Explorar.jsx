import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';

function Explorar() {
  return (
    <main>
      <header>
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
          <h2 data-testid="page-title">Explorar</h2>
        </Link>
      </header>
      <Footer />
    </main>
  );
}

export default Explorar;
