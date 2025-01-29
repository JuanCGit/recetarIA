import {
  Component,
  computed,
  input,
  linkedSignal,
  resource,
  signal,
  inject,
} from '@angular/core';
import { ScreenSizeService } from '../../../../../services/screen-size.service';
import { Editor } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { CustomInputComponent } from '../../../../components/custom-input/custom-input.component';
import { RecipesService } from '../../../../services/recipes/recipes.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.component.html',
  styleUrl: './recipe.page.component.scss',
  standalone: true,
  imports: [Editor, FormsModule, Button, CustomInputComponent],
})
export class RecipePageComponent {
  #screenSize = inject(ScreenSizeService);
  #recipesService = inject(RecipesService);

  recipeId = input<number | undefined>(undefined);
  recipeResource = resource({
    request: () => ({ recipeId: this.recipeId() }),
    loader: async ({ request }) => {
      return firstValueFrom(this.#recipesService.getRecipe(request.recipeId));
    },
  });
  recipeName = linkedSignal(() => this.recipeResource.value()?.name ?? '');
  recipeDescription = linkedSignal(
    () => this.recipeResource.value()?.recipe ?? '',
  );
  isMobile = computed(() => this.#screenSize.isMobile());
  isEditing = signal<boolean>(false);
}
