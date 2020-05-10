import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';

import {
  MAIN_APP_ROUTE,
  ROUTE_HOME,
  ROUTE_LOGIN
} from './classes/ui-constants';

const routes: Routes = [

  // "High-level" routes
  // { path: ROUTE_SPLASH_SCREEN, component: SplashScreenComponent },
  { path: ROUTE_LOGIN, component: LoginScreenComponent, canActivate: [AuthGuard] },
  {
    path: MAIN_APP_ROUTE, component: NavbarComponent, canActivate: [AuthGuard],
    children: [
      { path: ROUTE_HOME, component: HomeScreenComponent, canActivate: [AuthGuard] },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
