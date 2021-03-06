import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  loadRecipes, loadPreviousRecipes, addRecipe, editRecipe
} from './api';

const SET_RECIPES = 'SET_RECIPES';

export const setRecipes = recipes => ({
  type: SET_RECIPES,
  recipes,
});

export const loadDataFromServer = () => async(dispatch) => {
  const [recipes, prevRecipes] = await Promise.all([
    loadRecipes(), loadPreviousRecipes()
  ]);

  const preparedData = recipes.map(recipe => ({
    ...recipe,
    history: prevRecipes.filter(
      prevRecipe => prevRecipe.id_recipe === recipe.id_recipe,
    ),
  }));

  dispatch(setRecipes(preparedData));
};

export const setNewRecipe = (title, preparing) => async(dispatch) => {
  const response = await addRecipe(title, preparing);
  
  if (response) {
    await dispatch(loadDataFromServer());
  }
};

export const setEditedRecipe = (
  id, text, date, prevText,
) => async(dispatch) => {
  const response = await editRecipe(id, text, date, prevText);

  if (response) {
    await dispatch(loadDataFromServer());
  }
};

export const getRecipes = state => state.recipes;

const reducer = (state, action) => {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.recipes,
      };
    default:
      return state;
  }
};

const initialState = {
  recipes: [],
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
