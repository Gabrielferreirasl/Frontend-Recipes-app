import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';

function Perfil({ history }) {
  const emailUser = JSON.parse(localStorage.getItem('user'));

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <main>
      <header>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
        <h2 data-testid="page-title">Perfil</h2>
      </header>
      <div>
        <h3 data-testid="profile-email">{ emailUser.email }</h3>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>

        <button type="button" data-testid="profile-logout-btn" onClick={ handleClick }>
          Sair
        </button>
      </div>
      <Footer />
    </main>
  );
}

Perfil.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Perfil;
