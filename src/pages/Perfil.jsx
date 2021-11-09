import React from 'react';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';

function Perfil() {
  return (
    <main>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
      <h2 data-testid="page-title">Perfil</h2>
      <Footer />
    </main>
  );
}

export default Perfil;
