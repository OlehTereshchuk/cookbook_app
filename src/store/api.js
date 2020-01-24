export const loadRecipes = async() => {
  const response = await fetch('/recipes');

  return response.json();
};

export const loadPreviousRecipes = async() => {
  const response = await fetch('/previousRecipes');

  return response.json();
};

export const addRecipe = async(title, preparing) => {
  const data = JSON.stringify({
    title,
    preparing,
  });

  const response = await fetch('/add', {
    method: 'POST',
    body: data,
  });

  return response;
};

export const editRecipe = async(id, text, date, prevText) => {
  const data = JSON.stringify({
    id,
    text,
    date,
    prevText,
  });

  const response = await fetch('/edit', {
    method: 'PATCH',
    body: data,
  });

  return response;
};
