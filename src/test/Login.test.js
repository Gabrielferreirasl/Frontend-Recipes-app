import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const INFO_EMAIL = 'matheus@trybe.com';
const SENHA_TRUSTLY = 'senha-dificil';
const ID_INPUT_EMAIL = 'email-input';
const ID_INPUT_PASSAWORD = 'password-input';
const ID_BUTTON_SUBMIT = 'login-submit-btn';

describe('1º Verifica se é possivel digitar nos imputs de login', () => {
  it('Verifica se é possivel digitar o email', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(ID_INPUT_EMAIL);
    expect(inputEmail).toBeInTheDocument();

    userEvent.click(inputEmail);
    userEvent.type(inputEmail, INFO_EMAIL);
    expect(inputEmail).toHaveValue(INFO_EMAIL);
  });
  it('Verifica se é possivel digitar a senha', () => {
    renderWithRouter(<App />);
    const inputPassword = screen.getByTestId(ID_INPUT_PASSAWORD);
    expect(inputPassword).toBeInTheDocument();

    userEvent.click(inputPassword);
    userEvent.type(inputPassword, SENHA_TRUSTLY);
    expect(inputPassword).toHaveValue(SENHA_TRUSTLY);
  });
});

describe('2º Verifica se é possivel logar ao clicar no botão "entrar" ', () => {
  it('o botão "Entrar" deve estar desabilitado quando a pagina carrega', () => {
    renderWithRouter(<App />);
    const buttonSubmit = screen.getByTestId(ID_BUTTON_SUBMIT);
    expect(buttonSubmit).toBeInTheDocument();
    expect(buttonSubmit).toHaveAttribute('disabled');
  });
  it('verifica se o botão só é habilitado se for digitado email valido'
  + 'e senha com mais de 6 digitos', () => {
    renderWithRouter(<App />);

    const buttonSubmit = screen.getByTestId(ID_BUTTON_SUBMIT);
    const inputEmail = screen.getByTestId(ID_INPUT_EMAIL);
    const inputPassword = screen.getByTestId(ID_INPUT_PASSAWORD);

    userEvent.click(inputEmail);
    userEvent.type(inputEmail, INFO_EMAIL);
    userEvent.click(inputPassword);
    userEvent.type(inputPassword, SENHA_TRUSTLY);
    expect(buttonSubmit.disabled).toBe(false);
  });
  it('verifica se ao clicar no botão "entrar" renderiza a pagina comidas', () => {
    renderWithRouter(<App />);

    const buttonSubmit = screen.getByTestId(ID_BUTTON_SUBMIT);
    const inputEmail = screen.getByTestId(ID_INPUT_EMAIL);
    const inputPassword = screen.getByTestId(ID_INPUT_PASSAWORD);

    userEvent.click(inputEmail);
    userEvent.type(inputEmail, INFO_EMAIL);
    userEvent.click(inputPassword);
    userEvent.type(inputPassword, SENHA_TRUSTLY);
    userEvent.click(buttonSubmit);
    const textBebidas = screen.getByText(/comidas/i);
    expect(textBebidas).toBeInTheDocument();
  });
});
