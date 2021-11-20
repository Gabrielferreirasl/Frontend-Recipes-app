import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';
import * as APIfuncs from '../services/recipesAPI';
import renderPath from '../helpers/renderPath';
import 'mutationobserver-shim';

const recipeRandom = [
  {
    idMeal: '52938',
    strMeal: 'Jamaican Beef Patties',
    strInstructions: 'beeffff',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wsqqsw1515364068.jpg',
    strTags: 'Snack,Spicy',
    strYoutube: 'https://www.youtube.com/watch?v=ypQjoiZiTac',
    strIngredient1: 'Plain Flour',
    strIngredient2: 'Salt',
    strMeasure1: '4 cups ',
    strMeasure2: '1 tsp ',
    strSource: 'https://www.thespruce.com/jamaican-beef-patties-recipe-2137762',
  },
];

const randomApi = jest.spyOn(APIfuncs, 'getRandomRecipe')
  .mockImplementation((type) => {
    if (type === 'Comidas') {
      return Promise.resolve(recipeRandom);
    }
    return Promise.resolve([
      {
        teste: 'oi',
      },
    ]);
  });

const ROUTE_EXPLORAR_COMIDAS = '/explorar/comidas';

describe('verifica se os botões estão redirecionando para tela correta', () => {
  it('verifica se o botão "por ingrediente" redireciona para rota '
    + '"/explorar/comidas/ingredientes"', () => {
    const { history } = renderPath(ROUTE_EXPLORAR_COMIDAS);

    const byIngredientBtn = screen.getByTestId('explore-by-ingredient');

    userEvent.click(byIngredientBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
  });
  it('verifica se o botão "por local de origem" redireciona para rota'
   + ' "/explorar/comidas/area"', () => {
    const { history } = renderPath(ROUTE_EXPLORAR_COMIDAS);

    const byAreaBtn = screen.getByTestId('explore-by-area');

    userEvent.click(byAreaBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/area');
  });
  it('verifica se o botão "Me Surprenda" redireciona para tela de detalhes'
    + ' de uma receita aleatoria', async () => {
    const { history } = renderPath(ROUTE_EXPLORAR_COMIDAS);

    const randomBtn = screen.getByTestId('explore-surprise');

    userEvent.click(randomBtn);
    await waitFor(() => expect(history.location.pathname).toBe('/comidas/52938'));
    expect(randomApi).toBeCalled();
    expect(randomApi).toBeCalledWith('Comidas');
  });
});
