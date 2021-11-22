import React from 'react';
import PropTypes from 'prop-types';
import getListForEach from './scripts';

function CardsRecipesSkeleton({ numberCards }) {
  return (
    <div className="container-recipes-principal">
      {
        getListForEach(numberCards).map((number) => (
          <div key={ number } className="card-recipe-skeleton" />
        ))
      }
    </div>
  );
}

CardsRecipesSkeleton.propTypes = {
  numberCards: PropTypes.number.isRequired,
};

export default CardsRecipesSkeleton;
