import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { checkIsFavorite, saveFavorite } from '../helpers';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

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
      <div>
        <h4 data-testid="recipe-title">{recipe[`str${infoRecipe.keyType}`]}</h4>
        <button
          onClick={ (ev) => handleShareAndFav(ev) }
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="shareIcon" />
        </button>
        {infoRecipe.copied && <p>Link copiado!</p>}
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
          {infoRecipe.keyType === 'Drink' ? recipe.strAlcoholic : recipe.strCategory}
        </p>
      </div>
    </>
  );
}

DetailsHeader.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DetailsHeader;
