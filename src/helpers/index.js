export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

const setLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const favoriteOrDisfavorite = (favoriteRecipes, idToVerify, objToAdd) => { // adiciona ou remove receita da lista de favoritos
  if (favoriteRecipes.some((item) => item.id === idToVerify)) {
    const newArray = favoriteRecipes.filter((favorite) => favorite.id !== idToVerify);
    return setLocalStorage('favoriteRecipes', newArray);
  }
  setLocalStorage('favoriteRecipes', [...favoriteRecipes, objToAdd]);
};

export const saveFavorite = (recipe, { pathname }) => {
  const [, type, id] = pathname.split('/');
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

export const checkIsFavorite = ({ pathname }) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favorites) {
    return favorites.some(({ id }) => id === pathname.split('/')[2]);
  }
  return false;
};

const addOrRemoveProgress = (inProgressRecipes, stepName, keyObj, id) => {
  if (Object.keys(inProgressRecipes[keyObj]).some((i) => i === id)) {
    if (inProgressRecipes[keyObj][id].some((step) => step === stepName)) {
      inProgressRecipes[keyObj][id] = inProgressRecipes[keyObj][id]
        .filter((p) => p !== stepName);
      return localStorage.setItem('inProgressRecipes',
        JSON.stringify(inProgressRecipes));
    }
    inProgressRecipes[keyObj][id] = [...inProgressRecipes[keyObj][id], stepName];
    return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }
  inProgressRecipes[keyObj][id] = [stepName];
  return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
};

export const checkProgress = (stepName, keyObj, id) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const obj = { cocktails: {}, meals: {} };
  obj[keyObj] = { [id]: [stepName] };
  return inProgressRecipes ? addOrRemoveProgress(inProgressRecipes, stepName, keyObj)
    : localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
};

export const finishRecipe = (keyType, history, id, recipe) => {
  const dataAtual = new Date();
  const date = `${dataAtual.getDate()}/${(dataAtual.getMonth()
     + 1)}/${dataAtual.getFullYear()}`;
  const key = keyType === 'cocktails' ? 'Drink' : 'Meal';
  const obj = {
    id,
    type: key === 'Drink' ? 'bebida' : 'comida',
    area: key === 'Drink' ? '' : recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: key === 'Drink' ? recipe.strAlcoholic : '',
    name: recipe[`str${key}`],
    tags: recipe.strTags ? recipe.strTags.split(',') : [],
    image: recipe[`str${key}Thumb`],
    doneDate: date,
  };
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (doneRecipes) {
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, obj]));
    return history.push('/receitas-feitas');
  }
  localStorage.setItem('doneRecipes', JSON.stringify([obj]));
  return history.push('/receitas-feitas');
};

export const updateRecipes = (keyLocalStorage, typeToFilter, setState) => {
  if (getLocalStorage(keyLocalStorage)) {
    const listFavoriteRecipes = getLocalStorage(keyLocalStorage);
    if (typeToFilter !== 'all') {
      const recipesFiltred = listFavoriteRecipes
        .filter((recipe) => recipe.type === typeToFilter);
      return setState(recipesFiltred);
    }
    setState(listFavoriteRecipes);
  }
};

export default setLocalStorage;
