import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { FavoritesStore } from '../../store/favorites.store';
import { FavoriteCardComponent } from '../favorite-card/favorite-card.component';
import { AddFavoriteFormComponent } from '../add-favorite-form/add-favorite-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FavoriteCardComponent,
    AddFavoriteFormComponent,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
  ],
  host: {
    class: 'favorites-hub-container',
    role: 'main',
  },
})
export class FavoritesListComponent implements OnInit {
  readonly store = inject(FavoritesStore);

  /** Signal to control modal visibility */
  isModalOpen = signal(false);

  ngOnInit(): void {
    this.store.loadAll();
  }

  handleSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.store.updateFilter(input.value);
  }

  /** Method called by the (click) in your HTML */
  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }
}
