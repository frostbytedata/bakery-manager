import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [MatSnackBarModule, MatDialogModule, MatMenuModule, MatInputModule],
  providers: [],
  exports: [MatSnackBarModule, MatDialogModule, MatMenuModule, MatInputModule],
})
export class AppMaterialModule {}
