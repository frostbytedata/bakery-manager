import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NavigationComponent } from './navigation.component';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, AppMaterialModule, AppRoutingModule, ToolbarModule],
  exports: [NavigationComponent],
})
export class NavigationModule {}
