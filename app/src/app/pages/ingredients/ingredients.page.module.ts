import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsPage } from './ingredients.page';
import { AddIngredientModule } from '../../components/add-ingredient/add-ingredient.module';
import { AppMaterialModule } from '../../app-material.module';
import { UiComponentsModule } from '../../components/ui/ui-components.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    title: 'Ingredients',
    component: IngredientsPage,
  },
];

@NgModule({
  declarations: [IngredientsPage],
  providers: [],
  exports: [IngredientsPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppMaterialModule,
    UiComponentsModule,
    AddIngredientModule,
  ],
})
export class IngredientsPageModule {}
