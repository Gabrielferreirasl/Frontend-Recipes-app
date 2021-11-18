import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import RecipesProvider from '../provider/RecipesProvider';

const renderWithRouter = (component) => { // função helper para testar routes no RTL
  const history = createMemoryHistory();
  return ({
    ...render(
      <RecipesProvider>
        <Router history={ history }>{ component }</Router>
      </RecipesProvider>,
    ),
    history,
  });
};

export default renderWithRouter;
