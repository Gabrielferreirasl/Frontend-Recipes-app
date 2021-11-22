import React from 'react';
import PropTypes from 'prop-types';

function FiltersByType({ setState, filters: { type } }) {
  const handleClick = ({ target }, setStateFilter) => {
    const { value } = target;
    setStateFilter({
      type: value === type ? 'all' : value,
    });
  };

  return (
    <section className="filter-type-btn">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ (ev) => handleClick(ev, setState) }
        value="all"
        className="btn btn-light filter-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ (ev) => handleClick(ev, setState) }
        value="comida"
        className="btn btn-light filter-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ (ev) => handleClick(ev, setState) }
        value="bebida"
        className="btn btn-light filter-btn"
      >
        Drinks
      </button>
    </section>
  );
}

FiltersByType.propTypes = {
  setState: PropTypes.func.isRequired,
  filters: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FiltersByType;
