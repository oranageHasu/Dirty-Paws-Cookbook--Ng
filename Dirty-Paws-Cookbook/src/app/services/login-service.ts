import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import retry from 'p-retry';
import { User } from '../models/User';
import { LOGIN_RETRY } from '../classes/api-constants';
import { KEY_USERNAME } from '../classes/ui-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  public async ResetPassword(user: User): Promise<boolean> {

    let url: string = null;
    let data: string = null;
    let opResult = false;

    try {

      url = `${environment.apiUrlBase}/login/reset`;
      data = JSON.stringify(user);

      await retry(
        async () => {
          opResult = await this.http
            .post<boolean>(url, data)
            .toPromise();
        },
        { retries: LOGIN_RETRY }
      );

    } catch (err) {
      console.log('ERROR: Failed Reset User Password.');
    }

    return opResult;
  }

  public async AuthenticateLogin(practiceID: string, password: string): Promise<User> {

    let url: string = null;
    let data: string = null;
    let retval: User = null;
    const pLogin: User = new User();

    try {

      pLogin.userName = practiceID;
      pLogin.password = password;

      url = `${environment.apiUrlBase}/login/authenticate`;
      data = JSON.stringify(pLogin);

      await retry(
        async () => {
          retval = await this.http
            .post<User>(url, data)
            .toPromise();
        },
        { retries: LOGIN_RETRY }
      );

    } catch (err) {
      console.log('ERROR: Failed User Authentication.');
    }

    return retval;
  }

  public async CacheUserData(username: string) {

    try {

      if (username != null) {
        localStorage.setItem(KEY_USERNAME, username);
      }

    } catch (err) {
      console.log('ERROR: Failed caching username to local memory.');
    }
  }

  public IsLoggedIn(): boolean {

    let retval = false;

    try {

      if (localStorage.getItem(KEY_USERNAME) != null) {
        retval = true;
      }

    } catch (err) {
      console.log('ERROR: Failed checking username key in local memory.');
    }

    return retval;
  }


  public async Logout(performWebserviceLogout: boolean): Promise<boolean> {

    let opResult = true;

    try {

      // Log the user out
      if (performWebserviceLogout) {
        opResult = await this.webserviceLogout();
      }

      // Clear the cached username
      if (opResult) {
        localStorage.removeItem(KEY_USERNAME);
      }

    } catch (err) {
      console.log(err);
    }

    return opResult;

  }

  private async webserviceLogout(): Promise<boolean> {

    let url: string = null;
    const data: string = null;
    let retval = false;

    url = `${environment.apiUrlBase}/login/logout`;

    await retry(
      async () => {

        try {

          retval = await this.http
            .post<boolean>(url, data)
            .toPromise();

          console.log('cleared service cookie');

        } catch (err) {
          console.log(err, 'Login-Service: Failed clearing Service Cookie / Invalidating Service Cookie');
        }

      },
      { retries: LOGIN_RETRY }
    );

    return retval;

  }
}
