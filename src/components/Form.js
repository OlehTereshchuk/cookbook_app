import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import { setNewRecipe } from '../store/store';

const Form = ({ isClicked, addRecipe, setIsClicked }) => {
  const [inputValueTitle, setInputValueTitle] = useState('');
  const [inputValuePreparing, setInputValuePreparing] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValueTitle.trim() !== '' && inputValuePreparing.trim() !== '') {
      addRecipe(inputValueTitle, inputValuePreparing);
      setInputValuePreparing('');
      setInputValueTitle('');
    }
  };

  const handleInputChange = ({ target }) => {
    setInputValueTitle(target.value);
  };

  const handleTextareaChange = ({ target }) => {
    setInputValuePreparing(target.value);
  };

  const handleClose = () => {
    setIsClicked(false);
    setInputValuePreparing('');
    setInputValueTitle('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('form', {
        'form--active': isClicked,
      })}
    >
      <button
        type="button"
        className="form__close"
        onClick={handleClose}
      >
        X
      </button>
      <label htmlFor="input" className="form__label">
        Title:
        <input
          onChange={handleInputChange}
          value={inputValueTitle}
          id="input"
          type="text"
          className="form__input"
          name="title"
          required
        />
      </label>
      <label htmlFor="textarea" className="form__label">
        Preparing:
        <textarea
          onChange={handleTextareaChange}
          value={inputValuePreparing}
          name="preparing"
          id="textarea"
          className="form__textarea"
          required
        />
      </label>
      <input type="submit" className="form__submit" value="Add new recipe" />
    </form>
  );
};

const mapMethodsToProps = {
  addRecipe: setNewRecipe,
};

Form.propTypes = {
  isClicked: PropTypes.bool.isRequired,
  addRecipe: PropTypes.func.isRequired,
  setIsClicked: PropTypes.func.isRequired,
};

export default connect(null, mapMethodsToProps)(Form);
