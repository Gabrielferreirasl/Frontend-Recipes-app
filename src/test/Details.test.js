import { screen } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import recipeByIdComida from '../mocks/recipeByIdComida';
import DrinksRecomendation from '../mocks/DrinksRecomendation';
import * as APIfuncs from '../services/recipesAPI';
import renderPath from '../helpers/renderPath';
import 'mutationobserver-shim';

const getRecipeByIdMock = jest.spyOn(APIfuncs, 'getRecipeById')
  .mockImplementation(() => Promise.resolve(recipeByIdComida));

const getRecomendationsMock = jest.spyOn(APIfuncs, 'getRecomendations')
  .mockImplementation(() => Promise.resolve(DrinksRecomendation));

let clipboardData = '';
const mockClipboard = {
  writeText: jest.fn(
    (data) => { clipboardData = data; },
  ),
  readText: jest.fn(
    () => clipboardData,
  ),
};
global.navigator.clipboard = mockClipboard;

describe('Testes do componente "Details"', () => {
  test('verifica se as informações estão na tela', async () => {
    renderPath('/comidas/52772');
    waitFor(() => {
      expect(getRecipeByIdMock).toBeCalled();
      expect(getRecomendationsMock).toBeCalled();
    });

    expect(await screen.findByTestId('0-ingredient-name-and-measure'))
      .toBeInTheDocument();
    expect(await screen.findByTestId('video')).toBeInTheDocument();

    const ingredients = Object.keys(recipeByIdComida).filter((key) => (
      key.includes('strIngredient') && recipeByIdComida[key] !== ''
      && recipeByIdComida[key] !== null));

    ingredients.forEach(async (ing, indice) => {
      expect(await screen.findByText(recipeByIdComida[ing])).toBeInTheDocument();
      expect(await screen.findByText(recipeByIdComida[`strMeasure${indice + 1}`]))
        .toBeInTheDocument();
      expect(await screen.findByRole(`${indice}-ingredient-name-and-measure`))
        .toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId('favorite-btn'));
    expect(await screen.getByAltText('fav').src).toBe('http://localhost/comidas/blackHeartIcon.png');
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))[0].id).toBe('52772');

    userEvent.click(await screen.findByAltText('shareIcon'));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toBeCalled();
      expect(screen.queryByText(/link copiado/i)).toBeInTheDocument();
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/comidas/52772');
    });
  });

  test('verifica se as receitas recomendadas estão corretas', async () => {
    renderPath('/comidas/52772');
    DrinksRecomendation.forEach(async (item) => {
      expect(await screen.findByText(item.strAlcoholic)).toBeInTheDocument();
      expect(await screen.findByAltText(item.strDrink)).toBeInTheDocument();
      expect(await screen.findByText(item.strDrink)).toBeInTheDocument();
    });
  });
});

describe('Verifica os as opções de iniciar e continuar receita', () => {
  test('opção de iniciar receita', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {} }));
    const { history } = renderPath('/comidas/52771');

    const iniciateRecipeBtn = await screen.findByText('Iniciar Receita');

    expect(iniciateRecipeBtn).toBeInTheDocument();
    userEvent.click(iniciateRecipeBtn);
    expect(history.location.pathname).toBe('/comidas/52771/in-progress');
  });
  test('opção de iniciar receita', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: { 52771: ['strIngredient3'] } }));
    const { history } = renderPath('/comidas/52771');

    const ContinueRecipeBtn = await screen.findByText('Continuar Receita');

    expect(ContinueRecipeBtn).toBeInTheDocument();
    userEvent.click(ContinueRecipeBtn);
    expect(history.location.pathname).toBe('/comidas/52771/in-progress');
  });
});
