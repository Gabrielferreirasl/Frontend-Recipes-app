import React from 'react';
import PropTypes from 'prop-types';
import getListForEach from './scripts';

export default function RenderCategorySkeleton({ numberCards }) {
  return (
    <>
      {
        getListForEach(numberCards).map((number) => (
          <button
            className="skeleton-category"
            key={ number }
            type="button"
            value=""
          >
            { }
          </button>
        ))
      }
    </>
  );
}

RenderCategorySkeleton.propTypes = {
  numberCards: PropTypes.number.isRequired,
};
