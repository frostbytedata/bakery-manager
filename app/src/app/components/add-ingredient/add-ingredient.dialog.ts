import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'bm-add-ingredient',
  templateUrl: './add-ingredient.dialog.html',
  styleUrls: ['./add-ingredient.dialog.scss'],
})
export class AddIngredientDialog implements OnInit {
  form: FormGroup = new FormGroup<any>([]);
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      defaultUnit: ['', [Validators.required, Validators.nullValidator]],
    });
  }
}
