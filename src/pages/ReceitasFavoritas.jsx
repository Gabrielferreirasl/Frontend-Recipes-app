import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { favoriteOrDisfavorite, getLocalStorage, updateRecipes } from '../helpers';
import FiltersByType from '../components/FiltersByType';
import CardToFavoriteOrDone from '../components/CardToFavoriteOrDone';
import profileIcon from '../images/profileIcon.svg';
import '../style/doneAndFavorite.css';

function ReceitasFavoritas() {
  const [recipesFavorited, setRecipesFavorited] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
  });

  useEffect(() => {
    updateRecipes('favoriteRecipes', filters.type, setRecipesFavorited);
  }, [filters.type]);

  const removeFavorite = (id) => {
    favoriteOrDisfavorite(recipesFavorited, id);
    setRecipesFavorited(getLocalStorage('favoriteRecipes'));
  };

  return (
    <main>
      <header>
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
        </Link>
        <h2 data-testid="page-title">Receitas Favoritas</h2>
      </header>
      <nav>
        <FiltersByType filters={ filters } setState={ setFilters } />
        { recipesFavorited.length > 0
         && recipesFavorited.map((recipe, index) => (
           <CardToFavoriteOrDone
             key={ recipe.id }
             item={ recipe }
             index={ index }
             favoriteOrMade="favorite"
             removeFavorite={ removeFavorite }
           />
         ))}
      </nav>
    </main>
  );
}

export default ReceitasFavoritas;
