import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router';
import '../style/details.css';
import { getRecomendations } from '../services/recipesAPI';

function RecomendationsWithIframe({ recipe }) {
  const location = useLocation();
  const [recomendations, setRecomendations] = useState([]);
  const carrousel = useRef(null);

  useEffect(() => {
    const initial = async () => setRecomendations(await getRecomendations(location));
    initial();
  }, [location]);

  const NUMBER_FIVE = 5;
  const recomendationType = location.pathname.includes('bebidas')
    ? 'Meal' : 'Drink';

  const scrollClick = ({ target }) => {
    const MARGIN = 7;
    const { alt } = target;
    if (alt === 'left') {
      carrousel.current.scrollLeft -= carrousel.current.offsetWidth + MARGIN;
    } else if (alt === 'right') {
      carrousel.current.scrollLeft += carrousel.current.offsetWidth + MARGIN;
    }
  };

  return (
    <>
      <div className="iframe">
        { recomendationType === 'Drink' && recipe.strYoutube
         && <iframe
           data-testid="video"
           src={ `https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}` }
           frameBorder="0"
           allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
           allowFullScreen
           title="video"
         />}
      </div>
      <div className="div-recomendations">
        <h3>Recomendadas</h3>
        <div className="container-carrousel">
          <button
            value="<"
            onClick={ scrollClick }
            className="btn-carrousel"
            type="button"
          >
            <img alt="left" src="https://img.icons8.com/fluency/48/000000/left.png" />
            {' '}

          </button>
          <div ref={ carrousel } className="carrousel recomendation">
            {recomendations.map((rec, indice) => indice <= NUMBER_FIVE && (
              <div
                key={ indice }
                data-testid={ `${indice}-recomendation-card` }
                className={ indice === NUMBER_FIVE ? 'last-item item-carrousel'
                  : ' item-carrousel' }
              >
                <h4
                  className="recomendation-name"
                  data-testid={ `${indice}-recomendation-title` }
                >
                  {rec[`str${recomendationType}`]}
                </h4>
                <img
                  className="recipe-img"
                  src={ rec[`str${recomendationType}Thumb`] }
                  alt={ rec[`str${recomendationType}`] }
                />
                <p className="recomendation-category">
                  {recomendationType === 'Drink' ? rec.strAlcoholic : rec.strCategory}
                </p>
              </div>
            ))}
          </div>
          <button
            value=">"
            onClick={ scrollClick }
            className="btn-carrousel"
            type="button"
          >
            <img className="setaNext" alt="right" src="https://img.icons8.com/fluency/48/000000/left.png" />
          </button>
        </div>
      </div>
    </>
  );
}

RecomendationsWithIframe.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecomendationsWithIframe;
