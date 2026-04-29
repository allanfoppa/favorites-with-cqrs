import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'favorites',
    loadChildren: () =>
      import('./features/favorites/routes/favorites.routes').then((m) => m.FAVORITES_ROUTES),
  },
  {
    path: '',
    redirectTo: 'favorites', // Create a page to default route
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'favorites', // Create a 404 page to handle this case
  },
];
