import React from 'react';
import PropTypes from 'prop-types';

function CardsRecipes({ items, maxItems }) {
  const NUMBER_ELEVEN = maxItems - 1;
  const keyIdToRender = Object.keys(items[0])[0];
  const keyImgToRender = keyIdToRender === 'idMeal' ? 'strMealThumb' : 'strDrinkThumb';
  const keyNameToRender = Object.keys(items[0])[1];

  return (
    <main>
      {
        items.map((item, index) => (
          index <= NUMBER_ELEVEN && (
            <div key={ item[keyIdToRender] } data-testid={ `${index}-recipe-card` }>
              <h4 data-testid={ `${index}-card-name` }>{item[keyNameToRender]}</h4>
              <img
                data-testid={ `${index}-card-img` }
                src={ item[keyImgToRender] }
                alt="strMealThumb"
              />
            </div>
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
