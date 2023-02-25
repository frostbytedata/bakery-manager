import { NgModule } from '@angular/core';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { InputMaskModule } from '@ngneat/input-mask';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatInputModule,
    InputMaskModule,
    MatTooltipModule,
    MatAutocompleteModule,
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { panelClass: 'custom-dialog-class' },
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 5000 },
    },
    {
      provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
      useValue: {
        showDelay: 1000,
        hideDelay: 0,
        disableTooltipInteractivity: true,
      },
    },
  ],
  exports: [
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatInputModule,
    InputMaskModule,
    MatTooltipModule,
    MatAutocompleteModule,
  ],
})
export class AppMaterialModule {}
