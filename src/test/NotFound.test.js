import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa a página não encontrada', () => {
  it('teste se a mensagem "not found" é renderizada na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comias');
    const notFoundPage = screen.getByText(/Not Found/i);
    expect(notFoundPage).toBeInTheDocument();

    history.push('/comidas');
    expect(notFoundPage).not.toBeInTheDocument();
  });
});
