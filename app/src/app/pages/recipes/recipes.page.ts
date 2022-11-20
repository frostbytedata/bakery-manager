import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '../../shared/unsub-on-destroy';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'bm-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage extends UnsubscribeOnDestroyAdapter implements OnInit {
  recipes: Recipe[] = [];
  loading = true;

  constructor(private recipeService: RecipeService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(pull?: boolean) {
    this.subs.sink = this.recipeService
      .getAll(pull)
      .pipe(
        tap(() => {
          this.loading = true;
        }),
      )
      .subscribe({
        next: (recipes: Recipe[]) => {
          this.recipes = recipes;
          this.loading = false;
        },
        error: (error: any) => {
          console.log(error);
          this.loading = false;
        },
      });
  }

  goToRecipe(event: Event, id: number | 'new' | undefined): void {
    this.router.navigate(['recipes/' + id]);
  }
}
