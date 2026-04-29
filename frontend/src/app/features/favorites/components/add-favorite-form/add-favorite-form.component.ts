import { Component, ChangeDetectionStrategy, output, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateFavoriteCommand } from '../../models/favorite.model';

@Component({
  selector: 'app-add-favorite-form',
  templateUrl: './add-favorite-form.component.html',
  styleUrl: './add-favorite-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  host: {
    class: 'modal-overlay',
    role: 'dialog',
    'aria-modal': 'true',
  },
})
export class AddFavoriteFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  close = output<void>();
  save = output<CreateFavoriteCommand>();

  /** Signal-ready Reactive Form */
  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    url: ['', [Validators.required, Validators.pattern('https?://.+')]],
    isFavorite: [true],
  });

  submit(): void {
    if (this.form.valid) {
      this.save.emit(this.form.getRawValue());
    }
  }
}
