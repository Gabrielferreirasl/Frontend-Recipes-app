import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

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
      <Header />
    </main>
  );
}

export default Bebidas;
