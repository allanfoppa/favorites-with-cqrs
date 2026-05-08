import { Component, inject } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { FavoritesStore } from '../../features/favorites/store/favorites.store';

import { FavoriteDialogComponent } from '../../features/favorites/components/favorite-dialog/favorite-dialog.component';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule],
})
export class HeaderComponent {
  readonly store = inject(FavoritesStore);

  private readonly dialog = inject(MatDialog);

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(FavoriteDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;

      await this.store.addFavorite({
        title: result.title,
        url: result.url,
        isFavorite: true,
      });
    });
  }
}
