import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomePage } from './pages/home/home.page';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LowIngredientsComponent } from './components/widgets/low-ingredients/low-ingredients.component';
import { JWTInterceptor } from './services/base.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from './components/toolbar/toolbar.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    HomePage,
    NavigationComponent,
    LowIngredientsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToolbarModule,
  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
