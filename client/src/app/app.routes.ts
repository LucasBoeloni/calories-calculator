import { Routes } from '@angular/router';
import { IngredientsGrid } from './ingredients-grid/ingredients-grid';
import { MealGrid } from './meal-grid/meal-grid';

export const routes: Routes = [
    {
    path: 'ingredient-grid',
    loadComponent: () => import('./ingredients-grid/ingredients-grid').then(c => c.IngredientsGrid),
  },
  {
    path: 'meal-grid',
    loadComponent: () =>  import('./meal-grid/meal-grid').then(c => c.MealGrid),
  },
];
