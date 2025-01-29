import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { nonAuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'ai-chef',
        loadComponent: () =>
          import('./pages/dashboard/pages/ai-chef/ai-chef.page.component').then(
            (c) => c.AiChefPageComponent,
          ),
      },
      {
        path: 'library',
        loadComponent: () =>
          import('./pages/dashboard/pages/library/library.page.component').then(
            (c) => c.LibraryPageComponent,
          ),
      },
      {
        path: 'library/:recipeId',
        loadComponent: () =>
          import('./pages/dashboard/pages/recipe/recipe.page.component').then(
            (c) => c.RecipePageComponent,
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./pages/dashboard/pages/create/create.page.component').then(
            (c) => c.CreatePageComponent,
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'ai-chef',
      },
    ],
    //canActivate: [authGuard],
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [nonAuthGuard],
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [nonAuthGuard],
  },
  {
    path: '**',
    redirectTo: 'ai-chef',
  },
];
