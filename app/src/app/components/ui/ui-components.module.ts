import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { LowIngredientsComponent } from './widgets/low-ingredients/low-ingredients.component';
import { StatBoxComponent } from './widgets/stat-box/stat-box.component';

@NgModule({
  declarations: [ButtonComponent, LowIngredientsComponent, StatBoxComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, LowIngredientsComponent, StatBoxComponent],
})
export class UiComponentsModule {}
