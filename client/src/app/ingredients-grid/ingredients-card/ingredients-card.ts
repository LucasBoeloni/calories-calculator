import { Ingredient } from './../ingredient';
import { Component, computed, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, ValueChangeEvent } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IngredientService } from '../ingredient-service';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { UNITS } from '../../constants';

@Component({
  selector: 'app-ingredients-card',
  imports: [
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIcon,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './ingredients-card.html',
  styleUrl: './ingredients-card.scss',
})
export class IngredientsCard implements OnInit {
  protected formGroup = new FormGroup({
    id: new FormControl(),
    unit: new FormControl(),
    name: new FormControl(),
    calorie: new FormControl(),
    carbohydrate: new FormControl(),
    sugar: new FormControl(),
    protein: new FormControl(),
    fat: new FormControl(),
    fiber: new FormControl(),
    sodium: new FormControl(),
    deleted: new FormControl(),
  });

  ingredient = input<Ingredient>();
  newIngredient = output<Ingredient>();
  private service = inject(IngredientService);
  public unidades = UNITS;

  constructor() {}

  ngOnInit(): void {
    if (!!this.ingredient()) {
      this.formGroup.setValue(this.ingredient() as Ingredient);
      this.formGroup.valueChanges
        .pipe(debounceTime(2000), distinctUntilChanged())
        .subscribe((e) => {
          this.service
            .create(this.formGroup.getRawValue())
            .pipe(finalize(() => {}))
            .subscribe({
              next: (value) => {},
            });
        });
    } else {
      this.formGroup.valueChanges.pipe().subscribe((e) => {
        this.newIngredient.emit(this.formGroup.getRawValue());
      });
    }
  }

}
