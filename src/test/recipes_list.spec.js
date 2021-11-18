import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { recipesApiMock as dataMock,
  oneRecipe, categoryApi, RecipesDrinksCocktail, searchIngredientIce } from './mocks';
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
  it('Verifica se ao clicar em um card da receita '
  + 'é redirecionado para tela de detalhes dessa receita', () => {
    renderWithRouter(
      <RenderRecipes items={ dataMock.drinks } />,
    );
    const recipeLink = screen.getByTestId('0-link-card');
    expect(recipeLink).toHaveAttribute('href', '/bebidas/15997');
  });
});

describe('Testa funcionamento da pagina de bebidas/comidas', () => {
  beforeEach(() => {
    jest.spyOn(ApiFuncs, 'recipesApiList')
      .mockImplementation(() => Promise.resolve(oneRecipe));
  });
  afterEach(cleanup);

  it('verifica se o header esta sendo renderizado', () => {
    renderWithRouter(<Bebidas />);
    const titleHeader = screen.getByText(/bebidas/i);
    expect(titleHeader).toBeInTheDocument();
  });
  it('verifica se a api retornar apenas uma receita de bebida'
  + ' sera redirecionado para tela de detalhes', async () => {
    renderPath('/bebidas');
    expect(await screen.findByText('GG')).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
  });

  it('verifica se a api retornar apenas uma receita de comida'
  + 'receita sera redirecionado para tela de detalhes', async () => {
    renderPath('/comidas');
    expect(await screen.findByText('Corba')).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
  });
});

describe('Verifica funcionamento dos botões de filtro por'
+ 'categoria na tela principal', () => {
  beforeEach(() => {
    jest.spyOn(ApiFuncs, 'recipesApiList')
      .mockImplementation(() => Promise.resolve(dataMock));
    jest.spyOn(ApiFuncs, 'categoryRecipesApi')
      .mockImplementation(() => Promise.resolve(categoryApi));
    jest.spyOn(ApiFuncs, 'recipesByCategoryApi')
      .mockImplementation(() => Promise.resolve(RecipesDrinksCocktail));
  });

  afterEach(cleanup);

  it('Verifica se a pagina esta renderizando'
    + 'todas os botões categorias de acordo com a pagina "bebidas/comidas"', async () => {
    renderPath('/bebidas');
    const button = await screen.findByText('Ordinary Drink');
    expect(button).toBeInTheDocument();
  });

  it('Verifica se ao clicar na categoria renderiza'
  + 'somente as receitas da categoria selecionada', async () => {
    renderPath('/bebidas');
    expect(await screen.findByText('GG')).toBeInTheDocument();
    const buttonCocktail = await screen.findByText('Cocktail');
    expect(buttonCocktail).toBeInTheDocument();

    userEvent.click(buttonCocktail);
    expect(await screen.findByText(/155 Belmont/i)).toBeInTheDocument();
  });
});

describe('Verifica funcionamento dos filtros do header', () => {
  beforeEach(() => {
    jest.spyOn(ApiFuncs, 'recipesApiList')
      .mockImplementation(() => Promise.resolve(dataMock));
    jest.spyOn(ApiFuncs, 'categoryRecipesApi')
      .mockImplementation(() => Promise.resolve(categoryApi));
  });

  jest.spyOn(ApiFuncs, 'recipesAPI')
    .mockImplementation(() => Promise.resolve(searchIngredientIce));

  it('verifica se ao pesquisar por ingrediente,'
    + 'renderiza receitas somente o ingrediente pesquisado', async () => {
    renderPath('/bebidas');
    const buttonOpen = await screen.findByTestId('search-button');
    expect(buttonOpen).toBeInTheDocument();

    userEvent.click(buttonOpen);
    const inputSearch = await screen.findByTestId('search-input');
    const checkIngredient = await screen.findByLabelText(/ingrediente/i);
    const buttonSearch = await screen.findByTestId('exec-search-btn');
    expect(checkIngredient).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();

    userEvent.type(inputSearch, 'ice');
    userEvent.click(checkIngredient);
    userEvent.click(buttonSearch);
    expect(await screen.findByText('A Piece of Ass')).toBeInTheDocument();
  });
});
