import { MealIngredient } from './../meal-ingredient';
import { Meal } from './../meal';
import { Ingredient } from './../../ingredients-grid/ingredient';
import { Component, computed, input, OnInit, output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { CdkTableModule } from '@angular/cdk/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MealRow } from '../meal-row/meal-row';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-meal-card',
  imports: [
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    MatAutocompleteModule,
    MatTableModule,
    CdkTableModule,
    MatIconModule,
    MatSelectModule,
    MealRow,
    DecimalPipe
  ],
  templateUrl: './meal-card.html',
  styleUrl: './meal-card.scss',
})
export class MealCard implements OnInit {
  public meal = input<Meal>(null);

  public ingredients = input<Ingredient[]>([]);
  public ingredientsChange = output<Ingredient[]>();
  public ingredientsState = signal<Ingredient[]>([]);

  protected editing = signal(false);

  public mealChange = output<Meal>();

  public mealIngredientsState = signal<MealIngredient[]>([]);

  protected filteredIngredients = computed(() => {
    const ids = this.mealIngredientsState().map(a => a.ingredientId);
    return this.ingredients().filter(
      (ingredient) => !ids.includes(ingredient.id),
    );
  });

  totals = signal<any>({});

  constructor() {}

  ngOnInit(): void {
    this.mealIngredientsState.set(structuredClone(this.meal().ingredients));
  }

  deleteMeal() {
    this.mealChange.emit({
      mealId: this.meal().mealId,
      userId: null,
      name: '',
      delete: true,
      ingredients: [],
    });
  }

  deleteIngredient(index) {
    this.meal().ingredients.splice(index, 1);
    this.mealIngredientsState().splice(index, 1);
    this.updateTotals();
    this.emitMeal();
  }

  onChangeIngredient(ingredient, index) {
    if(this.meal().ingredients[index].ingredientId === null){
      this.meal().ingredients[index] = ingredient;
    }
    this.mealIngredientsState()[index] = ingredient;
    this.ingredientsChange.emit(this.filteredIngredients())
    this.updateTotals();
    if (ingredient.save) {
      this.emitMeal();
    }
  }

  updateTotals() {
    const reduced = this.mealIngredientsState().reduce(
      (acc, i) => {
        acc.calorie += i.calorie;
        acc.protein += i.protein;
        acc.carbohydrate += i.carbohydrate;
        acc.sugar += i.sugar;
        acc.fat += i.fat;
        acc.fiber += i.fiber;
        acc.sodium += i.sodium;
        return acc;
      },
      {
        calorie: 0,
        protein: 0,
        carbohydrate: 0,
        sugar: 0,
        fat: 0,
        fiber: 0,
        sodium: 0,
      },
    );
    this.totals.set(reduced);
  }

  startEdit() {
    this.editing.set(true);
  }

  finishEdit() {
    this.editing.set(false);
    this.emitMeal();
  }

  emitMeal() {
    this.mealChange.emit({
      ...this.meal(),
      ingredients: this.mealIngredientsState(),
    });
  }

  pushNewIngredient() {
    this.meal().ingredients.push({
      calorie: null,
      quantity: null,
      protein: null,
      carbohydrate: null,
      sugar: null,
      fat: null,
      fiber: null,
      sodium: null,
      mealId: this.meal().mealId,
      ingredientId: null,
      unit: null,
      name: '',
      save: false,
    });
  }
}
