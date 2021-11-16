import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { getIngredients, getRecipesByIngredient } from '../services/recipesAPI';

function ExplorarIngredientes() {
  const history = useHistory();
  const [ingredients, setIngredients] = useState(null);
  const { setArrayRecipes } = useContext(RecipesContext);

  const urlType = history.location.pathname.includes('bebidas')
    ? 'thecocktaildb' : 'themealdb';
  const key = urlType === 'thecocktaildb' ? 'strIngredient1' : 'strIngredient';

  useEffect(() => {
    const getIngredientsAPI = async () => setIngredients(await getIngredients(history));
    getIngredientsAPI();
  }, [history]);

  const ingredientImg = (ingredient) => `https://www.${urlType}.com/images/ingredients/${ingredient[key]}-Small.png`;

  const handleClick = async (ingredient) => {
    const stateKey = urlType === 'thecocktaildb' ? 'drinks' : 'meals';
    const recipesByIngredient = await getRecipesByIngredient(history, ingredient[key]);
    setArrayRecipes((prev) => ({ ...prev, [stateKey]: recipesByIngredient }));
    history.push(`/${urlType === 'thecocktaildb' ? 'bebidas' : 'comidas'}`);
  };

  return (
    <main>
      {ingredients && ingredients.map((item, index) => (
        <button key={ index } type="button" onClick={ () => handleClick(item) }>
          <div data-testid={ `${index}-ingredient-card` }>
            <img
              src={ ingredientImg(item) }
              alt="ingredient"
              data-testid={ `${index}-card-img` }
            />
            <h4 data-testid={ `${index}-card-name` }>{item[key]}</h4>
          </div>
        </button>
      ))}
    </main>
  );
}

export default ExplorarIngredientes;
