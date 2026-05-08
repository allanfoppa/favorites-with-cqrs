import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-favorite-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './favorite-dialog.component.html',
  styleUrl: './favorite-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteDialogComponent {
  private readonly fb = inject(FormBuilder);

  private readonly dialogRef = inject(MatDialogRef<FavoriteDialogComponent>);

  readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    url: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) return;

    this.dialogRef.close(this.form.getRawValue());
  }
}
