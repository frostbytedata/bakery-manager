import { Injectable } from '@angular/core';
import { AddIngredientDialog } from './add-ingredient.dialog';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AddIngredientDialogService {
  constructor(public dialog: MatDialog) {}
  open(): void {
    const dialogRef = this.dialog.open(AddIngredientDialog, {
      panelClass: 'custom-dialog-class',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
