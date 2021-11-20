import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import DetailsHeader from '../components/DetailsHeader';
import { checkProgress, finishRecipe } from '../helpers';
import { getRecipeById } from '../services/recipesAPI';
import '../style/Progress.css';

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

  const updateStepsState = ({ target: { name } }) => {
    setRecipeSteps((prev) => ({ ...prev, [name]: !prev[name] }));
    checkProgress(name, keyObj, id);
  };

  return (
    <main>
      {recipeSteps && (
        <>
          <DetailsHeader recipe={ recipe } />
          <div className="ingredients">
            <h3>Ingredients</h3>
            {Object.keys(recipeSteps).map((key, indice) => (
              <div key={ indice } data-testid={ `${indice}-ingredient-step` }>
                <input
                  className="checkbox form-check-input"
                  onChange={ (ev) => updateStepsState(ev) }
                  checked={ recipeSteps[key] }
                  type="checkbox"
                  name={ key }
                  id={ key }
                />
                <label
                  style={ { textDecoration: recipeSteps[key] && 'line-through' } }
                  htmlFor={ key }
                >
                  { `${recipe[key]} - ${recipe[`strMeasure${indice + 1}`]}`}

                </label>
              </div>
            ))}
          </div>
          <div className="instructions">
            <h3>Instructions</h3>
            <p data-testid="instructions">
              {recipe.strInstructions}
            </p>
          </div>
          <button
            disabled={ !Object.values(recipeSteps).every((bool) => bool) }
            type="button"
            className={ Object.values(recipeSteps).every((bool) => bool)
              ? 'finish-recipe-btn btn-block btn-lg mx-auto'
              : 'btn-disabled btn-block btn-lg mx-auto' }
            data-testid="finish-recipe-btn"
            onClick={ () => finishRecipe(keyObj, history, id, recipe) }
          >
            Finalizar receita

          </button>
        </>
      )}
    </main>
  );
}

export default InProgress;
