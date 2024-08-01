import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Food } from '../models/food';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'http://localhost:8080/food';
  
  constructor(private http:HttpClient) { }
  
  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.apiUrl);
  }
 
  getFoodById(id:number): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/${id}`)
  }

  createFood(food:Food){ //peticion de un objeto tipo food
    return this.http.post<Food>(this.apiUrl, food);
  }

  updateFood(food:Food){ //peticion de un objeto tipo food
    return this.http.put(this.apiUrl, food);
  }

  removeFood(id:number){ //peticion de un objeto tipo food
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
