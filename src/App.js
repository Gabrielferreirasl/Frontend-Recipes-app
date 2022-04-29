import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RecipesProvider from './provider/RecipesProvider';
import Meals from './pages/Meals';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import Details from './pages/Details';
import ExploreMealOrDrink from './pages/ExploreMealOrDrink';
import InProgress from './pages/InProgress';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreByArea from './pages/ExploreByArea';
import NotFound from './components/NotFound';

function App() { // app
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/comidas" component={ Meals } />
        <Route exact path="/comidas/:id" component={ Details } />
        <Route exact path="/explorar/comidas" component={ ExploreMealOrDrink } />
        <Route exact path="/explorar/bebidas" component={ ExploreMealOrDrink } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreIngredients }
        />
        <Route exact path="/explorar/comidas/area" component={ ExploreByArea } />
        <Route exact path="/comidas/:id/in-progress" component={ InProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ InProgress } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/bebidas/:id" component={ Details } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
