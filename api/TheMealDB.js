const API_KEY = '1';
const BASE_URL = `https://www.themealdb.com/api/json/v1/${API_KEY}`;

const fetchAPI = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getGeneratedRecipeData = (ingredientsCount) => {
  let difficulty = "Easy";
  if (ingredientsCount > 12) {
    difficulty = "Hard";
  } else if (ingredientsCount > 8) {
    difficulty = "Medium";
  }

  return {
    prepTime: `${Math.floor(Math.random() * 16) + 10} min`,
    cookTime: `${Math.floor(Math.random() * 31) + 15} min`,
    servings: Math.floor(Math.random() * 5) + 2,
    difficulty,
  };
};

const normalizeMeal = (meal) => {
  if (!meal) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push(`${measure} ${ingredient}`.trim());
    }
  }
  
  const generatedData = getGeneratedRecipeData(ingredients.length);

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    description: meal.strTags ? meal.strTags.split(',').join(', ') : 'A delicious meal',
    ingredients: ingredients,
    instructions: meal.strInstructions.split('\n').filter(line => line.trim() !== ''),
    prepTime: generatedData.prepTime, 
    cookTime: generatedData.cookTime,
    difficulty: generatedData.difficulty, 
    servings: generatedData.servings,
    image: meal.strMealThumb,
    tags: meal.strTags ? meal.strTags.split(',') : [],
  };
};

export const fetchRecipesByIngredients = async (userIngredients) => {
  if (!userIngredients || userIngredients.length === 0) {
    return [];
  }

  const allRecipeIds = new Set();

  for (const ingredient of userIngredients) {
    const response = await fetchAPI(`filter.php?i=${ingredient.trim()}`);
    if (response.meals) {
      response.meals.forEach(meal => allRecipeIds.add(meal.idMeal));
    }
  }
  
  const uniqueRecipeIds = Array.from(allRecipeIds);
  const recipePromises = uniqueRecipeIds.map(id => fetchAPI(`lookup.php?i=${id}`));
  const recipeDetailsResponses = await Promise.all(recipePromises);

  const recipes = recipeDetailsResponses
    .map(res => normalizeMeal(res.meals ? res.meals[0] : null))
    .filter(Boolean);

  return recipes;
}; 