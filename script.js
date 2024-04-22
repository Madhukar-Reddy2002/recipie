const recipeForm = document.getElementById('recipe-form');
const recipeList = document.getElementById('recipe-list');

let recipes = [];

recipeForm.addEventListener('submit', addRecipe);

// Function to add a new recipe
function addRecipe(event) {
  event.preventDefault();
  const recipeName = document.getElementById('recipe-name').value.trim();
  const ingredients = document.getElementById('ingredients').value.trim();
  const instructions = document.getElementById('instructions').value.trim();
  const recipe = { name: recipeName, ingredients, instructions };
  recipes.push(recipe);

  // Save the recipes to localStorage
  saveRecipesToLocalStorage();

  // Clear the form
  recipeForm.reset();

  // Render the recipe list
  renderRecipeList();
}

// Function to save recipes to localStorage
function saveRecipesToLocalStorage() {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Function to render the recipe list
function renderRecipeList() {
  recipeList.innerHTML = '';

  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm)
  );

  filteredRecipes.forEach((recipe, index) => {
    const li = document.createElement('li');
    const recipeLink = document.createElement('a');
    recipeLink.href = '#';
    recipeLink.textContent = recipe.name;
    recipeLink.addEventListener('click', () => showRecipeDetails(recipe));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteRecipe(index));

    li.appendChild(recipeLink);
    li.appendChild(deleteButton);
    recipeList.appendChild(li);
  });
}

function showRecipeDetails(recipe) {
  const recipeDetails = document.createElement('div');
  recipeDetails.innerHTML = `
    <h3>${recipe.name}</h3>
    <p><strong>Ingredients:</strong></p>
    <p>${recipe.ingredients}</p>
    <p><strong>Instructions:</strong></p>
    <p>${recipe.instructions}</p>
  `;

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.appendChild(recipeDetails);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', () => {
    document.body.removeChild(overlay);
  });
}

function deleteRecipe(index) {
  recipes.splice(index, 1);
  saveRecipesToLocalStorage();
  renderRecipeList();
}

// Load recipes from localStorage on page load
window.addEventListener('load', () => {
  const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
  recipes = storedRecipes;
  renderRecipeList();
});

// Render the recipe list when the search input changes
document.getElementById('search-input').addEventListener('input', renderRecipeList);