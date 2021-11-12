import React, { useEffect, useState } from 'react';
import CardToFavoriteOrDone from '../components/CardToFavoriteOrDone';
import FiltersByType from '../components/FiltersByType';
import { updateRecipes } from '../helpers';
import profileIcon from '../images/profileIcon.svg';

function ReceitasFeitas() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
  });

  useEffect(() => {
    updateRecipes('doneRecipes', filters.type, setDoneRecipes);
  }, [filters.type]);

  return (
    <main>
      <header>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
        <h2 data-testid="page-title">Receitas Feitas</h2>
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
