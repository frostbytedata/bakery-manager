import { Injectable } from '@angular/core';
import { AddIngredientDialog } from './add-ingredient.dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Ingredient } from '../../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class AddIngredientDialogService {
  constructor(public dialog: MatDialog) {}
  open(ingredient?: Ingredient): MatDialogRef<AddIngredientDialog> {
    return this.dialog.open(AddIngredientDialog, {
      data: { ingredient: ingredient },
      panelClass: 'custom-dialog-class',
    });
  }
}
