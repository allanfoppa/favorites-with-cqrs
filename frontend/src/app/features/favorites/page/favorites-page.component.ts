import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FavoritesStore } from '../store/favorites.store';

import { FavoriteCardComponent } from '../components/favorite-card/favorite-card.component';
import { FavoriteDialogComponent } from '../components/favorite-dialog/favorite-dialog.component';
import { FavoritesSummaryComponent } from '../components/favorites-summary/favorites-summary.component';
import { DeleteFavoriteCommand, Favorite } from '../models/favorite.model';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FavoriteCardComponent,
    FavoritesSummaryComponent,
  ],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPageComponent {
  readonly store = inject(FavoritesStore);

  private readonly dialog = inject(MatDialog);

  async ngOnInit(): Promise<void> {
    await this.store.loadAll();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(FavoriteDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;

      await this.store.addLink({
        title: result.title,
        url: result.url,
        isFavorite: true,
      });
    });
  }

  async addLink(payload: Favorite): Promise<void> {
    await this.store.addLink(payload);
  }

  async removeLink(command: DeleteFavoriteCommand): Promise<void> {
    await this.store.removeLink(command);
  }

  onSearch(value: string): void {
    this.store.updateFilter(value);
  }
}
