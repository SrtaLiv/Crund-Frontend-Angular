import { Routes } from '@angular/router';
import { FoodComponent } from './food/food.component';
import { FoodFormComponent } from './food-form/food-form.component';

//Rutas
export const routes: Routes = [
    {
        path: '',
        component: FoodComponent,
        title: 'Inicio'
    },
    {
        path: 'food-form/:id',
        component: FoodFormComponent,
        title: 'Formulario de Comidas'
    },
    {
        path: '*',
        redirectTo: '',
        pathMatch: 'full'
    }
];
