const recipesAPI = async ({ search, type }, history) => {
  const searchType = type === 'Ingrediente' ? 'filter' : 'search';
  const filter = (type === 'Ingrediente' && 'i')
  || (type === 'Nome' && 's') || (type === 'Primeira letra' && 'f');
  const url = history.includes('bebidas') ? 'thecocktaildb' : 'themealdb';
  const endpoint = await fetch(`https://www.${url}.com/api/json/v1/1/${searchType}.php?${filter}=${search}`);
  const json = await endpoint.json();
  return json;
};

export default recipesAPI;
