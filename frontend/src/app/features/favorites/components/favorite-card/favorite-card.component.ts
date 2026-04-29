import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Favorite } from '../../models/favorite.model';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrl: './favorite-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  host: {
    class: 'favorite-card',
    role: 'article',
  },
})
export class FavoriteCardComponent {
  /** Input signal for favorite data */
  data = input.required<Favorite>();

  /** Output signal for delete command */
  delete = output<string>();

  onDelete(): void {
    this.delete.emit(this.data().id);
  }
}
