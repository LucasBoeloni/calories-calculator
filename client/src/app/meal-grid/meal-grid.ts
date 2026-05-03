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

  ngOnInit(): void {
    this.mealService.getAll().subscribe({
      next: (value) => this.meals.set(value),
    });
    this.ingredientService.getAll().subscribe({
      next: (value) => this.ingredients.set(value),
    });
  }

  onMealChange(updatedMeal: Meal) {
    console.log(updatedMeal)
    if (updatedMeal.delete) {
      const updatedMeals = this.meals().filter((m) => m.mealId != updatedMeal.mealId);
      this.meals.set(updatedMeals);
      this.mealService.delete(updatedMeal.mealId).subscribe();
      return;
    }

    const updatedMeals = this.meals().map((m) =>
      m.mealId === updatedMeal.mealId ? updatedMeal : m,
    );

    this.mealService.updateMeal(updatedMeal).subscribe()

    //this.meals.set(updatedMeals);
  }

  pushNewMeal(){
    this.mealService.updateMeal({mealId : null, userId : 1, name : 'REFEICAO', ingredients : []}).subscribe({
      next: value => {
        this.meals().push(value);
      }
    })
  }
}
