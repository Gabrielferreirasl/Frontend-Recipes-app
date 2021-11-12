import React, { useEffect, useState } from 'react';
import CardToFavoriteOrDone from '../components/CardToFavoriteOrDone';
import { getLocalStorage } from '../helpers';
import profileIcon from '../images/profileIcon.svg';

function ReceitasFeitas() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    setDoneRecipes(getLocalStorage('doneRecipes'));
  }, []);

  return (
    <main>
      <header>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
        <h2 data-testid="page-title">Receitas Feitas</h2>
      </header>
      <span>
        <button type="button" data-testid="filter-by-all-btn">
          All
        </button>
        <button type="button" data-testid="filter-by-food-btn">
          Food
        </button>
        <button type="button" data-testid="filter-by-drink-btn">
          Drinks
        </button>
      </span>
      <div>
        { doneRecipes && doneRecipes.map((recipe, index) => (
          <CardToFavoriteOrDone
            key={ recipe.id }
            item={ recipe }
            index={ index }
            favoriteOrDone="done"
          />

        )) }
      </div>
    </main>
  );
}

export default ReceitasFeitas;
