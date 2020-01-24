import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.scss';
import { getRecipes, loadDataFromServer } from './store/store';
import RecipesList from './components/RecipesList';
import Form from './components/Form';

function App({ recipes, loadData }) {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div>
      <header>
        <h1>Cook book</h1>
        <button
          className="header__button"
          onClick={handleClick}
          type="button"
        >
          Add new recipe
        </button>
        <Form isClicked={isClicked} setIsClicked={setIsClicked} />
      </header>
      <RecipesList recipes={recipes} />
    </div>
  );
}

const mapStateToProps = state => ({
  recipes: getRecipes(state),
});

const mapMethodsToProps = {
  loadData: loadDataFromServer,
};

App.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapMethodsToProps)(App);
