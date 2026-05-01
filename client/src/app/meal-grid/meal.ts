import { MealIngredient } from "./meal-ingredient";

export interface Meal {
  mealId : number;
  userId : number;
  name : string;
  ingredients : MealIngredient[];

}
