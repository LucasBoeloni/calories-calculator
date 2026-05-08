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
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { User } from '../user/user';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MODES } from '../constants';

@Component({
  selector: 'app-meal-grid',
  imports: [
    MatProgressSpinnerModule,
    MealCard,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    DecimalPipe,
    FormsModule,
    MatInputModule,
    MatRadioModule,
  ],
  templateUrl: './meal-grid.html',
  styleUrl: './meal-grid.scss',
})
export class MealGrid implements OnInit {
  protected isLoading = signal(false);

  private mealService = inject(MealService);
  private userService = inject(User);
  protected modes = MODES;
  protected user = signal(null);
  protected userMode = signal(null);
  protected userWeight = signal(null);
  protected userValue = signal(null);

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

  protected disabledUserValue = computed(() => {
    const mode = this.userMode().id;
    return mode === 2;
  });

  protected calculatedCalories = computed(() => {
    if(this.userMode().id === 2){
      return (this.userWeight() *2.2) *16
    }
    if(this.userMode().id === 1){
      return ((this.userWeight() *2.2) *16) - this.userValue();
    }
    return ((this.userWeight() *2.2) *16) + this.userValue();

  });

    protected calculatedProteins = computed(() => {
    return this.userWeight() * 1.9;

  });

  ngOnInit(): void {
    this.mealService.getAll().subscribe({
      next: (value) => this.meals.set(value),
    });
    this.ingredientService.getAll().subscribe({
      next: (value) => this.ingredients.set(value),
    });
    this.allTotals.set(new Map<string, any>());
    this.user.set(JSON.parse(localStorage.getItem('selectedUser')));
    this.userWeight.set(this.user().weight);
    this.userMode.set(this.modes.filter(a => a.id === this.user().mode)[0]);
    this.userValue.set(this.user().value);
  }

  attUser() {
    this.user.set({...this.user(),
      mode : this.userMode().id,
      weight : this.userWeight(),
      value : this.userValue()
    })
    this.userService
      .save(this.user())
      .subscribe({ next: (value) => localStorage.setItem('selectedUser', JSON.stringify(value)) });
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
      .updateMeal({
        mealId: null,
        userId: JSON.parse(localStorage.getItem('selectedUser')).id,
        name: 'REFEICAO',
        ingredients: [],
      })
      .subscribe({
        next: (value) => {
          const updatedMeals = this.meals();
          this.meals.set([]);
          updatedMeals.push(value);
          this.meals.set(updatedMeals);
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
