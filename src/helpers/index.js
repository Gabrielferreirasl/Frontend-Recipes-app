export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

const setLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const saveFavorite = (recipe, { pathname }) => {
  const [, type, id] = pathname.split('/');
  const key = type === 'bebidas' ? 'Drink' : 'Meal';

  const obj = {
    id,
    type: type === 'comidas' ? 'comida' : 'bebida',
    area: type === 'bebidas' ? '' : recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: type === 'bebidas' ? recipe.strAlcoholic : '',
    name: recipe[`str${key}`],
    image: recipe[`str${key}Thumb`],
  };

  const checkFavoriteExists = (favoriteRecipes) => {
    if (favoriteRecipes.some((item) => item.id === id)) {
      const newArray = favoriteRecipes.filter((favorite) => favorite.id !== id);
      return localStorage.setItem('favoriteRecipes',
        JSON.stringify(newArray));
    }
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...favoriteRecipes, obj]));
  };

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return favoriteRecipes
    ? checkFavoriteExists(favoriteRecipes)
    : localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
};

export const checkIsFavorite = ({ pathname }) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favorites) {
    return favorites.some(({ id }) => id === pathname.split('/')[2]);
  }
  return false;
};

export default setLocalStorage;
