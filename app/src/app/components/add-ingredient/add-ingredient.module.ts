import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddIngredientDialog } from './add-ingredient.dialog';
import { AddIngredientDialogService } from './add-ingredient.dialog.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '../ui/ui-components.module';
@NgModule({
  declarations: [AddIngredientDialog],
  providers: [AddIngredientDialogService],
  exports: [AddIngredientDialog],
  imports: [CommonModule, ReactiveFormsModule, UiComponentsModule],
})
export class AddIngredientModule {}
