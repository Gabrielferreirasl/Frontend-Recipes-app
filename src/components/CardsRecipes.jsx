import React from 'react';

function CardsRecipes({ items, maxItems }) {
  const NUMBER_ELEVEN = maxItems;
  const KeysItems = Object.keys(items[0]);
  const keyIdToRender = KeysItems[0];
  const keyStrThumb = KeysItems;
  const keyStrName = Object.keys(items[0])[1];
  console.log(keyIdToRender);

  return (
    <section>
      {
        items.map((meal, index) => (
          index <= NUMBER_ELEVEN && (
            <div key={ meal[keyIdToRender] } data-testid={ `${index}-recipe-card` }>
              <h4 data-testid={ `${index}-card-name` }>{meal[keyStrName]}</h4>
              <img
                data-testid={ `${index}-card-img` }
                src={ meal[keyStrThumb] }
                alt="strMealThumb"
              />
            </div>
          )
        ))
      }
    </section>
  );
}

export default CardsRecipes;
