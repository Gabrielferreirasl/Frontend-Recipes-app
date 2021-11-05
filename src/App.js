import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RecipesProvider from './provider/RecipesProvider';

function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
