import { NgModule } from '@angular/core';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { InputMaskModule } from '@ngneat/input-mask';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatInputModule,
    InputMaskModule,
    MatTooltipModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4000 } },
  ],
  exports: [
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatInputModule,
    InputMaskModule,
    MatTooltipModule,
  ],
})
export class AppMaterialModule {}
