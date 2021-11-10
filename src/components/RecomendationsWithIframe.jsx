import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';

function RecomendationsWithIframe({ obj: { recomendations, recipe } }) {
  const history = useHistory();

  const NUMBER_FIVE = 5;
  const recomendationType = history.location.pathname.includes('bebidas')
    ? 'Meal' : 'Drink';

  return (
    <>
      <div>
        { history.location.pathname.includes('comidas') && recipe.strYoutube
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
          {recomendations.map((rec, indice) => indice <= NUMBER_FIVE && (
            <div
              key={ indice }
              data-testid={ `${indice}-recomendation-card` }
            >
              <img
                className="recipe-img"
                src={ rec[`str${recomendationType}Thumb`] }
                alt=""
              />
              <p>
                {recomendationType === 'Drink' ? rec.strAlcoholic : rec.strCategory}
              </p>
              <h3 data-testid={ `${indice}-recomendation-title` }>
                {rec[`str${recomendationType}`]}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

RecomendationsWithIframe.propTypes = {
  obj: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecomendationsWithIframe;
