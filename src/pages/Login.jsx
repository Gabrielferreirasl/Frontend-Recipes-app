import PropTypes from 'prop-types';
import React, { useState } from 'react';
import setLocalStorage from '../helpers';
import '../style/login.css';

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
    history.push('/comidas');
  };

  return (
    <main className="container-login text-center login-group">
      <h1 className="title-login mb-2 text-white">Login</h1>
      <section className="text-center">
        <div className="input-group mb-3">
          <input
            name="email"
            value={ emailAndPassword.email }
            className="form-control mx-auto email"
            placeholder="Email"
            data-testid="email-input"
            type="text"
            onChange={ (ev) => handleChange(ev) }
          />
        </div>
        <div className="input-group mb-3">
          <input
            name="password"
            value={ emailAndPassword.password }
            placeholder="Senha"
            className="form-control mx-auto  pass"
            data-testid="password-input"
            type="password"
            onChange={ (ev) => handleChange(ev) }
          />
        </div>
      </section>
      <button
        disabled={ validateLoginBtn() }
        data-testid="login-submit-btn"
        className="btn-entrar btn-block btn-lg mx-auto"
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
