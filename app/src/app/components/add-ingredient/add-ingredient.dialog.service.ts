import { Injectable } from '@angular/core';
import { AddIngredientDialog } from './add-ingredient.dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AddIngredientDialogService {
  constructor(public dialog: MatDialog) {}
  open(): MatDialogRef<AddIngredientDialog> {
    return this.dialog.open(AddIngredientDialog, {
      panelClass: 'custom-dialog-class',
    });
  }
}
