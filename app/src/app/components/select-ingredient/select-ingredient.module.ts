import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectIngredientDialog } from './select-ingredient.dialog';
import { SelectIngredientDialogService } from './select-ingredient.dialog.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '../ui/ui-components.module';
import { AppMaterialModule } from '../../app-material.module';
@NgModule({
  declarations: [SelectIngredientDialog],
  providers: [SelectIngredientDialogService],
  exports: [SelectIngredientDialog],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiComponentsModule,
    AppMaterialModule,
  ],
})
export class SelectIngredientModule {}
