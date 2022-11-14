import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [MatSnackBarModule, MatDialogModule, MatMenuModule],
  providers: [],
  exports: [MatSnackBarModule, MatDialogModule, MatMenuModule],
})
export class AppMaterialModule {}
