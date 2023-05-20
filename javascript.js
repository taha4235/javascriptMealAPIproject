let result = document.getElementById("result");
let searchbutton = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let userinp = document.getElementById("user-inp").value;
searchbutton.addEventListener("click",()=>{
    let userinp = document.getElementById("user-inp").value;
    if(userinp.length ==0){
result.innerHTML=  `
<h3>input field cannot be empty</h3>
`
    }else{
        fetch(url + userinp)
    .then(response => response.json())
    .then((data) => {
        let myMeal = data.meals[0];
        console.log(myMeal);
        console.log(myMeal.strMeal);
        console.log(myMeal.strArea);
        console.log(myMeal.strMealThumb);
        console.log(myMeal.strInstructions);
        
        let count = 1;
        let ingredients = [];

        for (let i in myMeal) {
            let ingredient = "";
            let measure = "";

            if (i.startsWith("strIngredient") && myMeal[i]) {
                ingredient = myMeal[i];
                measure = myMeal[`strMeasure` + count];
                count++;
                ingredients.push(`${ingredient} ${measure}`);
            }
        }

        console.log(ingredients);
        result.innerHTML = `
        <img src="${myMeal.strMealThumb}" alt="Meal Image" />
        <div class="details">
            <h2>${myMeal.strMeal}</h2>
            <h4>${myMeal.strArea}</h4>
        </div>
        <div id="ingredient-con"></div>
        <div id="recipe">
            <button id="hide-recipe">X</button>
            <pre id="instructions">${myMeal.strInstructions}</pre>
        </div>
        <button id="show-recipe">show recipe</button>
      `;

      let recipe = document.getElementById("recipe");
      recipe.style.display = "none";
      let ingredientcon = document.getElementById("ingredient-con");
      let parent = document.createElement("ul");
      let hiderecipe = document.getElementById("hide-recipe");
      let showrecipe = document.getElementById("show-recipe");

      ingredients.forEach((i) => {
        let child = document.createElement("li");
        child.innerText = i;
        parent.appendChild(child);
        ingredientcon.appendChild(parent);
      });
      hiderecipe.addEventListener("click",()=>{
        recipe.style.display = "none";  
      })
      showrecipe.addEventListener("click",()=>{
        recipe.style.display = "block";     
      })
    });

    }
})
