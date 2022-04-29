import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RenderRecipes from '../components/RenderRecipes';
import RecipesContext from '../context/RecipesContext';
import { getAreas, getRecipesByArea, recipesApiList } from '../services/recipesAPI';

function ExplorarPorArea() {
  const { recipes: { meals }, setArrayRecipes } = useContext(RecipesContext);
  const [areas, setAreas] = useState(null);

  useEffect(() => {
    const getAreasAPI = async () => setAreas(await getAreas());
    getAreasAPI();
  }, []);

  const filterByArea = async ({ target: { value } }) => {
    console.log(value);
    const recipesByArea = value === 'all' ? await recipesApiList('comidas')
      : await getRecipesByArea(value);
    await setArrayRecipes((prev) => ({ ...prev, meals: recipesByArea.meals }));
  };

  return (
    <main>
      <Header type="Explorar Origem" />
      <div className="container-select">
        <select
          className="dropdown-areas"
          data-testid="explore-by-area-dropdown"
          name="area"
          onChange={ filterByArea }
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
      </div>
      <RenderRecipes items={ meals } />
      <Footer />
    </main>
  );
}

export default ExplorarPorArea;
