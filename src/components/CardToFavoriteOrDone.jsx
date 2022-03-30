import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.png';
import blackHeartIcon from '../images/blackHeartIcon.png';

function CardToFavoriteOrDone({ item, index, favoriteOrMade, removeFavorite }) {
  const itemIsFavorite = favoriteOrMade === 'favorite';
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
    <div className="div-cards">
      <Link
        to={ `/${type}/${item.id}` }
        className="img-name-card"
      >
        <h4 data-testid={ `${index}-horizontal-name` }>{item.name}</h4>
        <img
          src={ item.image }
          alt="Imagem da receita"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div className="div-cards-texts">
        <p data-testid={ `${index}-horizontal-top-text` }>
          {type === 'comidas' ? `${item.area} - ${item.category}`
            : `${item.alcoholicOrNot}`}
        </p>

        { !itemIsFavorite
        && (
          <p className="mb-0" data-testid={ `${index}-horizontal-done-date` }>
            {item.doneDate}
          </p>) }
        {copied && <p>Link copiado!</p>}
        {
          !itemIsFavorite && type === 'comidas' && item.tags.length > 0
            ? (
              item.tags.map((tag, indexTag) => (
                <span
                  key={ indexTag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  { tag }
                </span>
              )))
            : null
        }
        <button
          onClick={ handleShare }
          type="button"
          className="share-btn"
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
              className="fav-btn"
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="fav"
              />
            </button>
          )
        }
      </div>

    </div>
  );
}

CardToFavoriteOrDone.defaultProps = { removeFavorite: '' };

CardToFavoriteOrDone.propTypes = {
  favoriteOrMade: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
  }).isRequired,
  removeFavorite: PropTypes.func,
};

export default CardToFavoriteOrDone;
