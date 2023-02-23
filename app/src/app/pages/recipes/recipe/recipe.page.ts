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
import { SelectIngredientDialogService } from '../../../components/select-ingredient/select-ingredient.dialog.service';
import { Ingredient } from '../../../models/ingredient.model';
import { HttpResponse } from '@angular/common/http';

interface RecipeStats {
  cost: number;
  retailProfit: number;
  wholesaleProfit: number;
}

@Component({
  selector: 'bm-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage extends UnsubscribeOnDestroyAdapter implements OnInit {
  form: FormGroup = new FormGroup<any>([]);
  _loading = false;
  stats: RecipeStats = {
    cost: 0,
    retailProfit: 0,
    wholesaleProfit: 0,
  };
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
    private selectIngredientDialogService: SelectIngredientDialogService,
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
                  ingredients: recipe.ingredients,
                  retailPrice: recipe?.retailPrice ? recipe.retailPrice : 0,
                  wholesalePrice: recipe?.wholesalePrice
                    ? recipe.wholesalePrice
                    : 0,
                },
                { emitEvent: false },
              );
              this.loading = false;
              this.computeStats();
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
          this.sb.open('Saved 💾', '', { duration: 2000 });
          this.computeStats();
          this.loading = false;
          this.router.navigate(['recipes/' + result.body.id]);
        },
        error: (err) => {
          this.sb.open('There was an error saving this recipe ⚠', '');
          console.error(err);
          this.loading = false;
        },
      });
  }

  goToRecipesPage() {
    this.router.navigate(['/recipes']);
  }

  addIngredient(event: Event) {
    const addIngredientDialogRef = this.selectIngredientDialogService.open();
    this.subs.sink = addIngredientDialogRef.afterClosed().subscribe({
      next: (dialogResult) => {
        if (dialogResult) {
          this.loading = true;
          this.subs.sink = this.recipeService
            .addIngredient({
              recipeId: Number(this.form.get('id')?.value),
              ...dialogResult,
            })
            .subscribe({
              next: (resp: HttpResponse<Ingredient>) => {
                const ingredientsCtrl = this.form.get('ingredients');
                const ingredients = ingredientsCtrl?.value.concat(resp?.body);
                ingredientsCtrl?.setValue(ingredients);
                this.computeStats();
                this.loading = false;
              },
              error: () => (this.loading = false),
            });
        }
      },
      error: (err) => {
        this.sb.open('There was an error saving this ingredient ⚠', '');
        console.error(err);
        this.loading = false;
      },
    });
  }

  removeIngredient(ingredient: Ingredient) {
    this.loading = true;
    this.subs.sink = this.recipeService
      .removeIngredient(ingredient.id!)
      .subscribe({
        next: () => {
          this.loading = false;
          const ingredientsCtrl = this.form.get('ingredients');
          ingredientsCtrl?.setValue(
            ingredientsCtrl?.value?.filter(
              (ing: Ingredient) => ingredient.id !== ing.id,
            ),
          );
          this.sb.open('Ingredient removed', '');
        },
        error: () => (this.loading = false),
      });
  }

  computeStats() {
    const cost = Number(
      this.form
        .get('ingredients')
        ?.value?.reduce((acc: any, val: any) => acc + val.ingredient.cost, 0),
    );
    this.stats = {
      cost: cost,
      retailProfit: Number(this.form.get('retailPrice')?.value) - cost,
      wholesaleProfit: Number(this.form.get('wholesalePrice')?.value) - cost,
    };
  }
}
