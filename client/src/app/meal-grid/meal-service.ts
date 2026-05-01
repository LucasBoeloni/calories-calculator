import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MealIngredient } from './meal-ingredient';

@Injectable({
  providedIn: 'root',
})
export class MealService {
    private httpClient = inject(HttpClient)

  public getAll() : Observable<any[]>{
    return this.httpClient.get<any[]>(`api/meal/from-user/${1}`)
  }

}
