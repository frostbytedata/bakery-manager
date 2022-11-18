import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesPage } from './recipes.page';
import { AppMaterialModule } from '../../app-material.module';
import { UiComponentsModule } from '../../components/ui/ui-components.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    title: 'Recipes',
    component: RecipesPage,
  },
  {
    path: ':id',
    title: 'Recipe',
    component: RecipesPage,
  },
];

@NgModule({
  declarations: [RecipesPage],
  providers: [],
  exports: [RecipesPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppMaterialModule,
    UiComponentsModule,
  ],
})
export class RecipesPageModule {}
