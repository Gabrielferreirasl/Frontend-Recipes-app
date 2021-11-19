import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import renderPath from '../helpers/renderPath';
import Perfil from '../pages/Perfil';

describe('1- Verifica se o email correto aparece na tela', () => {
  test('1.2- testa se o email correto é exibido', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'email@email.com' }));
    // Storage.prototype.getItem = jest.fn(() => ({ email: 'email@email' }));
    renderWithRouter(<Perfil />);
    const profileMail = screen.getByText('email@email.com');
    expect(profileMail).toBeInTheDocument();
  });
  test('1.3- verifica se o botão de Receitas feitas funciona ', () => {
    renderPath('/perfil');
    userEvent.click(screen.getByTestId('profile-done-btn'));
    const title = screen.getByText('Receitas Feitas');
    expect(title).toBeInTheDocument();
  });
  test('1.3- verifica se o botão de Receitas favoritas funciona ', () => {
    renderPath('/perfil');
    userEvent.click(screen.getByTestId('profile-favorite-btn'));
    const favoritesTitle = screen.getByText('Receitas Favoritas');
    expect(favoritesTitle).toBeInTheDocument();
  });
  test('1.3- verifica se o botão de Sair funciona ', () => {
    renderPath('/perfil');
    userEvent.click(screen.getByTestId('profile-logout-btn'));
    const loginTitle = screen.getByText('Login');
    expect(loginTitle).toBeInTheDocument();
  });
  test('1.4- verifica se o localStorage fica vazio ao de Sair', () => {
    const { history } = renderPath('/perfil');
    userEvent.click(screen.getByTestId('profile-logout-btn'));
    expect(history.location.pathname).toBe('/');
    expect(localStorage.getItem('user')).toBe(null);
    history.push('/perfil');
    const EMAIL_USER = screen.getByTestId('profile-email');
    expect(EMAIL_USER.value).toBe(undefined);
  });
});
