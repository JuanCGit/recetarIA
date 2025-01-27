import {
  Component,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.html',
  styleUrl: './ingredient-list.scss',
  standalone: true,
  imports: [ReactiveFormsModule, InputText],
})
export class IngredientList {
  @Input() ingredients: WritableSignal<FormControl[]> = signal<FormControl[]>(
    [],
  );

  removeIngredient(index: number): void {
    const updatedIngredients = [...this.ingredients()];
    updatedIngredients.splice(index, 1);
    this.ingredients.set(updatedIngredients);
  }
}
