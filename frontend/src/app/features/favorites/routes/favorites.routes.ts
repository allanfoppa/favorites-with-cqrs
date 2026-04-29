import { Routes } from '@angular/router';
import { FavoritesListComponent } from '../components/favorites-list/favorites-list.component';

/** * Feature-specific routes.
 * This allows the favorites module to be lazy-loaded independently.
 */
export const FAVORITES_ROUTES: Routes = [
  {
    path: '',
    component: FavoritesListComponent,
  },
];
