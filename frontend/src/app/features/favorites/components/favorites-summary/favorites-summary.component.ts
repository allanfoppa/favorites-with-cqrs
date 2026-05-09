import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-favorites-summary',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './favorites-summary.component.html',
  styleUrl: './favorites-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesSummaryComponent {
  // Input properties to receive summary data from the parent component
  title = input.required<string>();
  value = input.required<number>();
  icon = input.required<string>();
}
