import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getRecipeById } from '../services/recipesAPI';
import '../style/details.css';
import DetailBtns from '../components/DetailBtns';
import RecomendationsWithIframe from '../components/RecomendationsWithIframe';

function Details() {
  const [recipe, setRecipe] = useState({});
  const [idType, setIdType] = useState('');
  const [recomendations, setRecomendations] = useState([]);
  const [copied, setCopied] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getRecipe = async () => {
      const locationInfoArray = history.location.pathname.split('/');
      const recipeById = await getRecipeById(locationInfoArray[1], locationInfoArray[2]);
      setRecipe(recipeById.recipeById);
      setRecomendations(Object.values(recipeById.randomJson)[0]);
      setIdType(locationInfoArray[1].includes('bebidas') ? 'Drink' : 'Meal');
    };
    getRecipe();
  }, [history]);

  const ingredientKeys = Object.keys(recipe).filter((key) => (
    key.includes('strIngredient') && recipe[key] !== '' && recipe[key] !== null));

  const handleShareAndFav = ({ target: { alt } }) => {
    const ONE_SECOND = 1000;
    if (alt === 'shareIcon') {
      navigator.clipboard.writeText(`http://localhost:3000${history.location.pathname}`);
      setCopied(true);
      setTimeout(() => setCopied(false), ONE_SECOND);
    }
  };

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ recipe[`str${idType}Thumb`] }
        alt="recipe"
      />
      <div>
        <h4 data-testid="recipe-title">{recipe[`str${idType}`]}</h4>
        <button
          onClick={ (ev) => handleShareAndFav(ev) }
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="shareIcon" />
        </button>
        {copied && <p>Link copiado!</p>}
        <button
          value="fav"
          onClick={ (ev) => handleShareAndFav(ev) }
          type="button"
          data-testid="favorite-btn"
        >
          <img src={ blackHeartIcon } alt="blackHeartIcon" />
        </button>
        <p data-testid="recipe-category">
          {idType === 'Drink' ? recipe.strAlcoholic : recipe.strCategory}
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
      <RecomendationsWithIframe obj={ { recomendations, recipe } } />
      <DetailBtns />
    </>
  );
}

export default Details;
