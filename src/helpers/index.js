export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

const setLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const favoriteOrDisfavorite = (favoriteRecipes, idToVerify, objToAdd) => { // adiciona ou remove receita da lista de favoritos
  if (favoriteRecipes.some((item) => item.id === idToVerify)) {
    const newArray = favoriteRecipes.filter((favorite) => favorite.id !== idToVerify);
    return setLocalStorage('favoriteRecipes', newArray);
  }
  setLocalStorage('favoriteRecipes', [...favoriteRecipes, objToAdd]);
};

export const saveFavorite = (recipe, history) => {
  const [, type, id] = history.location.pathname.split('/');
  const key = type === 'bebidas' ? 'Drink' : 'Meal';

  const recipeToAdd = {
    id,
    type: type === 'comidas' ? 'comida' : 'bebida',
    area: type === 'bebidas' ? '' : recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: type === 'bebidas' ? recipe.strAlcoholic : '',
    name: recipe[`str${key}`],
    image: recipe[`str${key}Thumb`],
  };

  const favoriteRecipes = getLocalStorage('favoriteRecipes');
  return favoriteRecipes
    ? favoriteOrDisfavorite(favoriteRecipes, id, recipeToAdd)
    : setLocalStorage('favoriteRecipes', [recipeToAdd]);
};

export const handleFavoriteImg = (history) => {
  const [,, idToVerify] = history.location.pathname.split('/');
  const recipesFavorites = getLocalStorage('favoriteRecipes');
  if (recipesFavorites) {
    return recipesFavorites.some(({ id }) => id === idToVerify);
  }
  return false;
};

export const getRecipeInfo = (history) => {
  const [, type, id] = history.location.pathname.split('/');
  return {
    typeKey: type === 'comidas' ? 'Meal' : 'Drink',
    id,
    isFavorite: handleFavoriteImg(history),
  };
};

export default setLocalStorage;
