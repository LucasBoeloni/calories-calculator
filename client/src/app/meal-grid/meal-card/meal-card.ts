import { Component, input, OnInit, } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MealIngredient } from '../meal-ingredient';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { Meal } from '../meal';
import { CdkTableModule } from "@angular/cdk/table";


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
    CdkTableModule
],
  templateUrl: './meal-card.html',
  styleUrl: './meal-card.scss',
})
export class MealCard implements OnInit {


  public meal = input<Meal>({mealId : null, userId : null, name : '', ingredients : []});
  protected displayedColumns: string[] = ['name', 'quantity', 'calorie', 'carbohydrate', 'sugar', 'protein', 'fat', 'fiber', 'sodium'];
  protected displayedTotalColumns: string[] = ['dummy','dummy2','calorieTotal', 'carbohydrateTotal', 'sugarTotal', 'proteinTotal', 'fatTotal', 'fiberTotal', 'sodiumTotal'];


  ngOnInit(): void {

  }

  getTotalColumn(columnName : string){
  return this.meal().ingredients.reduce((sum, item) => sum + item[columnName], 0);
}

formatColumnValue(value : number, quantity : number){
 return ((value * quantity) / 100 ).toFixed(1)
}


}
