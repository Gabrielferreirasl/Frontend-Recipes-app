import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { categoryRecipesApi } from '../services/recipesAPI';
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
  } = useContext(RecipesContext);

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
                >
                  {strCategory}
                </button>
              )))
      }
    </section>
  );
}

export default RenderCategory;
