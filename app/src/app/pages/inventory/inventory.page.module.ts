import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryPage } from './inventory.page';
import { AppMaterialModule } from '../../app-material.module';
import { UiComponentsModule } from '../../components/ui/ui-components.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectIngredientModule } from '../../components/select-ingredient/select-ingredient.module';

const routes: Routes = [
  {
    path: '',
    title: 'Inventory',
    component: InventoryPage,
  },
];

@NgModule({
  declarations: [InventoryPage],
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
