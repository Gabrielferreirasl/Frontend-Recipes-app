import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function CardToFavoriteOrDone({ item, index, favoriteOrMade, removeFavorite }) {
  const itemIsFavorite = favoriteOrMade === 'favorite'; // is bool
  const [copied, setCopied] = useState(false);
  const type = item.type === 'bebida' ? 'bebidas' : 'comidas';

  const handleShare = () => {
    const ONE_SECOND = 1000;
    navigator.clipboard.writeText(`http://localhost:3000/${type}/${item.id}`);
    setCopied(true);
    return setTimeout(() => setCopied(false), ONE_SECOND);
  };

  const handleCLick = () => {
    removeFavorite(item.id);
  };

  return (
    <div>
      <Link
        to={ `/${type}/${item.id}` }
      >
        <img
          src={ item.image }
          alt="Imagem da receita"
          data-testid={ `${index}-horizontal-image` }
        />
        <p data-testid={ `${index}-horizontal-name` }>
          {item.name}
        </p>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {type === 'comidas' ? `${item.area} - ${item.category}`
          : `${item.alcoholicOrNot}`}
      </p>

      { !itemIsFavorite
      && (
        <p data-testid={ `${index}-horizontal-done-date` }>
          {item.doneDate}
        </p>) }
      {copied && <p>Link copiado!</p>}
      <button
        onClick={ handleShare }
        type="button"
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="shareIcon"
        />
      </button>
      {
        itemIsFavorite
        && (
          <button
            value="fav"
            onClick={ handleCLick }
            type="button"
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="fav"
            />
          </button>
        )
      }
      {
        !itemIsFavorite && type === 'bebidas'
         && (
           item.tags((tag, indexTag) => {
             if (indexTag < 2) {
               return (
                 <span
                   data-testid={ `${indexTag}-${tag}-horizontal-tag` }
                 >
                   {tag}
                 </span>);
             }
           })
         )
      }
    </div>
  );
}

CardToFavoriteOrDone.propTypes = {
  item: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  favoriteOrMade: PropTypes.string.isRequired,
  removeFavorite: PropTypes.func.isRequired,
};

export default CardToFavoriteOrDone;
