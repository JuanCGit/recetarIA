import { Component, computed, linkedSignal } from '@angular/core';
import { Button } from 'primeng/button';
import { CustomInputComponent } from '../../../../components/custom-input/custom-input.component';
import { Editor } from 'primeng/editor';
import { FileUpload } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { ScreenSizeService } from '../../../../../services/screen-size.service';
import { RecipesService } from '../../../../services/recipes/recipes.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.component.html',
  styleUrl: './create.page.component.scss',
  standalone: true,
  imports: [Button, CustomInputComponent, Editor, FileUpload, FormsModule],
})
export class CreatePageComponent {
  isMobile = computed(() => this.screenSize.isMobile());
  generatedRecipe = computed(() => this.recipeService.generatedRecipe());
  recipeName = linkedSignal(
    () => this.recipeService.generatedRecipe()?.name ?? '',
  );
  recipeDescription = linkedSignal(
    () => this.recipeService.generatedRecipe()?.recipe ?? '',
  );

  constructor(
    private screenSize: ScreenSizeService,
    private recipeService: RecipesService,
  ) {}
}
