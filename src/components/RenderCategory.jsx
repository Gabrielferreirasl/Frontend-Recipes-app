import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { categoryRecipesApi, recipesByCategoryApi } from '../services/recipesAPI';
import RecipesContext from '../context/RecipesContext';

function RenderCategory() {
  const history = useHistory();
  const NUMBER_FOUR = 4;
  const key = history.location.pathname.includes('/bebidas') ? 'drinks' : 'meals';
  const keyToCategory = history.location.pathname
    .includes('/bebidas') ? 'categoryDrinks' : 'categoryMeals';

  const {
    setCategoryRecipes,
    categoryRecipes,
    setFilters,
    filters,
    setRecipesFiltred,
    recipesFiltred,
  } = useContext(RecipesContext);

  const handleClick = async ({ target }) => {
    const { value } = target;
    const { status, filter } = filters.category;
    setFilters({
      category: {
        status: value === filter ? !status : true,
        filter: value === filter ? '' : value,
      },
    });
    const responseApi = await recipesByCategoryApi(value, history.location.pathname);
    setRecipesFiltred({
      ...recipesFiltred,
      [key]: responseApi[key],
    });
  };

  useEffect(() => {
    const updateCategory = async () => {
      const result = await categoryRecipesApi(history.location.pathname);
      setCategoryRecipes({
        categoryDrinks: [],
        categoryMeals: [],
        [keyToCategory]: result[key],
      });
    };
    updateCategory();
  },
  [history.location.pathname, key, keyToCategory, setCategoryRecipes]);

  return (
    <section>
      {
        categoryRecipes[keyToCategory].length > 0 && categoryRecipes[keyToCategory]
          .map(({ strCategory }, index) => (
            index <= NUMBER_FOUR
              && (
                <button
                  key={ strCategory }
                  type="button"
                  data-testid={ `${strCategory}-category-filter` }
                  onClick={ handleClick }
                  value={ strCategory }
                >
                  {strCategory}
                </button>
              )))
      }
    </section>
  );
}

export default RenderCategory;
