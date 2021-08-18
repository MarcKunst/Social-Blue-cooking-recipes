const api_url = "https://www.themealdb.com/api/json/v1/1/random.php";

async function getapi(url) {
    // Storing response 
    const response = await fetch(url);
    
    // Storing data in form of JSON
    let data = await response.json();
    handelData(data);
    

}
// Calling that async function
getapi(api_url)

function handelData(data) {
    const recipeData = data.meals[0];
    const cleanData = clean(recipeData);
    const ingredients = getIngredients(cleanData);
    const measurements = getMeasures(cleanData);
    const combinedList = combine(ingredients, measurements)
    console.log(cleanData)
    
    getImage(cleanData);
    getImage2(cleanData);
    getMetaData(cleanData);
    getInstructions(cleanData)
    createList(combinedList)
}

//loop over data and remove empty values
function clean(data) {
    for (let value in data) {
        if (data[value] === null || data[value] === "" || data[value] === " ") {
            delete data[value];
        }
    }
    return data
}

function getMetaData(data) {
const title = document.getElementById("recipe_name");
title.innerHTML = data.strMeal;

const category = document.getElementById("category");
category.innerHTML = data.strCategory;

    for (let value in data.strArea) {
        if (data.strArea[value] != undefined || data.strArea[value] != "Unknown") {
            const area = document.getElementById("area");
            area.innerHTML = data.strArea;
        }
    }

    for (let value in data.strTags) {
        if (data.strTags[value] != undefined) {
            const tag = document.getElementById("tag");
            tag.innerHTML = "Tags:" + " " + data.strTags;
        } 
    }

    for (let value in data.strSource) {
        if (data.strSource[value] != undefined) {
            const source = document.getElementById("source");
            source.innerHTML = data.strSource;
            source.href = data.strSource;
            }
    }
}

function getImage(data) {
    const image = document.createElement("img");
    const imageParent = document.getElementById("img-wrapper");
    const imageSource = data.strMealThumb;
    image.id = "food-img";
    image.src = imageSource;
    imageParent.appendChild(image);
}

function getImage2(data) {
    const image = document.createElement("img");
    const smallerContainer = document.getElementById("img-container");
    const imageSource = data.strMealThumb;
    image.id = "main-img";
    image.src = imageSource;
    smallerContainer.appendChild(image);
}

function getIngredients(data) {
    //step1 create list of all the properties in data
    //step2 then filter the keys with the name strIngredient
    //step3 then reduce to build a new object with the ingredient properties
    const filteredIngredients = Object.keys(data)
    .filter(key => /strIngredient/.test(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

    return filteredIngredients;
}

function getMeasures(data) {
    const filteredMeasurements = Object.keys(data)
    .filter(key => /strMeasure/.test(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

    return filteredMeasurements
}

function combine(ingredients, measurements) {
    //step1 make arrays of ingredients and measurements
    //step2 combine the correct values from the arrays with the map function
    const ingredientArray = Object.values(ingredients);
    const measurementArray = Object.values(measurements);
    const zipArrays = measurementArray
    .map((k, i) => [k, ingredientArray[i]]
    .join(" "));
    

    return zipArrays;
}

function createList(data) {
    let ol = document.createElement("ul");
    for (let i of data) {
        let li = document.createElement("li"); li.innerHTML = i;
        ol.appendChild(li);
    }
    document.getElementById("list-wrapper").appendChild(ol);
}

function getInstructions(data) {

    const instructions = document.getElementById("instructions");
    instructions.innerHTML = data.strInstructions;
}