import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import DetailsHeader from '../components/DetailsHeader';
import { getRecipeById } from '../services/recipesAPI';

function InProgress() {
  const [recipe, setRecipe] = useState({});
  const [recipeSteps, setRecipeSteps] = useState(null);
  const location = useLocation();
  const history = useHistory();

  const keyObj = location.pathname.includes('bebidas') ? 'cocktails' : 'meals';
  const [,, id] = location.pathname.split('/');

  useEffect(() => {
    const getRecipe = async () => setRecipe(await getRecipeById(location));
    getRecipe();
  }, [keyObj, location]);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const stepKeys = Object.keys(recipe).filter((key) => (
      key.includes('strIngredient') && recipe[key] !== ''
       && recipe[key] !== null));
    const obj = {};
    stepKeys.map((step) => {
      obj[step] = inProgressRecipes
      && Object.keys(inProgressRecipes[keyObj]).some((i) => i === id)
        ? inProgressRecipes[keyObj][id].some((item) => item === step) : false;
      return step;
    });
    setRecipeSteps(obj);
  }, [id, keyObj, location.pathname, recipe]);

  const addOrRemoveProgress = (inProgressRecipes, stepName) => {
    if (Object.keys(inProgressRecipes[keyObj]).some((i) => i === id)) {
      if (inProgressRecipes[keyObj][id].some((step) => step === stepName)) {
        inProgressRecipes[keyObj][id] = inProgressRecipes[keyObj][id]
          .filter((p) => p !== stepName);
        return localStorage.setItem('inProgressRecipes',
          JSON.stringify(inProgressRecipes));
      }
      inProgressRecipes[keyObj][id] = [...inProgressRecipes[keyObj][id], stepName];
      return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
    inProgressRecipes[keyObj][id] = [stepName];
    return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  const checkProgress = (stepName) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const obj = { cocktails: {}, meals: {} };
    obj[keyObj] = { [id]: [stepName] };
    return inProgressRecipes ? addOrRemoveProgress(inProgressRecipes, stepName)
      : localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  };

  const updateStepsState = ({ target: { name } }) => {
    setRecipeSteps((prev) => ({ ...prev, [name]: !prev[name] }));
    checkProgress(name);
  };

  return (
    <main>
      {recipeSteps && (
        <>
          <DetailsHeader recipe={ recipe } />
          <div>
            <h3>Ingredients</h3>
            {Object.keys(recipeSteps).map((key, indice) => (
              <div key={ indice } data-testid={ `${indice}-ingredient-step` }>
                <label
                  htmlFor={ key }
                >
                  { `${recipe[key]} ${recipe[`strMeasure${indice + 1}`]}`}

                </label>
                <input
                  onChange={ (ev) => updateStepsState(ev) }
                  checked={ recipeSteps[key] }
                  type="checkbox"
                  name={ key }
                  id={ key }
                />
              </div>
            ))}
          </div>
          <div>
            <h3>Instructions</h3>
            <p data-testid="instructions">
              {recipe.strInstructions}
            </p>
          </div>
          <button
            disabled={ !Object.values(recipeSteps).every((bool) => bool) }
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ () => history.push('/receitas-feitas') }
          >
            Finalizar receita

          </button>
        </>
      )}
    </main>
  );
}

export default InProgress;
