import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RenderCategory from '../components/RenderCategory';
import RenderRecipes from '../components/RenderRecipes';
import RecipesContext from '../context/RecipesContext';

function Comidas() {
  const { recipes: { meals } } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    if (meals.length === 1) {
      history.push(`comidas/${meals[0].idMeal}`);
    }
  }, [history, meals]);

  return (
    <main>
      <Header type="Comidas" />
      <RenderCategory />
      <RenderRecipes items={ meals } />
    </main>
  );
}

export default Comidas;
