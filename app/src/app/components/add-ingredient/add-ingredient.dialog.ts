import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { UnitService } from '../../services/unit.service';
import { Unit } from '../../models/unit.model';
import { IngredientService } from '../../services/ingredient.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'bm-add-ingredient',
  templateUrl: './add-ingredient.dialog.html',
  styleUrls: ['./add-ingredient.dialog.scss'],
})
export class AddIngredientDialog implements OnInit {
  form: FormGroup = new FormGroup<any>([]);
  loading = false;
  units: Unit[] = [];
  constructor(
    private fb: FormBuilder,
    private unitService: UnitService,
    private ingredientService: IngredientService,
    private sb: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      defaultUnit: ['', [Validators.required, Validators.nullValidator]],
    });
    this.unitService
      .getAll()
      .pipe(
        tap(() => {
          this.loading = true;
        }),
      )
      .subscribe((units: Unit[]) => {
        this.units = units;
        this.loading = false;
      });
  }

  saveIngredient() {
    this.loading = true;
    this.ingredientService
      .save({
        name: this.form.value.name,
        description: this.form.value.description,
        defaultUnitId: this.form.value.defaultUnit.id,
      })
      .subscribe({
        next: () => {
          this.sb.open('Ingredient Saved!');
          this.loading = false;
        },
        error: (err) => {
          this.sb.open('There was an error saving this ingredient ⚠');
          this.loading = false;
        },
      });
  }
}
