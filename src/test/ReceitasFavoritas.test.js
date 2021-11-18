import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import ReceitasFavoritas from '../pages/ReceitasFavoritas';

const FAVORITE_RECIPES = [
  {
    alcoholicOrNot: 'Alcoholic',
    area: '',
    category: 'Cocktail',
    id: '17222',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    name: 'A1',
    type: 'bebida',
  },
  {
    alcoholicOrNot: '',
    area: 'Italian',
    category: 'Miscellaneous',
    id: '53014',
    image: 'https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg',
    name: 'Pizza Express Margherita',
    type: 'comida',
  },
];

const ORIGINAL_CLIPBOARD = { ...global.navigator.clipboard };

beforeEach(() => {
  const mockClipboard = {
    writeText: jest.fn(),
  };
  global.navigator.clipboard = mockClipboard;
});

afterEach(() => {
  jest.resetAllMocks();
  global.navigator.clipboard = ORIGINAL_CLIPBOARD;
});

// Source: https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest

describe('Testa a página de receitas favoritas', () => {
  it('Testa se a página contém um heading h2 com o texto "Receitas Favoritas"', () => {
    renderWithRouter(<ReceitasFavoritas />);
    const favoriteRecipesTitle = screen.getByRole('heading', {
      level: 2,
      name: /receitas favoritas/i,
    });
    expect(favoriteRecipesTitle).toBeInTheDocument();
  });

  it('Testa se botões estão sendo renderizados', () => {
    renderWithRouter(<ReceitasFavoritas />);
    const renderAllBtn = screen.getByRole('button', {
      name: /all/i,
    });
    expect(renderAllBtn).toBeInTheDocument();

    const renderFoodBtn = screen.getByRole('button', {
      name: /food/i,
    });
    expect(renderFoodBtn).toBeInTheDocument();

    const renderDrinksBtn = screen.getByRole('button', {
      name: /drinks/i,
    });
    expect(renderDrinksBtn).toBeInTheDocument();
  });

  it('Testa se os cards de comida e bebida são renderizados corretamente', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(FAVORITE_RECIPES));
    renderWithRouter(<ReceitasFavoritas />);

    const renderImg = screen.getByTestId('0-horizontal-image');
    expect(renderImg).toBeInTheDocument();
    expect(renderImg.src).toBe('https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg');

    const renderName = screen.getByTestId('1-horizontal-name');
    expect(renderName).toBeInTheDocument();
    expect(renderName.innerHTML).toBe('Pizza Express Margherita');

    const renderTopText = screen.getByTestId('0-horizontal-top-text');
    expect(renderTopText).toBeInTheDocument();

    const renderShareBtn1 = screen.getByTestId('0-horizontal-share-btn');
    expect(renderShareBtn1).toBeInTheDocument();

    const renderShareBtn2 = screen.getByTestId('1-horizontal-share-btn');
    expect(renderShareBtn2).toBeInTheDocument();
    expect(renderShareBtn2).toHaveAttribute('src');

    userEvent.click(renderShareBtn1);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();

    const linkCopied = screen.getByText(/link copiado/i);
    expect(linkCopied).toBeInTheDocument();

    const renderFavoriteBtn = screen.getByTestId('1-horizontal-favorite-btn');
    expect(renderFavoriteBtn).toBeInTheDocument();

    userEvent.click(renderFavoriteBtn);
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  });
});
