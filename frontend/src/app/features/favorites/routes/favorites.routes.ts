import { Routes } from '@angular/router';
import { FavoritesPageComponent } from '../page/favorites-page.component';

/** * Feature-specific routes.
 * This allows the favorites module to be lazy-loaded independently.
 */
export const FAVORITES_ROUTES: Routes = [
  {
    path: '',
    component: FavoritesPageComponent,
  },
];
