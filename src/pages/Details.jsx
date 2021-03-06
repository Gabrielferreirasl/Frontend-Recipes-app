import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getRecipeById } from '../services/recipesAPI';
import '../style/details.css';
import DetailBtns from '../components/DetailBtns';
import RecomendationsWithIframe from '../components/RecomendationsWithIframe';
import DetailsHeader from '../components/DetailsHeader';

function Details() {
  const [recipe, setRecipe] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const getRecipe = async () => setRecipe(await getRecipeById(location));
    getRecipe();
  }, [location]);

  const ingredientKeys = () => Object.keys(recipe).filter((key) => (
    key.includes('strIngredient') && recipe[key] !== '' && recipe[key] !== null));

  return (
    <main>
      {recipe
      && (
        <>
          <DetailsHeader recipe={ recipe } />
          <div>
            <div className="title-ingredient">
              <h3>Ingredients</h3>
            </div>
            <div className="ingredients">
              {ingredientKeys().map((key, indice) => (
                <p data-testid={ `${indice}-ingredient-name-and-measure` } key={ indice }>
                  {`${recipe[key]} - ${recipe[`strMeasure${indice + 1}`]}`}
                </p>))}
            </div>
          </div>
          <div className="instructions">
            <h3>Instructions</h3>
            <p data-testid="instructions">
              {recipe.strInstructions}
            </p>
          </div>
          <RecomendationsWithIframe recipe={ recipe } />
          <DetailBtns />
        </>
      )}
    </main>
  );
}

export default Details;
