const recipesAPI = async ({ search, type }, history) => {
  const searchType = type === 'Ingrediente' ? 'filter' : 'search';
  const filter = (type === 'Ingrediente' && 'i')
  || (type === 'Nome' && 's') || (type === 'Primeira letra' && 'f');
  const url = history.includes('bebidas') ? 'thecocktaildb' : 'themealdb';
  const endpoint = await fetch(`https://www.${url}.com/api/json/v1/1/${searchType}.php?${filter}=${search}`);
  const json = await endpoint.json();
  return json;
};

export const getRecipeById = async ({ pathname }) => {
  const [, typeKey, id] = pathname.split('/');
  const type = typeKey === 'bebidas' ? 'thecocktaildb' : 'themealdb';
  const endpoint = await fetch(`https://www.${type}.com/api/json/v1/1/lookup.php?i=${id}`);

  const json = await endpoint.json();
  return json[typeKey === 'bebidas' ? 'drinks' : 'meals'][0];
};

export const getRecomendations = async ({ pathname }) => {
  const endpointRandom = await fetch(`https://www.${pathname.includes('bebidas') ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/search.php?s=`);
  const randomJson = await endpointRandom.json();
  return Object.values(randomJson)[0];
};

export const recipesApiList = async (locationPathName) => {
  const url = locationPathName.includes('bebidas') ? 'thecocktaildb' : 'themealdb';
  const endpoint = `https://www.${url}.com/api/json/v1/1/search.php?s=`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const categoryRecipesApi = async (locationPathName) => {
  const url = locationPathName.includes('bebidas') ? 'thecocktaildb' : 'themealdb';
  const endpoint = `https://www.${url}.com/api/json/v1/1/list.php?c=list`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const recipesByCategoryApi = async (category, locationPathName) => {
  const url = locationPathName.includes('bebidas') ? 'thecocktaildb' : 'themealdb';
  const endpoint = `https://www.${url}.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const getRandomRecipe = async (type) => {
  const url = type === 'Comidas' ? 'themealdb' : 'thecocktaildb';
  const endpoint = await fetch(`https://www.${url}.com/api/json/v1/1/random.php`);
  const response = await endpoint.json();
  return Object.values(response)[0];
};

export const getIngredients = async (history) => {
  const MAX_INDEX = 12;
  const url = history.location.pathname.includes('bebidas')
    ? 'thecocktaildb' : 'themealdb';
  const endpoint = await fetch(`https://www.${url}.com/api/json/v1/1/list.php?i=list`);
  const response = await endpoint.json();
  return response[url === 'thecocktaildb' ? 'drinks' : 'meals'].slice(0, MAX_INDEX);
};

export const getRecipesByIngredient = async (history, Ingredient) => {
  const url = history.location.pathname.includes('bebidas')
    ? 'thecocktaildb' : 'themealdb';
  const endpoint = await fetch(`https://www.${url}.com/api/json/v1/1/filter.php?i=${Ingredient}`);
  const response = await endpoint.json();
  return response[url === 'thecocktaildb' ? 'drinks' : 'meals'];
};

export default recipesAPI;
