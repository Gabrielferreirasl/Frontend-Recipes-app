import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';
import App from '../App';
import RecipesProvider from '../provider/RecipesProvider';

const renderPath = (path) => {
  const history = createBrowserHistory();
  history.push(path);
  const { ...resources } = render(
    <RecipesProvider>
      <Router history={ history }>
        <App />
      </Router>
    </RecipesProvider>,
  );
  return { ...resources, history };
};

export default renderPath;
