import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoginService } from './services/login-service';
import { ROUTE_LOGIN } from './classes/ui-constants';

@Injectable()
export class DityPawsHttpInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private loginAPI: LoginService
  ) { }

  // Function which will be called for all http calls
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let updatedRequest: HttpRequest<any>;

    // Clone the intercepted HTTP request
    // Update the HTTP Headers
    updatedRequest = request.clone({
      withCredentials: true,
      headers: this.getHTTPHeaders()
    });

    // Handle the HTTP request
    return next.handle(updatedRequest).pipe(
      map((event: HttpEvent<any>) => {

        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {

        /* Manage any error states returned by the HTTP request
         * Ok, so I thought about this... It really makes sense to do the logout sequence regarldess of the error type
         * If there is a cors issue, authentication issue, server 500 error, etc. the default case should be to get the current user OUT of the program.
         *
         * I think we should be making EXCEPTIONS ONLY.  I can see like a 400 or 404 error, as those are PROGRAMMING ERRORS
         *
         */
        let performLogout = true;

        // Do not perform the logout for 400 or 404 errors (these tend to be programmer bugs)
        // Make sure the console output is displayed to notify the coder
        if (error.status === 400) {

          console.log('HTTP-Interceptor - HTTP ERROR 400 (unhandled).  Note: Logout sequence will not run under this condition.');
          performLogout = false;

        } else if (error.status === 404) {

          console.log('HTTP-Interceptor - HTTP ERROR 404 (unhandled).  Note: Logout sequence will not run under this condition.');
          performLogout = false;

        }

        if (performLogout) {

          // Clear this users cached info (logging them out)
          this.loginAPI.Logout(false);

          // Route the user to the login screen
          this.router.navigateByUrl(`/${ROUTE_LOGIN}`);

        }

        return throwError(error);

      }));
  }

  private getHTTPHeaders(): HttpHeaders {

    let retval: HttpHeaders = new HttpHeaders();

    retval = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return retval;
  }

}
