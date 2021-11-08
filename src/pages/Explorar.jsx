import React from 'react';
import profileIcon from '../images/profileIcon.svg';

function Explorar() {
  return (
    <div>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
      <h2 data-testid="page-title">Explorar</h2>
    </div>
  );
}

export default Explorar;
