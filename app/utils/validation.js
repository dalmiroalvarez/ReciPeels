import { VALIDATION } from './constants';

export const validateName = (name) => {
  const trimmedName = name.trim();
  if (trimmedName.length < VALIDATION.MIN_NAME_LENGTH) {
    return {
      isValid: false,
      message: `Please enter your name (minimum ${VALIDATION.MIN_NAME_LENGTH} characters)`
    };
  }
  return { isValid: true, message: '' };
};

export const validateIngredient = (ingredient, existingIngredients = []) => {
  const trimmedIngredient = ingredient.trim();
  
  if (trimmedIngredient.length < VALIDATION.MIN_INGREDIENT_LENGTH) {
    return {
      isValid: false,
      message: `Please enter a valid food item (minimum ${VALIDATION.MIN_INGREDIENT_LENGTH} characters)`
    };
  }

  if (existingIngredients.some(food => food.toLowerCase() === trimmedIngredient.toLowerCase())) {
    return {
      isValid: false,
      message: 'This food item has already been added'
    };
  }

  return { isValid: true, message: '' };
};

export const validateIngredientCount = (count) => {
  if (count < VALIDATION.MIN_INGREDIENTS) {
    return {
      isValid: false,
      message: `You need to add at least ${VALIDATION.MIN_INGREDIENTS} food items. You have ${count} of ${VALIDATION.MIN_INGREDIENTS}.`
    };
  }

  if (count >= VALIDATION.MAX_INGREDIENTS) {
    return {
      isValid: false,
      message: `You can only add up to ${VALIDATION.MAX_INGREDIENTS} ingredients.`
    };
  }

  return { isValid: true, message: '' };
};

export const getCounterStatus = (count) => {
  if (count >= VALIDATION.MIN_INGREDIENTS && count < VALIDATION.MAX_INGREDIENTS) {
    return {
      type: 'success',
      text: `${count}/${VALIDATION.MAX_INGREDIENTS}`,
      hint: 'You can add more ingredients or continue'
    };
  } else if (count >= VALIDATION.MAX_INGREDIENTS) {
    return {
      type: 'max',
      text: `${count}/${VALIDATION.MAX_INGREDIENTS}`,
      hint: 'Maximum ingredients reached'
    };
  } else {
    return {
      type: 'warning',
      text: `${count}/${VALIDATION.MIN_INGREDIENTS}`,
      hint: `You need to add at least ${VALIDATION.MIN_INGREDIENTS} ingredients to continue`
    };
  }
}; 