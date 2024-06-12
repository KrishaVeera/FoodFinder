const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results'); 

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
});

async function searchRecipes() {
    const searchValue = searchInput.value.trim(); 
    if (!searchValue) {
        alert("Please enter ingredients to search for recipes.");
        return;
    }
    
    try {
        const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=1a71dbe3&app_key=ac924629aefa9bcad067245755bd2624&from=0&to=10`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        resultsList.innerHTML = '<div class="error">Error fetching recipes. Please try again later.</div>';
        console.error('Fetch error: ', error);
    }
}

function displayRecipes(recipes) {
    if (recipes.length === 0) {
        resultsList.innerHTML = '<div class="no-results">No recipes found. Please try different ingredients.</div>';
        return;
    }

    let html = '';
    recipes.forEach((recipe) => {
        html += `
        <div class="recipe-card">
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div>`;
    });
    resultsList.innerHTML = html;
}

