import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardToFavoriteOrDone from '../components/CardToFavoriteOrDone';
import FiltersByType from '../components/FiltersByType';
import { updateRecipes } from '../helpers';
import profileIcon from '../images/profileIcon.svg';
import '../style/doneAndFavorite.css';

function ReceitasFeitas() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
  });

  useEffect(() => {
    updateRecipes('doneRecipes', filters.type, setDoneRecipes);
  }, [filters.type]);

  return (
    <main className="main-done">
      <header className="container-nosearch">
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
        </Link>
        <div className="container-title-header">
          <h2 data-testid="page-title">Receitas Feitas</h2>
        </div>
      </header>
      <span>
        <FiltersByType filters={ filters } setState={ setFilters } />
      </span>
      <div>
        { doneRecipes && doneRecipes.map((recipe, index) => (
          <CardToFavoriteOrDone
            key={ recipe.id }
            item={ recipe }
            index={ index }
            favoriteOrMade="done"
          />

        )) }
      </div>
    </main>
  );
}

export default ReceitasFeitas;
