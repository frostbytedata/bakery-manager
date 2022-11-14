import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, AppMaterialModule, AppRoutingModule],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
