import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { LoginService } from './services/login-service';
import { ROUTE_RECIPES, MAIN_APP_ROUTE, ROUTE_SLASH } from './classes/ui-constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginAPI: LoginService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    let retval = false;

    if (!this.loginAPI.IsLoggedIn()) {

        retval = true;

    } else {

      // Ensure the user is not trying to manually go to the login screen
      if (next.component === LoginScreenComponent) {

        // If the user tried to manually route to either login screen BUT is already logged in, stop them and re-route back to the Recipe Manager screen
        this.router.navigate([`/${MAIN_APP_ROUTE + ROUTE_SLASH + ROUTE_RECIPES}`]);
        retval = false;

      } else {

        retval = true;

      }

    }

    return of(retval);
  }
}
