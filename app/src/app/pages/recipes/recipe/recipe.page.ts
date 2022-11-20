import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '../../../shared/unsub-on-destroy';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CurrencyMask } from '../../../shared/currency.mask';
import { first, merge, take, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'bm-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage extends UnsubscribeOnDestroyAdapter implements OnInit {
  form: FormGroup = new FormGroup<any>([]);
  _loading = false;
  public get loading() {
    return this._loading;
  }
  public set loading(value: boolean) {
    if (value) {
      this.form.disable({ emitEvent: false });
    } else {
      this.form.enable({ emitEvent: false });
    }
    this._loading = value;
  }
  currencyMask = CurrencyMask;
  mode = 'new';
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sb: MatSnackBar,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subs.sink = this.route.params.subscribe((params) => {
      if (params['id'] !== 'new') {
        this.mode = 'edit';
        this.subs.sink = this.recipeService
          .getOne(params['id'])
          .pipe(
            tap(() => {
              this.loading = true;
            }),
            take(1),
          )
          .subscribe({
            next: (result) => {
              const recipe = result.body;
              this.form.setValue(
                {
                  id: this.mode === 'edit' ? params['id'] : '',
                  name: recipe?.name ? recipe.name : '',
                  description: recipe?.description ? recipe.description : '',
                  ingredients: [],
                  retailPrice: recipe?.retailPrice ? recipe.retailPrice : 0,
                  wholesalePrice: recipe?.wholesalePrice
                    ? recipe.wholesalePrice
                    : 0,
                },
                { emitEvent: false },
              );
              this.loading = false;
            },
          });
      }
    });
    this.initForm();
    this.subscribeToFormFieldEvents();
  }

  initForm(): void {
    this.form = this.fb.group({
      id: new FormControl(null),
      name: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      description: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      ingredients: [],
      retailPrice: new FormControl('', {
        validators: [Validators.required, Validators.min(0)],
        updateOn: 'blur',
      }),
      wholesalePrice: new FormControl('', {
        validators: [Validators.required, Validators.min(0)],
        updateOn: 'blur',
      }),
    });
  }

  subscribeToFormFieldEvents() {
    this.subs.sink = merge(this.form.valueChanges).subscribe({
      next: (formValue) => {
        if (this.form.valid) {
          this.saveRecipe();
        }
      },
    });
  }

  saveRecipe() {
    this.subs.sink = this.recipeService
      .save({
        id: !!this.form.value.id ? Number(this.form.value.id) : null,
        name: this.form.value.name,
        description: this.form.value.description,
        ingredients: [],
        retailPrice: this.form.value.retailPrice,
        wholesalePrice: this.form.value.wholesalePrice,
      })
      .pipe(
        tap(() => {
          this.form.disable({ emitEvent: false });
        }),
        first(),
      )
      .subscribe({
        next: (result) => {
          this.sb.open('Recipe Saved!', '', { duration: 5000 });
          this.loading = false;
          this.router.navigate(['recipes/' + result.body.id]);
        },
        error: (err) => {
          this.sb.open('There was an error saving this recipe ⚠', '', {
            duration: 5000,
          });
          console.error(err);
          this.loading = false;
        },
      });
  }

  goToRecipesPage() {
    this.router.navigate(['/recipes']);
  }
}
