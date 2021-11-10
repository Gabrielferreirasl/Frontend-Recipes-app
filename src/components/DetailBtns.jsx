import React from 'react';
import { useHistory } from 'react-router';

function DetailsBtns() {
  const history = useHistory();

  const id = history.location.pathname.split('/')[2];
  const recipeType = history.location.pathname.split('/')[1]
    .includes('comidas') ? 'meals' : 'cocktails';

  const verifyRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    return doneRecipes
      ? !doneRecipes.some((rec) => rec.id === id)
      : true;
  };

  const verifyProgress = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    return inProgressRecipes
      ? Object.keys(inProgressRecipes[recipeType]).some((recipeKey) => recipeKey === id)
      : false;
  };

  return (
    <div>
      { verifyRecipe() && (verifyProgress() ? (
        <button
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          type="button"
        >
          Continuar Receita
        </button>
      ) : (
        <button
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`${history.location.pathname}/in-progress`) }
        >
          Iniciar Receita
        </button>
      ))}
    </div>
  );
}

export default DetailsBtns;
