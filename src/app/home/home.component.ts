import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Food } from '../models/food';
import { FoodService } from '../services/food.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  foods:Food[] = [];

  constructor(private foodService:FoodService) {}

  ngOnInit():void {
    this.getAllFoods();
  }

  getAllFoods(){
    this.foodService.getFoods().subscribe((data) => {
      this.foods = data;
    }
  )}
}
