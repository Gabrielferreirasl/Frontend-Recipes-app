import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import ReceitasFeitas from '../pages/ReceitasFeitas';

const DONE_RECIPE = [
  {
    alcoholicOrNot: 'Alcoholic',
    area: '',
    category: 'Shot',
    doneDate: '16/11/2021',
    id: '14229',
    image: 'https://www.thecocktaildb.com/images/media/drink/xxsxqy1472668106.jpg',
    name: '747',
    tags: [],
    type: 'bebida',
  },
  {
    alcoholicOrNot: '',
    area: 'Turkish',
    category: 'Side',
    doneDate: '17/11/2021',
    id: '52978',
    image: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
    name: 'Kumpir',
    tags: ['SideDish'],
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

describe('Testa a página de receitas feitas', () => {
  it('Testa se a página contém um heading h2 com o texto "Receitas Feitas"', () => {
    renderWithRouter(<ReceitasFeitas />);
    const doneRecipesTitle = screen.getByRole('heading', {
      level: 2,
      name: /receitas feitas/i,
    });
    expect(doneRecipesTitle).toBeInTheDocument();
  });

  it('Testa se botões estão sendo renderizados', () => {
    renderWithRouter(<ReceitasFeitas />);
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
    localStorage.setItem('doneRecipes', JSON.stringify(DONE_RECIPE));
    renderWithRouter(<ReceitasFeitas />);

    const renderImg = screen.getByTestId('0-horizontal-image');
    expect(renderImg).toBeInTheDocument();
    expect(renderImg.src).toBe('https://www.thecocktaildb.com/images/media/drink/xxsxqy1472668106.jpg');

    const renderAlcoholic = screen.getByText(/alcoholic/i);
    expect(renderAlcoholic).toBeInTheDocument();

    const renderName = screen.getByTestId('1-horizontal-name');
    expect(renderName).toBeInTheDocument();
    expect(renderName.innerHTML).toBe('Kumpir');

    const renderTopText = screen.getByTestId('0-horizontal-top-text');
    expect(renderTopText).toBeInTheDocument();

    const renderDate = screen.getByTestId('1-horizontal-done-date');
    expect(renderDate).toBeInTheDocument();
    expect(renderDate.innerHTML).toBe('17/11/2021');

    const renderTag = screen.getByTestId('1-SideDish-horizontal-tag');
    expect(renderTag).toBeInTheDocument();

    const renderShareBtn = screen.getByTestId('1-horizontal-share-btn');
    expect(renderShareBtn).toBeInTheDocument();
    expect(renderShareBtn).toHaveAttribute('src');

    userEvent.click(renderShareBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();

    const linkCopied = screen.getByText(/link copiado/i);
    expect(linkCopied).toBeInTheDocument();
  });
});
