import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../components/Footer';
import '../style/perfil.css';

function Perfil({ history }) {
  const emailUser = JSON.parse(localStorage.getItem('user'));

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <main
      className="perfil-content"
    >
      <header className="header-profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profileIcon"
          className="float-start ml-3 mt-3"
        />
        <h2
          className="title-pro text-center mt-3 mr-5"
          data-testid="page-title"
        >
          Perfil
        </h2>
      </header>
      <h4
        data-testid="profile-email"
        className="title-profile"
      >
        { emailUser ? emailUser.email : '' }
      </h4>
      <div className="buttons-profile">
        <button
          className="btn-entrar btn-block btn-lg mx-auto"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          className="btn-entrar btn-block btn-lg mx-auto"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>

        <button
          className="btn-entrar btn-block btn-lg mx-auto"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
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
