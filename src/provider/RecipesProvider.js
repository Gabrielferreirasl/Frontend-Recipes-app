import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function RecipesProvider({ children }) {
  const [recipes, setArrayRecipes] = useState({
    drinks: [],
    meals: [],
  });

  // const [recipeInfo, setRecipeInfo] = useState({
  //   typeKey: '',
  //   id: '',
  // });

  const [recipesFiltred, setRecipesFiltred] = useState({
    drinks: [],
    meals: [],
  });

  const [categoryRecipes, setCategoryRecipes] = useState({
    categoryDrinks: [],
    categoryMeals: [],
  });

  const [filters, setFilters] = useState({
    category: {
      status: false,
      filter: '',
    },
  });

  const changeRecipes = (key, value = null) => {
    setArrayRecipes((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <RecipesContext.Provider
      value={ {
        changeRecipes,
        recipes,
        setArrayRecipes,
        categoryRecipes,
        setCategoryRecipes,
        filters,
        setFilters,
        recipesFiltred,
        setRecipesFiltred,
      } }
    >
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
