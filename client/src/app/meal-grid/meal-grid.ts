import { MealService } from './meal-service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MealCard } from './meal-card/meal-card';
import { Meal } from './meal';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-meal-grid',
  imports: [MatProgressSpinnerModule, MealCard, MatCardModule],
  templateUrl: './meal-grid.html',
  styleUrl: './meal-grid.scss',
})
export class MealGrid implements OnInit {
  protected isLoading = signal(false);
  private mealService = inject(MealService)
  protected meals = signal<Meal[]>([]);

  ngOnInit(): void {
    this.mealService.getAll().subscribe({
      next : value => this.meals.set(value)
    })
  }


}
