import { screen, fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import * as ApiFuncs from '../services/recipesAPI';
import renderPath from '../helpers/renderPath';

const mockAreas = [
  {
    strArea: 'American',
  },
  {
    strArea: 'British',
  },
  {
    strArea: 'Canadian',
  },
  {
    strArea: 'Chinese',
  },
  {
    strArea: 'Croatian',
  },
  {
    strArea: 'Dutch',
  },
  {
    strArea: 'Egyptian',
  },
  {
    strArea: 'French',
  },
  {
    strArea: 'Greek',
  },
  {
    strArea: 'Indian',
  },
  {
    strArea: 'Irish',
  },
  {
    strArea: 'Italian',
  },
  {
    strArea: 'Jamaican',
  },
  {
    strArea: 'Japanese',
  },
  {
    strArea: 'Kenyan',
  },
  {
    strArea: 'Malaysian',
  },
  {
    strArea: 'Mexican',
  },
  {
    strArea: 'Moroccan',
  },
  {
    strArea: 'Polish',
  },
  {
    strArea: 'Portuguese',
  },
  {
    strArea: 'Russian',
  },
  {
    strArea: 'Spanish',
  },
  {
    strArea: 'Thai',
  },
  {
    strArea: 'Tunisian',
  },
  {
    strArea: 'Turkish',
  },
  {
    strArea: 'Unknown',
  },
  {
    strArea: 'Vietnamese',
  },
];

const mockRecipes = {
  meals: [
    {
      idMeal: '52977',
      strMeal: 'Corba',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
  ],
};

const mockRecipesArea = {
  meals: [
    {
      strMeal: 'Banana Pancakes',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg',
      idMeal: '52855',
    },
    {
      strMeal: 'BBQ Pork Sloppy Joes',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/atd5sh1583188467.jpg',
      idMeal: '52995',
    },
    {
      strMeal: 'Beef Brisket Pot Roast',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/ursuup1487348423.jpg',
      idMeal: '52812',
    },
    {
      strMeal: 'Big Mac',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
      idMeal: '53013',
    }],
};

jest.spyOn(ApiFuncs, 'getAreas')
  .mockImplementation(() => Promise.resolve(mockAreas));
jest.spyOn(ApiFuncs, 'recipesApiList')
  .mockImplementation(() => Promise.resolve(mockRecipes));
jest.spyOn(ApiFuncs, 'getRecipesByArea')
  .mockImplementation(() => Promise.resolve(mockRecipesArea));

describe('testa funcionamento da pagina "explorar/comidas/area"', () => {
  it('verifica se esta renderizando todos local de origin', async () => {
    renderPath('/explorar/comidas/area');
    expect(await screen.findByTestId('All-option')).toBeInTheDocument();
    expect(await screen.findByTestId('American-option')).toBeInTheDocument();
  });
  it('testa se ao filtrar por "American" renderiza apenas receitas americanas',
    async () => {
      renderPath('/explorar/comidas/area');
      const inputSelect = await screen
        .findByTestId('explore-by-area-dropdown');
      fireEvent.change(inputSelect, { target: { value: 'American' } });
      expect(await screen.findByText('Banana Pancakes')).toBeInTheDocument();
    });
});
