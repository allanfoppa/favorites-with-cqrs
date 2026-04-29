import { signalStore, withState, withComputed, withMethods, patchState, withHooks } from '@ngrx/signals'; // For state management
import { computed, inject } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { CreateFavoriteCommand, Favorite } from '../models/favorite.model';

export const FavoritesStore = signalStore(
  { providedIn: 'root' },
  withState({ // Initial state that stores a list of favorites, loading status, and filter text
    items: [] as Favorite[],
    isLoading: false,
    filterText: '',
  }),
  withComputed(({ items, filterText }) => ({ // Derived state for filtered favorites and total count always the base state is updated.
    /** Query: Filtered list based on search signal */
    filteredFavorites: computed(() => {
      const search = filterText().toLowerCase();
      return items().filter(f => f.title.toLowerCase().includes(search));
    }),
    /** Query: Total count derived state */
    totalCount: computed(() => items().length),
  })),
  withMethods((store, service = inject(FavoriteService)) => ({ // Methods to interact with the state and perform side effects like API calls
    async loadAll(): Promise<void> {
      patchState(store, { isLoading: true });
      const items = await service.getFavorites();
      patchState(store, { items, isLoading: false });
    },
    async addFavorite(command: CreateFavoriteCommand): Promise<void> {
      const newItem = await service.create(command);
      patchState(store, (state) => ({ items: [...state.items, newItem] }));
    },
    async removeFavorite(id: string): Promise<void> {
      await service.delete(id);
      patchState(store, (state) => ({
        items: state.items.filter(item => item.id !== id)
      }));
    },
    updateFilter(text: string): void {
      patchState(store, { filterText: text });
    }
  })),
  withHooks({
    onInit(store) {
      console.log('FavoritesStore initialized');
    },
  })
);
