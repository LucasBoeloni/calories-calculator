import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../ingredients-grid/ingredient';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class User {
  private httpClient = inject(HttpClient)

  public getAll() : Observable<UserModel[]>{
    return this.httpClient.get<UserModel[]>(`api/user`)
  }

  public save(user) : Observable<UserModel>{
    return this.httpClient.post<UserModel>(`api/user`,user);

  }
}
