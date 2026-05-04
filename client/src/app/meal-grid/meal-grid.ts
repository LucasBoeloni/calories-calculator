import { MealService } from './meal-service';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MealCard } from './meal-card/meal-card';
import { Meal } from './meal';
import { MatCardModule } from '@angular/material/card';
import { IngredientService } from '../ingredients-grid/ingredient-service';
import { Ingredient } from '../ingredients-grid/ingredient';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-meal-grid',
  imports: [MatProgressSpinnerModule, MealCard, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './meal-grid.html',
  styleUrl: './meal-grid.scss',
})
export class MealGrid implements OnInit {
  protected isLoading = signal(false);

  private mealService = inject(MealService);

  private ingredientService = inject(IngredientService);

  protected meals = signal<Meal[]>([]);

  protected ingredients = signal<Ingredient[]>([]);

  protected allTotals = signal<Map<string, any>>(new Map<string, any>());

  protected totals = signal({
    calorie: 0,
    protein: 0,
    carbohydrate: 0,
    sugar: 0,
    fat: 0,
    fiber: 0,
    sodium: 0,
  });

  ngOnInit(): void {
    this.mealService.getAll().subscribe({
      next: (value) => this.meals.set(value),
    });
    this.ingredientService.getAll().subscribe({
      next: (value) => this.ingredients.set(value),
    });
    this.allTotals.set(new Map<string, any>());
  }

  onMealChange(updatedMeal: Meal) {
    if (updatedMeal.delete) {
      const updatedMeals = this.meals().filter((m) => m.mealId != updatedMeal.mealId);
      this.meals.set(updatedMeals);
      this.mealService.delete(updatedMeal.mealId).subscribe();
      this.updatedTotals(updatedMeal);
      return;
    }

    this.mealService.updateMeal(updatedMeal).subscribe();
  }

  pushNewMeal() {
    this.mealService
      .updateMeal({ mealId: null, userId: 1, name: 'REFEICAO', ingredients: [] })
      .subscribe({
        next: (value) => {
          this.meals().push(value);
        },
      });
  }

  updatedTotals(totals) {
    if (!!totals.delete) {
      this.allTotals().delete(totals.mealId);
    } else {
      this.allTotals().set(totals.mealId, totals);
    }
    this.totals.set(
      Array.from(this.allTotals().values()).reduce(
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
      ),
    );
  }
}
