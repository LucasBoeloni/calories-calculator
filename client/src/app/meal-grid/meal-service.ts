import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MealIngredient } from './meal-ingredient';
import { Meal } from './meal';

@Injectable({
  providedIn: 'root',
})
export class MealService {
    private httpClient = inject(HttpClient)

  public getAll() : Observable<any[]>{
    return this.httpClient.get<any[]>(`api/meal/from-user/${1}`)
  }

  public updateMeal(meal) : Observable<Meal>{
    return this.httpClient.post<Meal>(`api/meal`,meal)
  }

    public delete(id) : Observable<Meal>{
    return this.httpClient.delete<Meal>(`api/meal/${id}`)
  }

}
