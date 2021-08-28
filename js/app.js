const mealContainer = document.querySelector(".container .row");
const searchFood = async () => {
    const searchField = document.getElementById("search-field");
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchField.value}`;
    //Async Await
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayFood(data.meals);
    }
    catch (error) {
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("text-center");
        errorMessage.innerHTML = `
            <img src="images/error.png" alt="" class="error-img">
            <h1 class="text-danger">OOPS! <span class="text-light">No results found for</span> "<span class="text-primary">${searchField.value}</span>"!</h1>
            <h3 class="text-warning">Please try again!</h3>
        `;
        mealContainer.appendChild(errorMessage);
    }

    searchField.value = "";
    /* fetch(url)
        .then(response => response.json())
        .then(data => displayFood(data.meals)) */
}
const showFood = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${"f"}`;

    const response = await fetch(url);
    const data = await response.json();
    displayFood(data.meals);
}
const displayFood = meals => {
    // mealContainer.innerHTML="";
    mealContainer.textContent = "";
    meals.forEach(meal => {
        const mealSingle = document.createElement("div");
        mealSingle.classList.add("col-12", "col-md-6", "col-lg-4", "text-center", "p-3", "mx-auto");
        mealSingle.innerHTML = `
            <div class="p-3 bg-light d-grid">
                <img src="${meal.strMealThumb}" class="meal-img" alt="Meal Picture">
                <h4 class="pt-3">${meal.strMeal.slice(0, 20)}</h4>
                <h6 class="fst-italic pt-2 pb-3">${meal.strArea}</h6>
                <a href="${meal.strYoutube}" class="btn btn-primary rounded-0 px-4 px-md-5 d-flex align-items-center justify-content-evenly"><i class="fab fa-youtube h3 m-0"></i>Watch On Youtube</a>
            </div>
        `;
        mealContainer.appendChild(mealSingle);
    });
}
//Show Food Normally
showFood();

//Searching by enter button
document.getElementById("search-field").addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        document.getElementById("search-btn").click();
    }
    /* if (event.key === "Enter") {
        document.getElementById("search-btn").click();
    } */
});