import PropTypes from 'prop-types';
import React, { useState } from 'react';
import setLocalStorage from '../helpers';
// import RecipesContext from '../context/RecipesContext';

function Login({ history }) {
  const [emailAndPassword, setEmailAndPassword] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setEmailAndPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateLoginBtn = () => {
    const NUMBER_SIX = 6;
    const regexMail = /\S+@\S+\.\S+/;
    return !(emailAndPassword.password.length > NUMBER_SIX
        && regexMail.test(emailAndPassword.email));
  };

  const handleClickLogin = () => {
    setLocalStorage('mealsToken', 1);
    setLocalStorage('cocktailsToken', 1);
    setLocalStorage('user', { email: emailAndPassword.email });
    setLocalStorage('doneRecipes', []);
    history.push('/comidas');
  };

  return (
    <main>
      <h3>Login</h3>
      <input
        name="email"
        value={ emailAndPassword.email }
        placeholder="Email"
        data-testid="email-input"
        type="text"
        onChange={ (ev) => handleChange(ev) }
      />
      <input
        name="password"
        value={ emailAndPassword.password }
        placeholder="Senha"
        data-testid="password-input"
        type="text"
        onChange={ (ev) => handleChange(ev) }
      />
      <button
        disabled={ validateLoginBtn() }
        data-testid="login-submit-btn"
        type="button"
        onClick={ () => handleClickLogin() }
      >
        Entrar
      </button>
    </main>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
