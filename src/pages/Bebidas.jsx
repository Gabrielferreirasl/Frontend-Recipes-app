import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../style/telaPrincipal.css';
import RecipesContext from '../context/RecipesContext';
import RenderRecipes from '../components/RenderRecipes';
import RenderCategory from '../components/RenderCategory';

function Bebidas() {
  const { recipes: { drinks }, filters, recipesFiltred } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    if (drinks.length === 1) {
      history.push(`bebidas/${drinks[0].idDrink}`);
    }
  }, [drinks, history]);

  return (
    <main>
      <Header type="Bebidas" />
      <RenderCategory />
      <RenderRecipes items={ filters.category.status ? recipesFiltred.drinks : drinks } />
      <Footer />
    </main>
  );
}

export default Bebidas;
