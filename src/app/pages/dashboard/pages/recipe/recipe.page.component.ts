import {Component, computed, signal} from '@angular/core';
import { ScreenSizeService } from '../../../../../services/screen-size.service';
import {Editor} from 'primeng/editor';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {CustomInputComponent} from '../../../../components/custom-input/custom-input.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.component.html',
  styleUrl: './recipe.page.component.scss',
  standalone: true,
  imports: [Editor, FormsModule, Button, CustomInputComponent],
})
export class RecipePageComponent {
  isMobile = computed(() => this.screenSize.isMobile());
  isEditing = signal<boolean>(false);
  recipeDescription: any;
  recipeName: any;
  constructor(private screenSize: ScreenSizeService) {}
}
