import { DecimalPipe } from '@angular/common';
import {
  Component,
  computed,
  input,
  signal,
  OnInit,
  ViewChild,
  ElementRef,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Ingredient } from '../../ingredients-grid/ingredient';
import { MealIngredient } from '../meal-ingredient';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-meal-row',
  imports: [
    MatAutocompleteModule,
    FormsModule,
    DecimalPipe,
    MatIconModule,
    MatDivider,
    MatButtonModule,
  ],
  templateUrl: './meal-row.html',
  styleUrl: './meal-row.scss',
})
export class MealRow implements OnInit {
  public ingredient = input<MealIngredient>();
  public ingredientChange = output<MealIngredient>();
  public ingredientState = signal<MealIngredient>(null);
  public ingredients = input<Ingredient[]>([]);
  public ingredientsChange = output<Ingredient[]>();

  protected quantityState = signal<number>(0);
  protected calorieState = signal<number>(0);
  protected proteinState = signal<number>(0);
  protected carbohydrateState = signal<number>(0);
  protected sugarState = signal<number>(0);
  protected fatState = signal<number>(0);
  protected fiberState = signal<number>(0);
  protected sodiumState = signal<number>(0);
  protected initialQuantity = 0;

  protected searchTerm = signal('');

  protected editing = signal({ ingredient: null, quantity: null });

  @ViewChild('inputIngredient') inputRefIngredient!: ElementRef;
  @ViewChild('inputQuantity') inputRefQuantity!: ElementRef;

  public onDelete = output();

  private calc = (ingredient: MealIngredient, quantity: number, value: number) =>
    ingredient.unit == 1 ? (value * quantity) / 100 : value * quantity;

  protected calorieComputed = computed(() => {
    return this.calc(this.ingredientState(), this.quantityState(), this.calorieState());
  });
  protected proteinComputed = computed(() => {
    return this.calc(this.ingredientState(), this.quantityState(), this.proteinState());
  });
  protected carbohydrateComputed = computed(() => {
    return this.calc(this.ingredientState(), this.quantityState(), this.carbohydrateState());
  });
  protected sugarComputed = computed(() => {
    return this.calc(this.ingredientState(), this.quantityState(), this.sugarState());
  });
  protected fatComputed = computed(() => {
    return this.calc(this.ingredientState(), this.quantityState(), this.fatState());
  });
  protected fiberComputed = computed(() => {
    return this.calc(this.ingredientState(), this.quantityState(), this.fiberState());
  });
  protected sodiumComputed = computed(() => {
    return this.calc(this.ingredientState(), this.quantityState(), this.sodiumState());
  });

  protected filteredIngredients = computed(() => {
    const term = this.searchTerm().toLocaleLowerCase().trim();
    if (!term) return this.ingredients();

    return this.ingredients().filter(
      (ingredient) => ingredient.name.toLocaleLowerCase().includes(term) && ingredient.id,
    );
  });

  ngOnInit(): void {
    this.ingredientState.set(this.ingredient());
    this.buildStates();
    this.emitIngredient(false);
    if (this.ingredientState().ingredientId === null) {
      this.startEditIngredient(this.ingredient());
    }
  }

  startEditQuantity(ingredient) {
    this.initialQuantity = this.quantityState();
    this.editing.set({
      ingredient: null,
      quantity: this.getIngredientEditId(ingredient),
    });
    setTimeout(() => {
      this.inputRefQuantity?.nativeElement.focus();
      this.inputRefQuantity?.nativeElement.select();
    });
  }

  startEditIngredient(ingredient) {
    this.searchTerm.set(ingredient.name);
    this.editing.set({
      ingredient: this.getIngredientEditId(ingredient),
      quantity: null,
    });
    setTimeout(() => {
      this.inputRefIngredient?.nativeElement.focus();
      this.inputRefIngredient?.nativeElement.select();
    });
  }

  getIngredientEditId(ingredient) {
    return `${ingredient.mealId}-${ingredient.ingredientId}`;
  }

  newIngredientSelected(selected) {
    if (!selected.option.value) return;
    const selectedValue = selected.option.value;

    this.ingredientState.set({
      ...selectedValue,
      mealId: this.ingredientState().mealId,
      ingredientId: selectedValue.id,
      quantity: selectedValue.unit === 1 ? 100 : 1,
    });

    this.ingredientsChange.emit(this.ingredients().filter((a) => a.id !== selectedValue.id));

    this.buildStates();

    this.emitIngredient(true);

    this.clearEditing();
  }

  finishEditQuantity() {
    this.clearEditing();
    if (this.quantityState() === null || 0 || undefined) {
      this.quantityState.set(this.initialQuantity);
      return;
    }
    this.emitIngredient(true);
  }

  clearEditing() {
    this.editing.set({ ingredient: null, quantity: null });
    if (this.ingredientState().ingredientId === null) {
      this.deleteRow();
    }
  }

  deleteRow() {
    if (!!this.ingredientState().name) {
      this.ingredients().push({
        calorie: this.calorieComputed(),
        protein: this.proteinComputed(),
        carbohydrate: this.carbohydrateComputed(),
        sugar: this.sugarComputed(),
        fat: this.fatComputed(),
        fiber: this.fiberComputed(),
        sodium: this.sodiumComputed(),
        id: this.ingredientState().ingredientId,
        unit: this.ingredientState().unit,
        name: this.ingredientState().name,
        deleted: false,
      });
      this.ingredientsChange.emit(this.ingredients());
    }

    this.onDelete.emit();
  }

  buildStates() {
    this.quantityState.set(this.ingredientState().quantity);
    this.calorieState.set(this.ingredientState().calorie);
    this.proteinState.set(this.ingredientState().protein);
    this.carbohydrateState.set(this.ingredientState().carbohydrate);
    this.sugarState.set(this.ingredientState().sugar);
    this.fatState.set(this.ingredientState().fat);
    this.fiberState.set(this.ingredientState().fiber);
    this.sodiumState.set(this.ingredientState().sodium);
  }

  emitIngredient(save = false) {
    this.ingredientChange.emit({
      calorie: this.calorieComputed(),
      quantity: this.quantityState(),
      protein: this.proteinComputed(),
      carbohydrate: this.carbohydrateComputed(),
      sugar: this.sugarComputed(),
      fat: this.fatComputed(),
      fiber: this.fiberComputed(),
      sodium: this.sodiumComputed(),
      mealId: this.ingredientState().mealId,
      ingredientId: this.ingredientState().ingredientId,
      unit: this.ingredientState().unit,
      name: this.ingredientState().name,
      save: save,
    });
  }
}
