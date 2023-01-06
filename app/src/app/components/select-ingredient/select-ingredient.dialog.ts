import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { UnitService } from '../../services/unit.service';
import { IngredientService } from '../../services/ingredient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ingredient } from '../../models/ingredient.model';
import { UnsubscribeOnDestroyAdapter } from '../../shared/unsub-on-destroy';
import { ingredientValidator } from '../../shared/validators';
import { Unit } from '../../models/unit.model';

@Component({
  selector: 'bm-select-ingredient',
  templateUrl: './select-ingredient.dialog.html',
  styleUrls: ['./select-ingredient.dialog.scss'],
})
export class SelectIngredientDialog
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  form: FormGroup = new FormGroup<any>([]);
  loading = false;
  ingredients: Ingredient[] = [];
  filteredIngredients: Observable<Ingredient[]> | undefined;
  ingredientUnits: Unit[] = [];
  constructor(
    public dialogRef: MatDialogRef<SelectIngredientDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { ingredient: Ingredient },
    private fb: FormBuilder,
    private unitService: UnitService,
    private ingredientService: IngredientService,
    private sb: MatSnackBar,
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      ingredient: ['', [Validators.required, ingredientValidator()]],
      quantity: ['', Validators.required],
      unit: ['', [Validators.required, Validators.nullValidator]],
    });
    this.getIngredients();
    this.filteredIngredients = this.form.get('ingredient')?.valueChanges.pipe(
      startWith(''),
      map((inputValue) =>
        this.ingredients.filter((option) => {
          const inputString =
            typeof inputValue == 'string' ? inputValue : inputValue.name;
          return option.name.toLowerCase().includes(inputString.toLowerCase());
        }),
      ),
    );
    this.subs.sink = this.form
      .get('ingredient')
      ?.statusChanges.subscribe((status) => {
        switch (status) {
          case 'VALID':
            this.ingredientUnits = [
              { ...this.form.get('ingredient')?.value?.defaultUnit },
            ];
            this.form.get('unit')?.setValue(this.ingredientUnits[0].id);
            break;
          case 'INVALID':
            this.form.get('quantity')?.setValue('');
            this.form.get('unit')?.setValue('');
            break;
        }
      });
  }

  selectIngredient() {
    this.loading = true;
    this.sb.open('Ingredient Saved!', '');
    this.loading = false;
    this.dialogRef.close({
      ingredientId: Number(this.form.get('ingredient')?.value?.id),
      quantity: Number(this.form.get('quantity')?.value),
      unitId: Number(this.form.get('unit')?.value),
    });
  }

  getIngredients(pull?: boolean) {
    this.subs.sink = this.ingredientService
      .getAll(pull)
      .pipe(
        tap(() => {
          this.loading = true;
        }),
      )
      .subscribe({
        next: (ings: Ingredient[]) => {
          this.ingredients = ings;
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
          this.loading = false;
        },
      });
  }

  ingredientDisplay(ingredient: Ingredient) {
    return ingredient?.name || '';
  }
}
