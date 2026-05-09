import { Injectable, inject } from '@angular/core';

import { FavoritesStore } from '../store/favorites.store';
import { DeleteFavoriteCommand, Favorite, UpdateFavoriteCommand } from '../models/favorite.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesFacade {
  private readonly store = inject(FavoritesStore);

  readonly items = this.store.items;
  readonly filteredFavorites = this.store.filteredFavorites;
  readonly totalCount = this.store.totalCount;
  readonly activeFavorites = this.store.activeFavorites;
  readonly uniqueDomains = this.store.uniqueDomains;
  readonly isLoading = this.store.isLoading;

  async loadAll(): Promise<void> {
    await this.store.loadAll();
  }

  async addLink(title: string, url: string): Promise<void> {
    await this.store.addLink({
      title,
      url,
      isFavorite: true,
    });
  }

  async addFavorite(command: UpdateFavoriteCommand): Promise<void> {
    await this.store.addFavorite(command);
  }

  async removeFavorite(command: UpdateFavoriteCommand): Promise<void> {
    await this.store.removeFavorite(command);
  }

  async removeLink(command: DeleteFavoriteCommand): Promise<void> {
    await this.store.removeLink(command);
  }

  async toggleFavorite(favorite: Favorite): Promise<void> {
    console.log('toggleFavorite', favorite);

    if (favorite.isFavorite) {
      await this.removeFavorite({ ...favorite, isFavorite: false });

      return;
    }

    await this.addFavorite({ ...favorite, isFavorite: true });
  }

  updateFilter(text: string): void {
    this.store.updateFilter(text);
  }
}
