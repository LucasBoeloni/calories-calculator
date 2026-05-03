export interface MealIngredient {
  mealId : number;
  ingredientId : number;
  quantity : number;
  unit : number;
  name : string;
  calorie : number;
  carbohydrate : number;
  sugar : number;
  protein : number;
  fat : number;
  fiber : number;
  sodium : number;
  save?: boolean;
}
