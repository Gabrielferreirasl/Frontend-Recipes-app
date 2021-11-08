import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import CardsRecipes from '../components/CardsRecipes';

function Bebidas() {
  const { recipes: { drinks } } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    if (drinks.length === 1) {
      history.push(`bebidas/${drinks[0].idDrink}`);
    }
  }, [drinks, history]);

  return (
    <main>
      <Header type="Bebidas" />
      {drinks.length !== 0 && <CardsRecipes maxItems={ 11 } items={ drinks } />}
    </main>
  );
}

export default Bebidas;
