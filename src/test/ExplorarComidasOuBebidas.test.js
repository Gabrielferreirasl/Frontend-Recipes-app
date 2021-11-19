import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPath from '../helpers/renderWithRouter';

describe('Testa a página de exprorar comidas ou bebidas', () => {
  it('Testa a página de comidas', () => {
    const { history } = renderPath('/explorar/comidas');

    const byIngredientBtn = screen.getByTestId('explore-by-ingredient');
    const byLocalOriginBtn = screen.getByTestId('explore-by-area');
    const SurpriseMeBtn = screen.getByTestId('explore-surprise');

    userEvent.click(byIngredientBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
    expect(byLocalOriginBtn).toBeInTheDocument();
    expect(SurpriseMeBtn).toBeInTheDocument();
  });
});
