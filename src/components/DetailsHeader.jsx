import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { checkIsFavorite, saveFavorite } from '../helpers';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../style/details.css';

function DetailsHeader({ recipe }) {
  const location = useLocation();
  const [infoRecipe, setInfoRecipe] = useState({
    keyType: location.pathname.includes('bebidas') ? 'Drink' : 'Meal',
    isFavorite: checkIsFavorite(location),
    copied: false,
  });

  const handleShareAndFav = ({ target: { alt } }) => {
    const ONE_SECOND = 1000;
    if (alt === 'shareIcon') {
      const [, url, id] = location.pathname.split('/');
      navigator.clipboard.writeText(`http://localhost:3000/${url}/${id}`);
      setInfoRecipe((prev) => ({ ...prev, copied: true }));
      return setTimeout(() => (
        setInfoRecipe((prev) => ({ ...prev, copied: false }))), ONE_SECOND);
    }
    saveFavorite(recipe, location);
    setInfoRecipe((prev) => ({ ...prev, isFavorite: checkIsFavorite(location) }));
  };

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ recipe[`str${infoRecipe.keyType}Thumb`] }
        alt="recipe"
      />
      <div className="card-info">
        <div className="title">
          <h4 data-testid="recipe-title">{recipe[`str${infoRecipe.keyType}`]}</h4>
          <img
            src={ infoRecipe.keyType === 'Meal' ? 'https://img.icons8.com/ios-filled/50/000000/meal.png'
              : 'https://img.icons8.com/ios-filled/50/000000/cocktail.png' }
            alt="icon"
          />
        </div>
        <section className="btns">
          <button
            className="share-fav"
            onClick={ (ev) => handleShareAndFav(ev) }
            type="button"
            data-testid="share-btn"
          >
            <img src={ shareIcon } alt="shareIcon" />
          </button>
          <button
            className="share-fav"
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
        </section>
      </div>
      <p className="category" data-testid="recipe-category">
        {infoRecipe.keyType === 'Drink' ? recipe.strAlcoholic : recipe.strCategory}
      </p>
      {infoRecipe.copied && <p className="copiado">Link copiado!</p>}
    </>
  );
}

DetailsHeader.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DetailsHeader;
