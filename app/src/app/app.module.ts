import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesModule } from './services/services.module';
import { NavigationModule } from './components/navigation/navigation.module';

@NgModule({
  declarations: [AppComponent, LoginPage],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServicesModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NavigationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
