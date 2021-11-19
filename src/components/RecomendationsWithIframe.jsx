import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import '../style/details.css';
import { getRecomendations } from '../services/recipesAPI';

function RecomendationsWithIframe({ recipe }) {
  const location = useLocation();
  const [recomendations, setRecomendations] = useState([]);

  useEffect(() => {
    const initial = async () => setRecomendations(await getRecomendations(location));
    initial();
  }, [location]);

  const NUMBER_FIVE = 5;
  const recomendationType = location.pathname.includes('bebidas')
    ? 'Meal' : 'Drink';

  return (
    <>
      <div>
        { recomendationType === 'Drink' && recipe.strYoutube
         && <iframe
           className="iframe"
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
        <div className="recomendation">
          {recomendations.map((rec, indice) => indice <= NUMBER_FIVE && (
            <div
              key={ indice }
              data-testid={ `${indice}-recomendation-card` }
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
      </div>
    </>
  );
}

RecomendationsWithIframe.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecomendationsWithIframe;
