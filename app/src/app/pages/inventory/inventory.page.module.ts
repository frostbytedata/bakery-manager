import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryPage } from './inventory.page';
import { AppMaterialModule } from '../../app-material.module';
import { UiComponentsModule } from '../../components/ui/ui-components.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectIngredientModule } from '../../components/select-ingredient/select-ingredient.module';
import { ShrinkagePage } from './shrinkage/shrinkage.page';
import { BatchesPage } from './batches/batches.page';
import { ProductionPage } from './production/production.page';

const routes: Routes = [
  {
    path: '',
    title: 'Inventory',
    children: [
      {
        path: '',
        component: InventoryPage,
      },
      {
        path: 'overview',
        title: 'Inventory Overview',
        component: InventoryPage,
      },
      {
        path: 'production',
        title: 'Product Production',
        component: ProductionPage,
      },
      {
        path: 'batches',
        title: 'Inventory Batches',
        component: BatchesPage,
      },
      {
        path: 'shrinkage',
        title: 'Shrinkage and Waste',
        component: ShrinkagePage,
      },
      {
        path: 'ingredients',
        title: 'Ingredient List',
        component: InventoryPage,
      },
    ],
  },
];

@NgModule({
  declarations: [InventoryPage, ProductionPage, BatchesPage, ShrinkagePage],
  providers: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppMaterialModule,
    ReactiveFormsModule,
    UiComponentsModule,
    SelectIngredientModule,
  ],
})
export class InventoryPageModule {}
