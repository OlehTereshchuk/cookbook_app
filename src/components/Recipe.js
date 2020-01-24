import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import RecipeHistory from './RecipeHistory';
import { setEditedRecipe } from '../store/store';

const Recipe = ({
  id, preparing, title, date, currentEditableItem,
  setCurrentEditableItem, editRecipe, history,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [inputValue, setInputValue] = useState(preparing);
  const [isHistoryOpened, setIsHistoryOpened] = useState(false);

  const handleEditClick = () => {
    setIsEditable(true);
    setCurrentEditableItem(id);
  };

  const handleInputChange = ({ target }) => {
    setInputValue(target.value);
  };

  const handleEditClose = () => {
    setIsEditable(false);
    setCurrentEditableItem(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() !== preparing) {
      const preparedDate = date
        .toLocaleDateString()
        .split('.')
        .reverse()
        .join('-');

      editRecipe(id, inputValue, preparedDate, preparing);
    }

    handleEditClose();
  };

  const handleHistoryShow = () => {
    setIsHistoryOpened(!isHistoryOpened);
  };

  return (
    <>
      <div className="list__item">
        <dt className="item__heading">
          <span className="item__title">{title}</span>
          <span className="item__date">{date.toLocaleDateString()}</span>
        </dt>
        <dd className="item__description">
          <button
            type="button"
            className="item__edit-icon"
            onClick={handleEditClick}
          />
          {preparing}
        </dd>
        {history.length > 0 && (
          <>
            <img
              src={isHistoryOpened
                ? './images/arrow-up.svg'
                : './images/arrow-down.svg'}
              alt={isHistoryOpened ? 'arrow up' : 'arrow donw'}
              className="item__arrow"
              onClick={handleHistoryShow}
            />
            <div
              className={cn('item__history', {
                'item__history--opened': isHistoryOpened,
              })}
            >
              <RecipeHistory history={history} />
            </div>
          </>
        )}
      </div>
      {currentEditableItem === id && isEditable && (
        <form
          className="item__edit-field"
          onSubmit={handleSubmit}
        >
          <button
            type="button"
            className="form__close"
            onClick={handleEditClose}
          >
            X
          </button>
          <h2 className="form__title">{title}</h2>
          <label className="form__label" htmlFor="edit-textarea">
            Preparing:
            <textarea
              id="edit-textarea"
              className="form__textarea"
              onChange={handleInputChange}
              value={inputValue}
              required
            />
          </label>
          <input type="submit" className="form__submit" value="Edit recipe" />
        </form>
      )}
    </>
  );
};

const mapMethodsToProps = {
  editRecipe: setEditedRecipe,
};

Recipe.propTypes = {
  id: PropTypes.string.isRequired,
  preparing: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  currentEditableItem: PropTypes.string,
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCurrentEditableItem: PropTypes.func.isRequired,
  editRecipe: PropTypes.func.isRequired,
};

Recipe.defaultProps = {
  currentEditableItem: null,
};

export default connect(null, mapMethodsToProps)(Recipe);
