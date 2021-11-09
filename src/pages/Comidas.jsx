import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CardsRecipes from '../components/CardsRecipes';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function Comidas() {
  const { recipes: { meals } } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    if (meals.length === 1) {
      history.push(`comidas/${meals[0].idMeal}`);
    }
  }, [meals, history]);

  return (
    <main>
      <Header type="Comidas" />
      {meals.length !== 0 && <CardsRecipes maxItems={ 12 } items={ meals } />}
    </main>
  );
}

export default Comidas;
