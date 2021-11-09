const recipesAPI = async ({ search, type }, history) => {
  const searchType = type === 'Ingrediente' ? 'filter' : 'search';
  const filter = (type === 'Ingrediente' && 'i')
  || (type === 'Nome' && 's') || (type === 'Primeira letra' && 'f');
  const url = history.includes('bebidas') ? 'thecocktaildb' : 'themealdb';
  const endpoint = await fetch(`https://www.${url}.com/api/json/v1/1/${searchType}.php?${filter}=${search}`);
  const json = await endpoint.json();
  return json;
};

export const getRecipeById = async (location, id) => {
  const type = location.includes('bebidas') ? 'thecocktaildb' : 'themealdb';
  const endpoint = await fetch(`https://www.${type}.com/api/json/v1/1/lookup.php?i=${id}`);
  const endpointRandom = await fetch(`https://www.${type === 'thecocktaildb' ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/search.php?s=`);
  const randomJson = await endpointRandom.json();
  const json = await endpoint.json();
  return { recipeById: json[location.includes('bebidas') ? 'drinks' : 'meals'][0], randomJson };
};

export default recipesAPI;
