import React from 'react';
import { screen } from '@testing-library/react';
import { recipesApiMock as dataMock } from './mocks';
import * as ApiFuncs from '../services/recipesAPI';
import renderWithRouter from '../helpers/renderWithRouter';
import Bebidas from '../pages/Bebidas';
import RenderRecipes from '../components/RenderRecipes';
import renderPath from '../helpers/renderPath';

describe('Testa funcionamento do componente RenderRecipes', () => {
  it('Verifica se o componente RenderRecipes renderiza todos os cards', async () => {
    renderWithRouter(
      <RenderRecipes items={ dataMock.drinks } />,
    );
    const allCards = screen.getAllByTestId(/recipe-card/i);
    expect(allCards.length).toBe(dataMock.drinks.length);
  });
  it('Verifica se renderiza a imagem do item e o nome', () => {
    renderWithRouter(
      <RenderRecipes items={ dataMock.drinks } />,
    );
    dataMock.drinks.forEach((drink, index) => {
      const nameRecipe = screen.getByTestId(`${index}-card-name`);
      const imgRecipe = screen.getByTestId(`${index}-card-img`);
      expect(nameRecipe).toHaveTextContent(drink.strDrink);
      expect(imgRecipe).toHaveAttribute('src', drink.strDrinkThumb);
    });
  });
});

describe('Testa funcionamento da pagina de bebidas/comidas', () => {
  it('verifica se o header esta sendo renderizado', () => {
    renderWithRouter(<Bebidas />);
    const titleHeader = screen.getByText(/bebidas/i);
    expect(titleHeader).toBeInTheDocument();
  });
  it('verifica se a api retornar apenas uma'
  + 'receita sera redirecionado para tela de detalhes', async () => {
    const oneRecipe = {
      drinks: [{
        idDrink: '15997',
        strDrink: 'GG',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      }],
    };

    jest.spyOn(ApiFuncs, 'recipesApiList')
      .mockImplementation(() => Promise.resolve(oneRecipe));

    renderPath('/bebidas');
    expect(await screen.findByText('GG')).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
  });

  it('verifica se a api retornar apenas uma'
  + 'receita sera redirecionado para tela de detalhes', async () => {
    const oneRecipe = {
      meals: [{
        idMeal: '52977',
        strMeal: 'Corba',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      }],
    };

    jest.spyOn(ApiFuncs, 'recipesApiList')
      .mockImplementation(() => Promise.resolve(oneRecipe));

    renderPath('/comidas');
    expect(await screen.findByText('Corba')).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
  });
});
