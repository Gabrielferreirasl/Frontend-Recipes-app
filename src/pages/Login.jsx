import React, { useState } from 'react';
// import RecipesContext from '../context/RecipesContext';

function Login() {
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

  const validateEmail = (email) => {
    const regexMail = /\S+@\S+\.\S+/;
    return regexMail.test(email);
  };

  const validateLoginBtn = () => {
    const NUMBER_SIX = 6;
    return !(emailAndPassword.password.length > NUMBER_SIX
        && validateEmail(emailAndPassword.email));
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
      >
        Entrar
      </button>
    </main>
  );
}

export default Login;
