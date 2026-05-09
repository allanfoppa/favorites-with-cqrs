import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
  withHooks,
} from '@ngrx/signals'; // For state management
import { computed, inject } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import {
  CreateFavoriteCommand,
  DeleteFavoriteCommand,
  Favorite,
  UpdateFavoriteCommand,
} from '../models/favorite.model';

export const FavoritesStore = signalStore(
  { providedIn: 'root' },
  withState({
    // Initial state that stores a list of favorites, loading status, and filter text
    items: [] as Favorite[],
    isLoading: false,
    filterText: '',
  }),
  withComputed(({ items, filterText }) => ({
    filteredFavorites: computed(() => {
      const search = filterText().toLowerCase();

      return items().filter((favorite) => favorite.title.toLowerCase().includes(search));
    }),

    totalCount: computed(() => items().length),

    activeFavorites: computed(() => items().filter((item) => item.isFavorite).length),

    inactiveFavorites: computed(() => items().filter((item) => !item.isFavorite).length),

    uniqueDomains: computed(() => {
      const domains = items().map((item) => {
        try {
          return new URL(item.url).hostname;
        } catch {
          return '';
        }
      });

      return new Set(domains).size;
    }),
  })),
  withMethods((store, service = inject(FavoriteService)) => ({
    // Methods to interact with the state and perform side effects like API calls
    async loadAll(): Promise<void> {
      patchState(store, { isLoading: true });
      const items = await service.getFavorites();
      patchState(store, { items, isLoading: false });
    },
    async addLink(command: CreateFavoriteCommand): Promise<void> {
      const newItem = await service.create(command);
      patchState(store, (state) => ({ items: [...state.items, newItem] }));
    },
    async removeLink(command: DeleteFavoriteCommand): Promise<void> {
      await service.delete(command);
      patchState(store, (state) => ({
        items: state.items.filter((item) => item.id !== command.id),
      }));
    },
    async addFavorite(command: UpdateFavoriteCommand): Promise<void> {
      await service.update(command);

      patchState(store, (state) => ({
        items: state.items.map((item) =>
          item.id === command.id
            ? {
                ...item,
                isFavorite: command.isFavorite ?? item.isFavorite,
              }
            : item,
        ),
      }));
    },
    async removeFavorite(command: UpdateFavoriteCommand): Promise<void> {
      await service.update(command);

      patchState(store, (state) => ({
        items: state.items.map((item) =>
          item.id === command.id
            ? {
                ...item,
                isFavorite: command.isFavorite ?? item.isFavorite,
              }
            : item,
        ),
      }));
    },
    updateFilter(text: string): void {
      patchState(store, { filterText: text });
    },
  })),
  withHooks({
    onInit(store) {
      console.log('FavoritesStore initialized');
    },
  }),
);
