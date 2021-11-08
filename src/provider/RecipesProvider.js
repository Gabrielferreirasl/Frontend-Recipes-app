import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function RecipesProvider({ children }) {
  const [recipes, setArrayRecipes] = useState({
    drinks: [],
    meals: [],
  });

  const changeRecipes = (key, value = null) => {
    setArrayRecipes((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <RecipesContext.Provider value={ { changeRecipes, recipes } }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
