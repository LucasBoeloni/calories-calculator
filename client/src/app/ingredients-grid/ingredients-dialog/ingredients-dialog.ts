import { Component, computed, signal, inject, OnInit, ChangeDetectionStrategy, output } from '@angular/core';
import { IngredientsCard } from '../ingredients-card/ingredients-card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Ingredient } from '../ingredient';

@Component({
  selector: 'ingredients-dialog',
  templateUrl: 'ingredients-dialog.html',
  imports: [MatDialogModule, MatButtonModule, IngredientsCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsDialog {

  newIngredient : any = null;

  catchNewIngredient(ingredient : any) {
    this.newIngredient = ingredient;
  }

}
