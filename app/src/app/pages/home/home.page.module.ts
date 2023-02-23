import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../app-material.module';
import { UiComponentsModule } from '../../components/ui/ui-components.module';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomePage,
  },
];

@NgModule({
  declarations: [HomePage],
  providers: [],
  exports: [HomePage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppMaterialModule,
    UiComponentsModule,
  ],
})
export class HomePageModule {}
