import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { recipesApiList } from '../services/recipesAPI';
import CardsRecipes from './CardsRecipes';
import RecipesContext from '../context/RecipesContext';

function RenderRecipes({ items }) {
  const history = useHistory();
  const key = history.location.pathname.includes('/bebidas') ? 'drinks' : 'meals';
  const {
    setArrayRecipes,
    recipes,
  } = useContext(RecipesContext);

  useEffect(() => {
    const updateRecipes = async () => {
      const result = await recipesApiList(history.location.pathname);
      setArrayRecipes({
        drinks: [],
        meals: [],
        [key]: result[key],
      });
    };
    if (recipes[key].length === 0) {
      updateRecipes();
    }
  },
  [history.location.pathname, key, recipes, setArrayRecipes]);

  return (
    <div>
      <main>
        {
          items.length !== 0 && <CardsRecipes maxItems={ 12 } items={ items } />
        }
      </main>
    </div>
  );
}

RenderRecipes.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RenderRecipes;
