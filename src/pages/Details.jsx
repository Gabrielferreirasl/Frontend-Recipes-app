import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getRecipeById } from '../services/recipesAPI';
import '../style/details.css';
import DetailBtns from '../components/DetailBtns';
import RecomendationsWithIframe from '../components/RecomendationsWithIframe';
import DetailsHeader from '../components/DetailsHeader';

function Details() {
  const [recipe, setRecipe] = useState({});
  const location = useLocation();

  useEffect(() => {
    const getRecipe = async () => setRecipe(await getRecipeById(location));
    getRecipe();
  }, [location]);

  const ingredientKeys = () => Object.keys(recipe).filter((key) => (
    key.includes('strIngredient') && recipe[key] !== '' && recipe[key] !== null));

  return (
    <>
      <DetailsHeader recipe={ recipe } />
      <div>
        <h3>Ingredients</h3>
        {ingredientKeys().map((key, indice) => (
          <p data-testid={ `${indice}-ingredient-name-and-measure` } key={ indice }>
            {`${recipe[key]} ${recipe[`strMeasure${indice + 1}`]}`}
          </p>))}
      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">
          {recipe.strInstructions}
        </p>
      </div>
      <RecomendationsWithIframe recipe={ recipe } />
      <DetailBtns />
    </>
  );
}

export default Details;
