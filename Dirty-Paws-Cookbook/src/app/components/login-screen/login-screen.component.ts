import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../../services/login-service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from '../../models/User';
import { ROUTE_SLASH, ROUTE_HOME, MAIN_APP_ROUTE } from '../../classes/ui-constants';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  @ViewChild('passwordField', { static: false }) passwordField: ElementRef;

  // Public Variables
  public username: string = null;
  public password: string = null;

  // Form State
  public disabledUserLoginMessageVisible = false;
  public errorMessageVisible = false;

  constructor(
    private api: LoginService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit() {
  }

  public async AuthenticateLogin() {

    let user: User;

    try {

      // Display the foreground loading component
      this.ngxService.start('login');

      user = await this.api.AuthenticateLogin(this.username, this.password);

      // On successfull login, navigate to dashboard
      if (user && user.userId != null) {

        // Cache the practice data after a successful login
        await this.api.CacheUserData(user.userName);

        // Send the user to the Home screen of the app
        this.router.navigate([`/${MAIN_APP_ROUTE + ROUTE_SLASH + ROUTE_HOME}`]);

      } else if (user.ExceededAttempts) {

        this.disabledUserLoginMessageVisible = true;

      } else {

        this.errorMessageVisible = true;

      }

    } catch (Err) {

      console.log('ERROR: Failed to authenticate User.');

    } finally {

      // Stop displaying the foreground loading component
      this.ngxService.stop('login');

    }

  }

  public FocusPassword() {

    console.log('here');

    // If there already exists a password, attempt a login.
    // Else, set set focus to the password field
    if (this.password != null && this.password.length > 0) {

      this.AuthenticateLogin();

    } else {

      this.passwordField.nativeElement.focus();

    }

  }
}
