import React from 'react';
import profileIcon from '../images/profileIcon.svg';

function Perfil() {
  return (
    <div>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
      <h2 data-testid="page-title">Perfil</h2>
    </div>
  );
}

export default Perfil;
