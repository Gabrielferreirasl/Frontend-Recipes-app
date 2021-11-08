import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function Comidas() {
  const { recipes: { meals } } = useContext(RecipesContext);
  const history = useHistory();
  const NUMBER_ELEVEN = 11;

  useEffect(() => {
    if (meals.length === 1) {
      history.push(`comidas/${meals[0].idMeal}`);
    }
  }, [meals, history]);

  return (
    <main>
      <Header type="Comidas" />
      {meals.length !== 0 && meals.map((meal, index) => (
        index <= NUMBER_ELEVEN && (
          <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
            <h4 data-testid={ `${index}-card-name` }>{meal.strMeal}</h4>
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt="strMealThumb"
            />
          </div>
        )
      ))}
    </main>
  );
}

export default Comidas;
