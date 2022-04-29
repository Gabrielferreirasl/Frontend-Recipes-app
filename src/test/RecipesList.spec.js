import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { recipesApiMock as dataMock,
  oneRecipe, categoryApi, RecipesDrinksCocktail,
  searchIngredientIce, searchNomeVodka, searchFirstLetter } from './mocks';
import * as ApiFuncs from '../services/recipesAPI';
import renderWithRouter from '../helpers/renderWithRouter';
import Drinks from '../pages/Drinks';
import RenderRecipes from '../components/RenderRecipes';
import renderPath from '../helpers/renderPath';

const openSearchBar = async () => {
  const buttonOpen = await screen.findByTestId('search-button');
  expect(buttonOpen).toBeInTheDocument();

  userEvent.click(buttonOpen);
};

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
    renderWithRouter(<Drinks />);
    const titleHeader = screen.getByText(/bebidas/i);
    expect(titleHeader).toBeInTheDocument();
  });
  it('verifica se a api retornar apenas uma receita de bebida'
  + ' sera redirecionado para tela de detalhes', async () => {
    const { history } = renderPath('/bebidas');
    expect(await screen.findByText('GG')).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas/15997');
  });

  it('verifica se a api retornar apenas uma receita de comida'
  + 'receita sera redirecionado para tela de detalhes', async () => {
    const { history } = renderPath('/comidas');
    expect(await screen.findByText('Corba')).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/52977');
  });
});

const mocksPrincipal = () => {
  jest.spyOn(ApiFuncs, 'recipesApiList')
    .mockImplementation(() => Promise.resolve(dataMock));
  jest.spyOn(ApiFuncs, 'categoryRecipesApi')
    .mockImplementation(() => Promise.resolve(categoryApi));
  jest.spyOn(ApiFuncs, 'recipesByCategoryApi')
    .mockImplementation(() => Promise.resolve(RecipesDrinksCocktail));
};

describe('Verifica funcionamento dos botões de filtro por'
+ ' categoria na tela principal', () => {
  beforeEach(mocksPrincipal);
  afterEach(cleanup);

  it('Verifica se a pagina esta renderizando'
    + 'todas os botões categorias de acordo com a pagina "bebidas/comidas"', async () => {
    renderPath('/bebidas');
    expect(await screen.findByText('Ordinary Drink')).toBeInTheDocument();
  });

  it('Verifica se ao clicar na categoria renderiza'
  + 'somente as receitas da categoria selecionada', async () => {
    renderPath('/bebidas');
    expect(await screen.findByText('GG')).toBeInTheDocument();
    userEvent.click(await screen.findByText('Cocktail'));
    expect(await screen.findByText(/155 Belmont/i)).toBeInTheDocument();
  });
});

const SEARCH_INPUT = 'search-input';
const EXEC_SEARCH_BTN = 'exec-search-btn';

describe('Verifica funcionamento dos filtros do header', () => {
  beforeEach(() => {
    jest.spyOn(ApiFuncs, 'recipesApiList')
      .mockImplementation(() => Promise.resolve(dataMock));
    jest.spyOn(ApiFuncs, 'categoryRecipesApi')
      .mockImplementation(() => Promise.resolve(categoryApi));
  });

  it('verifica se ao pesquisar por ingrediente,'
    + 'renderiza receitas somente o ingrediente pesquisado', async () => {
    jest.spyOn(ApiFuncs, 'recipesAPI')
      .mockImplementation(() => Promise.resolve(searchIngredientIce));
    renderPath('/bebidas');
    openSearchBar();
    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    const checkIngredient = await screen.findByLabelText(/ingrediente/i);
    const buttonSearch = await screen.findByTestId(EXEC_SEARCH_BTN);
    expect(checkIngredient).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();

    userEvent.type(inputSearch, 'ice');
    userEvent.click(checkIngredient);
    userEvent.click(buttonSearch);
    expect(await screen.findByText('A Piece of Ass')).toBeInTheDocument();
  });

  it('verifica se ao pesquisar por nome,'
  + 'renderiza apenas receitas com o nome pesquisado', async () => {
    jest.spyOn(ApiFuncs, 'recipesAPI')
      .mockImplementation(() => Promise.resolve(searchNomeVodka));
    renderPath('/bebidas');
    openSearchBar();
    userEvent.type(await screen.findByTestId(SEARCH_INPUT), 'vodka');
    userEvent.click(await screen.findByLabelText(/nome/i));
    userEvent.click(await screen.findByTestId(EXEC_SEARCH_BTN));
    expect(await screen.findByText('Long vodka')).toBeInTheDocument();
  });

  it('verifica se ao pesquisar pela primeira letra'
  + 'renderiza apenas receitas filtrado pela primeira letrar', async () => {
    jest.spyOn(ApiFuncs, 'recipesAPI')
      .mockImplementation(() => Promise.resolve(searchFirstLetter));
    renderPath('/bebidas');
    openSearchBar();
    userEvent.type(await screen.findByTestId(SEARCH_INPUT), 'a');
    userEvent.click(await screen.findByLabelText(/primeira letra/i));
    userEvent.click(await screen.findByTestId(EXEC_SEARCH_BTN));
    expect(await screen.findByText('A1')).toBeInTheDocument();
  });
});

describe('Verifica erros ao utilizar os filtros do header', () => {
  beforeEach(mocksPrincipal);
  it('verifica se ao pesquisar pelo filtro "primeira letra" com mais de uma letra'
  + ' renderiza na tela "Sua busca deve conter somente 1 (um) caracter"', async () => {
    const alert = jest.spyOn(global, 'alert').mockImplementation();
    renderPath('/bebidas');
    openSearchBar();
    userEvent.type(await screen.findByTestId(SEARCH_INPUT), 'aB');
    userEvent.click(await screen.findByLabelText(/primeira letra/i));
    userEvent.click(await screen.findByTestId(EXEC_SEARCH_BTN));
    expect(alert)
      .toHaveBeenCalledWith('Sua busca deve conter somente 1 (um) caracter');
  });

  it('verifica se ao pesquisar uma receita que nao existe renderiza um alert'
    + ' "Sinto muito, não encontramos nenhuma receita para esses filtros."', async () => {
    const alert = jest.spyOn(global, 'alert').mockImplementation();
    renderPath('/bebidas');
    openSearchBar();
    userEvent.type(await screen.findByTestId(SEARCH_INPUT), 'shake ovomaltine');
    userEvent.click(await screen.findByLabelText(/nome/i));
    userEvent.click(await screen.findByTestId(EXEC_SEARCH_BTN));
    expect(alert).toHaveBeenCalled();
  });
});
