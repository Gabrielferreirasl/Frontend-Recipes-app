import React, { useEffect, useState } from 'react';
import { favoriteOrDisfavorite, getLocalStorage } from '../helpers';
import FiltersByType from '../components/FiltersByType';
import CardToFavoriteOrDone from '../components/CardToFavoriteOrDone';

function ReceitasFavoritas() {
  const [recipesFavorited, setRecipesFavorited] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
  });

  useEffect(() => {
    if (getLocalStorage('favoriteRecipes')) {
      const listFavoriteRecipes = getLocalStorage('favoriteRecipes');
      if (filters.type !== 'all') {
        const recipesFiltred = listFavoriteRecipes.filter((recipe) => recipe.type === filters.type);
        console.log(recipesFiltred);
        return setRecipesFavorited(recipesFiltred);
      }
      setRecipesFavorited(listFavoriteRecipes);
      console.log('oi');
    }
  }, [filters.type, filters.typeToFilter]);

  const removeFavorite = (id) => {
    favoriteOrDisfavorite(recipesFavorited, id);
    setRecipesFavorited(getLocalStorage('favoriteRecipes'));
  };

  return (
    <main>
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
