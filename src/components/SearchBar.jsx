import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { recipesAPI } from '../services/recipesAPI';

function SearchBar() {
  const history = useHistory();
  const [searchInfo, setSearchInfo] = useState({
    search: '',
    type: '',
  });

  const { changeRecipes, setFilters } = useContext(RecipesContext);

  const handleChange = ({ target: { value, name } }) => {
    setSearchInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickSearch = async () => {
    if (searchInfo.type === 'Primeira letra' && searchInfo.search.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const result = await recipesAPI(searchInfo, history.location.pathname);
    const key = history.location.pathname.includes('/bebidas') ? 'drinks' : 'meals';
    if (result[key] === null) {
      return global.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
    changeRecipes(key, result[key]);
    setFilters({
      category: {
        status: false,
        filter: '',
      },
    });
  };

  return (
    <div className="container-searchbar">
      <input
        className="form-control mx-auto email"
        onChange={ (ev) => handleChange(ev) }
        placeholder="Buscar Receita"
        value={ searchInfo.search }
        type="text"
        name="search"
        data-testid="search-input"
      />
      <div className="container-itemsearch">
        <label htmlFor="ingredient">
          Ingrediente
          <input
            onChange={ (ev) => handleChange(ev) }
            data-testid="ingredient-search-radio"
            type="radio"
            name="type"
            id="ingredient"
            value="Ingrediente"
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            className="mb-3"
            onChange={ (ev) => handleChange(ev) }
            value="Nome"
            data-testid="name-search-radio"
            type="radio"
            name="type"
            id="name"
          />
        </label>
        <label htmlFor="first-letter">
          Primeira letra
          <input
            onChange={ (ev) => handleChange(ev) }
            data-testid="first-letter-search-radio"
            type="radio"
            name="type"
            id="first-letter"
            value="Primeira letra"
          />
        </label>
      </div>
      <button
        className="btn btn-light"
        onClick={ () => handleClickSearch() }
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
