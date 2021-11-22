import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RenderRecipes from '../components/RenderRecipes';
import RecipesContext from '../context/RecipesContext';
import { getAreas, getRecipesByArea, recipesApiList } from '../services/recipesAPI';

function ExplorarPorArea() {
  const { recipes: { meals }, setArrayRecipes,
    setRecipesFiltred } = useContext(RecipesContext);
  const [areas, setAreas] = useState(null);

  useEffect(() => {
    const getAreasAPI = async () => setAreas(await getAreas());
    getAreasAPI();
  }, []);

  const filterByArea = async ({ target: { value } }) => {
    const recipesByArea = value === 'all' ? await recipesApiList('comidas')
      : await getRecipesByArea(value);
    setArrayRecipes((prev) => ({ ...prev, meals: recipesByArea.meals }));
  };

  const onChange = (ev) => {
    setArrayRecipes({
      drinks: [],
      meals: [],
    });
    setRecipesFiltred({
      drinks: [],
      meals: [],
    });

    filterByArea(ev);
  };

  return (
    <main>
      <Header type="Explorar Origem" />
      <select
        data-testid="explore-by-area-dropdown"
        name="area"
        onChange={ onChange }
      >
        <option data-testid="All-option" value="all">All</option>
        {areas && areas.map(({ strArea }) => (
          <option
            data-testid={ `${strArea}-option` }
            key={ strArea }
            value={ strArea }
          >
            {strArea}
          </option>
        ))}
      </select>
      <RenderRecipes items={ meals } />
      <Footer />
    </main>
  );
}

export default ExplorarPorArea;
