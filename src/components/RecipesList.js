import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Recipe from './Recipe';

const RecipesList = ({ recipes }) => {
  const [currentEditableItem, setCurrentEditableItem] = useState(null);

  return (
    <dl className="list">
      {recipes.map(({
        id_recipe: id, title, preparing, date_of_post, history,
      }) => {
        const dateParts = date_of_post.split('-');
        const date = new Date(
          dateParts[0], dateParts[1] - 1,
          dateParts[2].substr(0, 2),
        );

        return (
          <Recipe
            history={history}
            currentEditableItem={currentEditableItem}
            setCurrentEditableItem={setCurrentEditableItem}
            key={id}
            id={id}
            title={title}
            preparing={preparing}
            date={date}
          />
        );
      })}
    </dl>
  );
};

RecipesList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipesList;
