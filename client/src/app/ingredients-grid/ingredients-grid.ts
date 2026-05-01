import { Component, computed, signal, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IngredientsCard } from './ingredients-card/ingredients-card';
import { Ingredient } from './ingredient';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IngredientService } from './ingredient-service';
import { finalize } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IngredientsDialog } from './ingredients-dialog/ingredients-dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-ingredients-grid',
  imports: [
    IngredientsCard,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './ingredients-grid.html',
  styleUrl: './ingredients-grid.scss',
})
export class IngredientsGrid implements OnInit {
  protected searchTerm = signal('');

  private service = inject(IngredientService);

  protected ingredients = signal<Ingredient[]>([]);

  protected isLoading = signal(false);

  readonly dialog = inject(MatDialog);


  protected filteredIngredients = computed(() => {
    const term = this.searchTerm().toLocaleLowerCase().trim();
    if (!term) return this.ingredients();

    return this.ingredients().filter((ingredient) =>
      ingredient.name.toLocaleLowerCase().includes(term),
    );
  });

  protected clear() {
    this.searchTerm.set('');
  }

  protected trimSearch() {
    this.searchTerm.update((value) => value.trim());
  }

  ngOnInit(): void {
    this.isLoading.set(true);
this.getlAllIngredients();
  }

  private getlAllIngredients(){
    this.service
      .getAll()
      .pipe(finalize(() => {}))
      .subscribe({
        next: (value) => {
          this.ingredients.set(value);
          this.isLoading.set(false);
        },
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(IngredientsDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(!!result){
            this.service
      .create(result)
      .pipe(finalize(() => {}))
      .subscribe({
        next: (value) => {
          this.isLoading.set(false);
          this.getlAllIngredients();
        },
      });
      }
    });
  }
}

