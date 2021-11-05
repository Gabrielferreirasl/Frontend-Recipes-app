import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RecipesProvider from './provider/RecipesProvider';
import Comidas from './pages/Comidas';
import Explorar from './pages/Explorar';
import Perfil from './pages/Perfil';

function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/explorar" component={ Explorar } />
          <Route exact path="/perfil" component={ Perfil } />
        </Switch>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
