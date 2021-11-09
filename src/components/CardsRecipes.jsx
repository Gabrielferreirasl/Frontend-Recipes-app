import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CardsRecipes({ items, maxItems }) {
  const NUMBER_ELEVEN = maxItems - 1;
  const keyIdToRender = Object.keys(items[0]).filter((key) => key.includes('id'))[0]; // extrai a chave referente ao id para comida ou bebida
  const keyImgToRender = keyIdToRender === 'idMeal' ? 'strMealThumb' : 'strDrinkThumb';
  const keyNameToRender = keyIdToRender === 'idMeal' ? 'strMeal' : 'strDrink';
  const history = useHistory();

  return (
    <main>
      {
        items.map((item, index) => (
          index <= NUMBER_ELEVEN && (
            <Link to={ `${history.location.pathname}${item[keyIdToRender]}` }>
              <div
                key={ item[keyIdToRender] }
                data-testid={ `${index}-recipe-card` }
              >
                <h4 data-testid={ `${index}-card-name` }>{item[keyNameToRender]}</h4>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ item[keyImgToRender] }
                  alt="strMealThumb"
                />
              </div>
            </Link>
          )
        ))
      }
    </main>
  );
}

CardsRecipes.defaultProps = {
  maxItems: 12,
};

CardsRecipes.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  maxItems: PropTypes.number,
};

export default CardsRecipes;
