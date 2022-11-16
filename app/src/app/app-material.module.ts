import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { InputMaskModule } from '@ngneat/input-mask';

@NgModule({
  imports: [
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatInputModule,
    InputMaskModule,
  ],
  providers: [],
  exports: [
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatInputModule,
    InputMaskModule,
  ],
})
export class AppMaterialModule {}
