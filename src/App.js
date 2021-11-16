import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RecipesProvider from './provider/RecipesProvider';
import Comidas from './pages/Comidas';
import Explorar from './pages/Explorar';
import Perfil from './pages/Perfil';
import Bebidas from './pages/Bebidas';
import Details from './pages/Details';
import ExplorarComidasOuBedidas from './pages/ExplorarComidasOuBedidas';
import InProgress from './pages/InProgress';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ExplorarIngredientes from './pages/ExplorarIngredientes';
import ExplorarPorArea from './pages/ExplorarPorArea';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/perfil" component={ Perfil } />
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/comidas/:id" component={ Details } />
          <Route exact path="/explorar/comidas" component={ ExplorarComidasOuBedidas } />
          <Route exact path="/explorar/bebidas" component={ ExplorarComidasOuBedidas } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExplorarIngredientes }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExplorarIngredientes }
          />
          <Route exact path="/explorar/comidas/area" component={ ExplorarPorArea } />
          <Route exact path="/comidas/:id/in-progress" component={ InProgress } />
          <Route exact path="/bebidas/:id/in-progress" component={ InProgress } />
          <Route exact path="/explorar" component={ Explorar } />
          <Route exact path="/bebidas/:id" component={ Details } />
          <Route exact path="/bebidas" component={ Bebidas } />
          <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
