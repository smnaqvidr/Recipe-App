const foodApp = {};
foodApp.APP_ID = '900da95e';
foodApp.API_KEY = '40698503668e0bb3897581f4766d77f9';
foodApp.init = function () {
  // selecting the form and selecting the user input
  document.getElementById("form").addEventListener("submit", function (e) {
    // select the input from the form.
    const input = document.getElementById('text');


    foodApp.getRecipes(input.value)
    input.value = '';
    e.preventDefault(); // stop form submission
  });
};
// fetching the data from api in json format.
foodApp.getRecipes = (searchQuery) => {
  const BASE_URL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${foodApp.APP_ID}&app_key=${foodApp.API_KEY}&from=0&to=10`;
  fetch(BASE_URL)
    .then(function (apiResponse) {
      return apiResponse.json();
    })
    .then(function (apiJsonData) {
      const ul = document.querySelector(".recipes");
      // This will clear the form for new input.
      ul.innerHTML = "";
      foodApp.displayrecipes(apiJsonData.hits)
    });
}
// selecting the data from API and appending it on the page
foodApp.displayrecipes = function (recipes) {


  //selected ul
  const ul = document.querySelector(".recipes");
  recipes.forEach(item => {
    const listElement = document.createElement('li');
    const label = document.createElement('h2');
    const image = document.createElement('img');
    const recipeUrl = document.createElement('a');
    const calories = document.createElement('p');
    // * Targeting Image
    image.src = item.recipe.image;
    image.alt = item.recipe.label;
    image.className = 'recipeImage';
    // * Targeting label p tag
    label.textContent = item.recipe.label;
    label.class = 'recipeName';
    // * Targeting URL
    recipeUrl.href = item.recipe.url;
    recipeUrl.text = 'Recipe Link'
    recipeUrl.class = 'recipeLink';
    // * Targeting calories p tag
    calories.textContent = `Calories: ${item.recipe.calories.toFixed(2)}`;
    calories.class = 'recipeCalories';
    // * append label, image,recipeUrl and calories on the page
    listElement.append(label);
    listElement.append(image);
    listElement.append(recipeUrl);
    listElement.append(calories);
    ul.append(listElement);
  });
}

// changing button color on click
foodApp.buttons = document.querySelectorAll('button');

foodApp.buttons.forEach((individualButton) => {

  individualButton.addEventListener('click', () => {
    individualButton.classList.toggle('grey');

  })
});


foodApp.init()








