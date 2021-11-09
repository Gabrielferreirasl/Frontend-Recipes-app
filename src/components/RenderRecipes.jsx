import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { recipesApiList } from '../services/recipesAPI';
import CardsRecipes from './CardsRecipes';
import RecipesContext from '../context/RecipesContext';

function RenderRecipes({ items }) {
  const history = useHistory();
  const { setArrayRecipes } = useContext(RecipesContext);

  useEffect(() => {
    const updateRecipes = async () => {
      const key = history.location.pathname.includes('/bebidas') ? 'drinks' : 'meals';
      const result = await recipesApiList(history.location.pathname);
      setArrayRecipes({
        drinks: [],
        meals: [],
        [key]: result[key],
      });
    };
    updateRecipes();
  }, [history.location.pathname, setArrayRecipes]);

  return (
    <div>
      {items.length !== 0 && <CardsRecipes maxItems={ 12 } items={ items } />}
    </div>
  );
}

RenderRecipes.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RenderRecipes;
