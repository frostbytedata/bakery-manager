import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesPage } from './recipes.page';
import { AppMaterialModule } from '../../app-material.module';
import { UiComponentsModule } from '../../components/ui/ui-components.module';
import { RouterModule, Routes } from '@angular/router';
import { RecipePage } from './recipe/recipe.page';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    title: 'Recipes',
    component: RecipesPage,
  },
  {
    path: ':id',
    title: 'Recipe',
    component: RecipePage,
  },
  {
    path: 'new',
    title: 'Recipe',
    component: RecipePage,
  },
];

@NgModule({
  declarations: [RecipesPage, RecipePage],
  providers: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppMaterialModule,
    ReactiveFormsModule,
    UiComponentsModule,
  ],
})
export class RecipesPageModule {}
