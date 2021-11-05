import React from 'react';
// import RecipesContext from '../context/RecipesContext';

function Login() {
  return (
    <main>
      <h3>Login</h3>
      <input placeholder="Email" data-testid="email-input" type="text" name="" id="" />
      <input placeholder="Senha" data-testid="password-input" type="text" name="" id="" />
      <button data-testid="login-submit-btn" type="button">Entrar</button>
    </main>
  );
}

export default Login;
