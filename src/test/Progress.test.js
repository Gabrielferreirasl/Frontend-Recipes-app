import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import recipeByIdComida from '../mocks/recipeByIdComida';
import * as APIfuncs from '../services/recipesAPI';
import renderPath from '../helpers/renderPath';

const getRecipeByIdMock = jest.spyOn(APIfuncs, 'getRecipeById')
  .mockImplementation(() => Promise.resolve(recipeByIdComida));

const ingredients = Object.keys(recipeByIdComida).filter((key) => (
  key.includes('strIngredient') && recipeByIdComida[key] !== ''
      && recipeByIdComida[key] !== null));

const testIdFinish = 'finish-recipe-btn';

describe('Verifica a tela de "Progresso"', () => {
  test('verifica se as informações estão na tela', async () => {
    renderPath('/comidas/52771/in-progress');
    expect(getRecipeByIdMock).toBeCalled();
    expect(await screen.findByTestId('0-ingredient-step'))
      .toBeInTheDocument();

    ingredients.forEach(async (ing, indice) => {
      expect(await screen.getByTestId(`${indice}-ingredient-step`))
        .toBeInTheDocument();
      const checkbox = await screen.getByRole('checkbox',
        { name:
            `${recipeByIdComida[ing]} ${recipeByIdComida[`strMeasure${indice + 1}`]}` });
      expect(checkbox.checked).toBeFalsy();
    });

    expect(await screen.getByTestId(testIdFinish).disabled).toBeTruthy();
  });
  test('Verifica a funcionalidade do checkbox e dobotão de finalizar', async () => {
    const { history } = renderPath('/comidas/52771/in-progress');
    expect(getRecipeByIdMock).toBeCalled();
    expect(await screen.findByTestId('0-ingredient-step'))
      .toBeInTheDocument();

    ingredients.forEach(async (ing, indice) => {
      expect(await screen.getByTestId(`${indice}-ingredient-step`))
        .toBeInTheDocument();
      const checkbox = await screen.getByRole('checkbox',
        { name:
           `${recipeByIdComida[ing]} ${recipeByIdComida[`strMeasure${indice + 1}`]}` });
      expect(checkbox.checked).toBeFalsy();
      userEvent.click(checkbox);
      expect(checkbox.checked).toBeTruthy();
    });

    expect(await screen.findByTestId(testIdFinish).disabled).toBeFalsy();

    userEvent.click(await screen.findByTestId(testIdFinish));
    expect(history.location.pathname).toBe('/receitas-feitas');
  });
});
