import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [MatSnackBarModule, MatDialogModule],
  providers: [],
  exports: [MatSnackBarModule, MatDialogModule],
})
export class AppMaterialModule {}
