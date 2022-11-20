import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '../../../shared/unsub-on-destroy';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyMask } from '../../../shared/currency.mask';
import { first, take, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Unit } from '../../../models/unit.model';
import { Recipe } from '../../../models/recipe.model';
@Component({
  selector: 'bm-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage extends UnsubscribeOnDestroyAdapter implements OnInit {
  form: FormGroup = new FormGroup<any>([]);
  loading = false;
  currencyMask = CurrencyMask;
  mode: string = 'new';
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
    this.route.params.subscribe((params) => {
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
              this.form = this.fb.group({
                name: [recipe?.name ? recipe.name : '', Validators.required],
                description: [
                  recipe?.description ? recipe.description : '',
                  Validators.required,
                ],
                ingredients: [],
                retailPrice: [
                  recipe?.retailPrice ? recipe.retailPrice : '',
                  [Validators.required, Validators.min(0)],
                ],
                wholesalePrice: [
                  recipe?.wholesalePrice ? recipe.wholesalePrice : '',
                  [Validators.required, Validators.min(0)],
                ],
              });
              this.loading = false;
            },
          });
      }
    });
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      ingredients: [],
      retailPrice: [0, [Validators.required, Validators.min(0)]],
      wholesalePrice: [0, [Validators.required, Validators.min(0)]],
    });
  }

  saveRecipe() {
    this.subs.sink = this.recipeService
      .save({
        name: this.form.value.name,
        description: this.form.value.description,
        ingredients: [],
        retailPrice: this.form.value.retailPrice,
        wholesalePrice: this.form.value.wholesalePrice,
      })
      .pipe(first())
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
