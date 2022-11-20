import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, tap } from 'rxjs';
import { UnitService } from '../../services/unit.service';
import { Unit } from '../../models/unit.model';
import { IngredientService } from '../../services/ingredient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ingredient, IngredientDto } from '../../models/ingredient.model';
import { UnsubscribeOnDestroyAdapter } from '../../shared/unsub-on-destroy';
import { CurrencyMask } from '../../shared/currency.mask';

@Component({
  selector: 'bm-add-ingredient',
  templateUrl: './add-ingredient.dialog.html',
  styleUrls: ['./add-ingredient.dialog.scss'],
})
export class AddIngredientDialog
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  form: FormGroup = new FormGroup<any>([]);
  loading = false;
  units: Unit[] = [];
  currencyMask = CurrencyMask;
  constructor(
    public dialogRef: MatDialogRef<AddIngredientDialog>,
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
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      cost: [0, [Validators.required, Validators.min(0)]],
      defaultUnitId: ['', [Validators.required, Validators.nullValidator]],
    });
    const ingredient: Ingredient = this.data?.ingredient;
    this.subs.sink = this.unitService
      .getAll()
      .pipe(
        tap(() => {
          this.loading = true;
        }),
        first(),
      )
      .subscribe((units: Unit[]) => {
        this.units = units;
        this.form = this.fb.group({
          name: [ingredient?.name ? ingredient.name : '', Validators.required],
          description: [
            ingredient?.description ? ingredient.description : '',
            Validators.required,
          ],
          cost: [
            ingredient?.cost ? ingredient.cost : '',
            [Validators.required, Validators.min(0)],
          ],
          defaultUnitId: [
            ingredient?.defaultUnit?.id
              ? ingredient.defaultUnit?.id
              : this.units[0]?.id,
            [Validators.required, Validators.nullValidator],
          ],
        });
        this.loading = false;
      });
  }

  saveIngredient() {
    this.loading = true;
    const payload: IngredientDto = {
      name: this.form.value.name,
      description: this.form.value.description,
      cost: this.form.value.cost,
      defaultUnitId: this.form.value.defaultUnitId,
    };
    if (this.data?.ingredient?.id) {
      payload.id = this.data.ingredient.id;
    }
    this.subs.sink = this.ingredientService
      .save(payload)
      .pipe(first())
      .subscribe({
        next: (result) => {
          this.sb.open('Ingredient Saved!', '', { duration: 5000 });
          this.loading = false;
          this.dialogRef.close(result?.body);
        },
        error: (err) => {
          this.sb.open('There was an error saving this ingredient ⚠', '', {
            duration: 5000,
          });
          this.loading = false;
          this.dialogRef.close();
        },
      });
  }
}
