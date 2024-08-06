import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { FoodService } from '../services/food.service';
import { FileUploadModule } from 'primeng/fileupload';
import { FileSelectEvent } from 'primeng/fileupload';


@Component({
  selector: 'app-food-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    RouterModule,
    InputTextModule,
    InputNumberModule,
    CardModule,
    FileUploadModule
  ],
  templateUrl: './food-form.component.html',
  styleUrl: './food-form.component.scss'
})
export class FoodFormComponent {
  formFood!: FormGroup //Tracks the value and validity state of a group of FormControl instances.
  isSaveInProgress: boolean = false;
  edit: boolean = false;
  selectedFile:File | null = null;

  constructor(private fb: FormBuilder,
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    this.formFood = this.fb.group({
      id: [null], //en caso de estar editando
      name: ['', Validators.required],
      mount: ['', Validators.required, Validators.min(1)],
      unit: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id'); //obtiene un parámetro de ruta de la URL activa.
    if (id !== 'new') { //new es el valor x default
      this.edit = true;
      this.getFoodById(+id!); //[pr so no hay]
    }
  }

  onFileSelected(event:FileSelectEvent){
    this.selectedFile = event.files[0];
  }

  getFoodById(id: number) {
    this.foodService.getFoodById(id).subscribe({
      next: (foundFood) => { //min 23
        this.formFood.patchValue(foundFood);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No encontado'
        });
        this.router.navigateByUrl('/')
      }
    });
  }

  changeImage(event: FileSelectEvent) {
    this.selectedFile = event.files[0];
    if (!this.selectedFile) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Seleccione una imagen e intente nuevamente',
      });
      return;
    }
    this.foodService.updateFoodImage(this.formFood.value.id, this.selectedFile).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Libro actualizado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Revise el archivo seleccionado',
        });
      },
    });
  }

  createFood() {
    if (this.formFood.invalid) { //Datos invalidos
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente'
      });
      return
    }
    if (!this.selectedFile) { //No selecciono imagen
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor seleccione una imagen'
      });
      return
    }
    this.foodService.createFood(this.formFood.value, this.selectedFile).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'sucess',
          summary: 'Guardado',
          detail: 'Comida guardada'
        })
        this.router.navigateByUrl('/')
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Revise los campos e intente nuevamente'
        });
        this.router.navigateByUrl('/')
      }
    });
  }

  updateFood() {
    if (this.formFood.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return;
    }
    this.isSaveInProgress = true;
    this.foodService.updateFood(this.formFood.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Comida actualizada correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Revise los campos e intente nuevamente',
        });
      },
    });
  }
}

