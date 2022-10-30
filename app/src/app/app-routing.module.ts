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
        component: HomePage,
      },
      {
        path: 'recipes',
        component: HomePage,
      },
      {
        path: 'ingredients',
        component: HomePage,
      },
      {
        path: 'conversions',
        component: HomePage,
      },
    ],
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: LoginPage,
  },
  {
    path: '**',
    component: LoginPage,
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
