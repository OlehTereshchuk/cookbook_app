import React from 'react';
import PropTypes from 'prop-types';

const RecipeHistory = ({ history }) => (
  <ul>
    {history.map(({ prev_preparing: preparing, id }) => (
      <li key={id}>
        {preparing}
      </li>
    ))}
  </ul>
);

RecipeHistory.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipeHistory;
