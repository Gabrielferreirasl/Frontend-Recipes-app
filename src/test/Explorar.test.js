import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Explore from '../pages/Explore';

import profileIcon from '../images/profileIcon.png';

describe('testa funcionalidade da página de explorar', () => {
  it('Testa se a a imagem com o ícone de perfil e header aparecem na tela', () => {
    renderWithRouter(<Explore />);
    const header = screen.getByTestId('page-title');
    const imgProfile = screen.getByTestId('profile-top-btn');

    expect(imgProfile).toBeInTheDocument();
    expect(imgProfile).toHaveAttribute('src', profileIcon);
    expect(header).toBeInTheDocument();
  });

  it('Testa o botão de explorar Comidas', async () => {
    const { history } = renderWithRouter(<Explore />);
    const mealBtn = screen.getByTestId('explore-food');
    expect(mealBtn).toBeInTheDocument();

    userEvent.click(mealBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });

  it('Testa o botão de explorar Bebidas', () => {
    const { history } = renderWithRouter(<Explore />);
    const drinkBtn = screen.getByTestId('explore-drinks');
    expect(drinkBtn).toBeInTheDocument();

    userEvent.click(drinkBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
