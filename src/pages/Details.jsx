import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { getRecipeById } from '../services/recipesAPI';
import '../style/details.css';
import DetailBtns from '../components/DetailBtns';
import RecomendationsWithIframe from '../components/RecomendationsWithIframe';
import { getRecipeInfo, handleFavoriteImg, saveFavorite } from '../helpers';

function Details() {
  const [recipe, setRecipe] = useState({});
  const [recomendations, setRecomendations] = useState([]);
  const [copied, setCopied] = useState(false);
  const [infoRecipe, setInfoRecipe] = useState({ keyType: '', id: '', isFavorite: null });
  const history = useHistory();

  useEffect(() => {
    const getRecipe = async () => {
      setInfoRecipe(getRecipeInfo(history));
      const recipeById = await getRecipeById(getRecipeInfo(history));
      setRecipe(recipeById.recipeById);
      setRecomendations(Object.values(recipeById.randomJson)[0]);
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
      return setTimeout(() => setCopied(false), ONE_SECOND);
    }
    saveFavorite(recipe, history);
    setInfoRecipe((prev) => ({ ...prev, isFavorite: handleFavoriteImg(history) }));
  };

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ recipe[`str${infoRecipe.typeKey}Thumb`] }
        alt="recipe"
      />
      <div>
        <h4 data-testid="recipe-title">{recipe[`str${infoRecipe.typeKey}`]}</h4>
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
        >
          <img
            data-testid="favorite-btn"
            src={ infoRecipe.isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="fav"
          />
        </button>
        <p data-testid="recipe-category">
          {infoRecipe.typeKey === 'Drink' ? recipe.strAlcoholic : recipe.strCategory}
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
