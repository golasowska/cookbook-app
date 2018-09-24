import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';
/*  global state of the app

 - search object
 - current recipe object
 - shopping list object
 - liked recipes

*/

const state = {};

// SEARCH CONTROLER //

const controlSearch = async () => {
  const query = searchView.getInput();

  if (query) {
    state.search = new Search(query);
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      await state.search.getResults();
      // console.log(state.search.result);
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert('Something wrong with the search...');
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  // console.log(btn);
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
    // console.log(goToPage);
  }
});

// RECIPE CONTROLER //

const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '');
  console.log(id);
  if (id) {
    recipeView.clearRecipe();
    renderLoader(elements.recipe);
    if (state.search) {
      searchView.highlightSelected(id);
    }

    state.recipe = new Recipe(id);

    try {
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      state.recipe.calcTime();
      state.recipe.calcServings();
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      alert('Error processing recipe!');
    }
  }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
