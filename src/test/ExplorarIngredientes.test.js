import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';
import * as APIfuncs from '../services/recipesAPI';
import renderPath from '../helpers/renderPath';
import 'mutationobserver-shim';

const ingredientsData = [
  {
    idIngredient: '1',
    strIngredient: 'Chicken',
  },
  {
    idIngredient: '2',
    strIngredient: 'Salmon',
  },
  {
    idIngredient: '3',
    strIngredient: 'Beef',
  },
  {
    idIngredient: '4',
    strIngredient: 'Pork',
  },
  {
    idIngredient: '5',
    strIngredient: 'Avocado',
  },
  {
    idIngredient: '9',
    strIngredient: 'Apple Cider Vinegar',
  },
  {
    idIngredient: '10',
    strIngredient: 'Asparagus',
  },
  {
    idIngredient: '11',
    strIngredient: 'Aubergine',
  },
  {
    idIngredient: '12',
    strIngredient: 'Baby Plum Tomatoes',
  },
];

const recipesByIngredientData = [
  {
    strMeal: 'Brown Stew Chicken',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg',
    idMeal: '52940',
  },
  {
    strMeal: 'Chicken & mushroom Hotpot',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg',
    idMeal: '52846',
  },
  {
    strMeal: 'Chicken Alfredo Primavera',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg',
    idMeal: '52796',
  },
];

jest.spyOn(APIfuncs, 'getIngredients')
  .mockImplementation(() => Promise.resolve(ingredientsData));

jest.spyOn(APIfuncs, 'getRecipesByIngredient')
  .mockImplementation(() => Promise.resolve(recipesByIngredientData));

describe('testa funcionamento da pagina "explorar/comidas/ingredientes"', () => {
  it('verifica se renderiza os ingredientes', async () => {
    renderPath('/explorar/comidas/ingredientes');
    expect(await screen.findByText(/chicken/i)).toBeInTheDocument();
    expect(await screen.findByText(/baby plum tomatoes/i)).toBeInTheDocument();
  });
  it('verifica se ao clicar em algum ingrediente redireciona para tela'
    + ' principal com as receitas filtradas pelo ingrediente clicado', async () => {
    const { history } = renderPath('/explorar/comidas/ingredientes');
    const chickenBtn = await screen.findByText(/chicken/i);
    userEvent.click(chickenBtn);

    await waitFor(async () => {
      expect(history.location.pathname).toBe('/comidas');
      expect(await screen.findByText('Brown Stew Chicken')).toBeInTheDocument();
    });
  });
});
