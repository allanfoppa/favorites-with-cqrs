import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Favorite } from '../../models/favorite.model';
import { FavoritesFacade } from '../../facade/favorites.facade';

@Component({
  selector: 'app-favorite-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './favorite-card.component.html',
  styleUrl: './favorite-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteCardComponent {
  // Injecting the FavoritesFacade to interact with the state and perform actions
  readonly facade = inject(FavoritesFacade);

  // Input property to receive a favorite item from the parent component
  favorite = input.required<Favorite>();

  readonly isHovering = signal(false);

  onMouseEnter(): void {
    this.isHovering.set(true);
  }

  onMouseLeave(): void {
    this.isHovering.set(false);
  }

  get iconName(): string {
    if (this.favorite().isFavorite) {
      return this.isHovering() ? 'star_outline' : 'star';
    }

    return this.isHovering() ? 'star' : 'language';
  }
}
