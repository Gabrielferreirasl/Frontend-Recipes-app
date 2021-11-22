import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import '../style/explorar.css';
import iconRandom from '../images/icon-rando.png';
import profileIcon from '../images/profileIcon.svg';
import { getRandomRecipe } from '../services/recipesAPI';

function ExplorarComidasOuBedidas() {
  const history = useHistory();

  const type = history.location.pathname.includes('comidas') ? 'Comidas' : 'Bebidas';

  const handleExplore = async () => {
    const keyType = type === 'Bebidas' ? 'Drink' : 'Meal';
    const randomRecipe = await getRandomRecipe(type);
    const id = randomRecipe[0][`id${keyType}`];
    history.push(`/${keyType === 'Drink' ? 'bebidas' : 'comidas'}/${id}`);
  };

  return (
    <>
      <header>
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
        </Link>
        <h2 data-testid="page-title">{`Explorar ${type}`}</h2>
      </header>
      <main>
        <div className="container-btn-comidas-bebidas">
          <button
            className="btn-ingredientes"
            type="button"
            data-testid="explore-by-ingredient"
            onClick={ () => (history.push(
              `/explorar/${type === 'Bebidas' ? 'bebidas' : 'comidas'}/ingredientes`,
            )) }
          >
            Por Ingredientes
          </button>
          { type === 'Comidas'
           && (
             <button
               className="btn-local"
               type="button"
               data-testid="explore-by-area"
               onClick={ () => history.push('/explorar/comidas/area') }
             >
               Por Local de Origem
             </button>
           )}
        </div>
        <div className="container-btn-random">
          <button
            type="button"
            data-testid="explore-surprise"
            onClick={ () => handleExplore() }
          >
            <img src={ iconRandom } alt="icone aleatorio" />
            Me Surpreenda!
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ExplorarComidasOuBedidas;
