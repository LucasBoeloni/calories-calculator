import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Ingredient } from './ingredient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
    private httpClient = inject(HttpClient)

  public getAll() : Observable<Ingredient[]>{
    return this.httpClient.get<Ingredient[]>(`api/ingredient`)
  }

  public create(entity: Ingredient) : Observable<Ingredient[]>{
    return this.httpClient.post<Ingredient[]>(`api/ingredient`, entity);
  }

}
