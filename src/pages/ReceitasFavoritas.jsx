import React, { useEffect, useState } from 'react';
import { getLocalStorage, saveFavorite } from '../helpers';
import FiltersByType from '../components/FiltersByType';

function ReceitasFavoritas() {
  const [recipesFavored, setRecipesFavored] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
  });

  useEffect(() => {
    setRecipesFavored(getLocalStorage('favoriteRecipes'));
    console.log('oi');
  }, []);

  return (
    <main>
      <nav>
        <FiltersByType filters={ filters } setState={ setFilters } />
        { recipesFavored.length > 0
        && recipesFavored.map((recipe, index) => (
          <p>{recipe.name}</p>
        ))}
      </nav>
    </main>
  );
}

export default ReceitasFavoritas;
