import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Favorite } from '../../models/favorite.model';

@Component({
  selector: 'app-favorite-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './favorite-card.component.html',
  styleUrl: './favorite-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteCardComponent {
  favorite = input.required<Favorite>();

  remove = output<string>();

  onRemove() {
    this.remove.emit(this.favorite().id);
  }
}
