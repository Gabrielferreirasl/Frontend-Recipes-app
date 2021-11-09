import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getRecipeById } from '../services/recipesAPI';
import '../style/details.css';

function Details() {
  const [recipe, setRecipe] = useState({});
  const [type, setType] = useState('');
  const [recomendation, setRecomendation] = useState([]);
  const history = useHistory();

  const RECOMENDATION_CARDS = 5;

  useEffect(() => {
    const getRecipe = async () => {
      const locationInfoArray = history.location.pathname.split('/');
      const recipeById = await getRecipeById(locationInfoArray[1], locationInfoArray[2]);
      setRecipe(recipeById.recipeById);
      setRecomendation(Object.values(recipeById.randomJson)[0]);
      setType(locationInfoArray[1].includes('bebidas') ? 'Drink' : 'Meal');
    };
    getRecipe();
  }, [history]);

  const ingredientKeys = Object.keys(recipe).filter((key) => (
    key.includes('strIngredient') && recipe[key] !== '' && recipe[key] !== null));

  return (
    <div>
      <img data-testid="recipe-photo" src={ recipe[`str${type}Thumb`] } alt="recipe" />
      <div>
        <h4 data-testid="recipe-title">{recipe[`str${type}`]}</h4>
        <button type="button" data-testid="share-btn">
          <img src={ shareIcon } alt="shareIcon" />
        </button>
        <button type="button" data-testid="favorite-btn">
          <img src={ blackHeartIcon } alt="blackHeartIcon" />
        </button>
        <p data-testid="recipe-category">
          {type === 'Drink' ? recipe.strAlcoholic : recipe.strCategory}
        </p>
      </div>
      <div>
        <h3>Ingredients</h3>
        {ingredientKeys.map((key, indice) => (
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
      <div>
        { type === 'Meal'
        && <iframe
          data-testid="video"
          src={ `https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}` }
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
          allowFullScreen
          title="video"
        />}
      </div>
      <div>
        <h3>Recomendadas</h3>
        <div className="recomendation">
          {recomendation.map((rec, indice) => indice <= RECOMENDATION_CARDS && (
            <div data-testid={ `${indice}-recomendation-card` }>
              <img
                className="recipe-img"
                src={ rec[`str${type === 'Drink' ? 'Meal' : 'Drink'}Thumb`] }
                alt="recomendation images"
              />
              <p>{type === 'Drink' ? rec.strCategory : rec.strAlcoholic}</p>
              <h3 data-testid={ `${indice}-recomendation-title` }>
                {rec[`str${type === 'Drink' ? 'Meal' : 'Drink'}`]}
              </h3>
            </div>
          ))}

        </div>
      </div>
      <button className="start-recipe-btn" data-testid="start-recipe-btn" type="button">
        Iniciar Receita
      </button>
    </div>
  );
}

export default Details;
