import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../style/explorar.css';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';

function Explorar() {
  const history = useHistory();

  return (
    <main>
      <header className="container-nosearch">
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
        </Link>
        <h2 data-testid="page-title">Explorar</h2>
      </header>
      <div className="container-explorar">
        <button
          onClick={ () => history.push('/explorar/comidas') }
          data-testid="explore-food"
          type="button"
        >
          Comidas
        </button>
        <button
          onClick={ () => history.push('/explorar/bebidas') }
          data-testid="explore-drinks"
          type="button"
        >
          Bebidas
        </button>
      </div>
      <Footer />
    </main>
  );
}

export default Explorar;
