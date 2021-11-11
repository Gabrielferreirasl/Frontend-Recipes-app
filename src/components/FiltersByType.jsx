import React from 'react';
import PropTypes from 'prop-types';

function FiltersByType({ setState, filters: { type } }) {
  const handlClick = ({ target }, setStateFilter) => {
    const { value } = target;
    setStateFilter({
      type: value === type ? 'all' : value,
    });
  };

  return (
    <>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ (ev) => handlClick(ev, setState) }
        value="all"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ (ev) => handlClick(ev, setState) }
        value="comida"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ (ev) => handlClick(ev, setState) }
        value="bebida"
      >
        Drinks
      </button>
    </>
  );
}

FiltersByType.propTypes = {
  setState: PropTypes.func.isRequired,
  filters: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FiltersByType;
