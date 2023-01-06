import { Injectable } from '@angular/core';
import { SelectIngredientDialog } from './select-ingredient.dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Ingredient } from '../../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class SelectIngredientDialogService {
  constructor(public dialog: MatDialog) {}
  open(ingredient?: Ingredient): MatDialogRef<SelectIngredientDialog> {
    return this.dialog.open(SelectIngredientDialog, {
      data: { ingredient: ingredient },
    });
  }
}
