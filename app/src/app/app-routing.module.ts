import { Injectable, NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { Observable } from 'rxjs';
import { HomePage } from './pages/home/home.page';
import { NavigationComponent } from './components/navigation/navigation.component';
import { IngredientsPage } from './pages/ingredients/ingredients.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'home',
        title: 'Home',
        component: HomePage,
      },
      {
        path: 'recipes',
        title: 'Recipes',
        component: HomePage,
      },
      {
        path: 'ingredients',
        title: 'Ingredients',
        component: IngredientsPage,
      },
      {
        path: 'conversions',
        title: 'Conversions',
        component: HomePage,
      },
    ],
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginPage,
  },
  {
    path: 'register',
    title: 'Register',
    component: LoginPage,
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate, CanLoad {
  constructor() {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | boolean {
    return true;
  }

  canLoad(route: Route): Observable<any> | boolean {
    return true;
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [LoggedInGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
