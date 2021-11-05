import React from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function RecipesProvider({ children }) {
  return (
    <RecipesContext.Provider value={ null }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
