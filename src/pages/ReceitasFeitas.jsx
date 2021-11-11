import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function ReceitasFeitas() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(getRecipes);
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
          <div key={ index }>
            <Link
              to={ recipe.type === 'comida'
                ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}` }
            >
              <img
                src={ recipe.image }
                alt="recipe"
                data-testid={ `${index}-horizontal-image` }
              />
              <h3 data-testid={ `${index}-horizontal-name` }>Nome da receita</h3>
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>Categoria da receita</p>
            <p data-testid={ `${index}-horizontal-done-date` }>Data em que foi feita</p>
            <p data-testid={ `${index}-${recipe.tag}-horizontal-tag` }>Tags da receita</p>
            <img src={ shareIcon } alt="shareIcon" data-testid={ `${index}-horizontal-share-btn` } />
          </div>

        )) }
      </div>
    </main>
  );
}

export default ReceitasFeitas;
