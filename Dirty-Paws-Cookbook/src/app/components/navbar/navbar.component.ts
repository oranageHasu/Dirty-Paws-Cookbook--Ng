import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { LoginService } from '../../services/login-service';
import { Router } from '@angular/router';
import { ROUTE_LOGIN } from '../../classes/ui-constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 3 }, (_, i) => `Nav Item ${i + 1}`);

  private mobileQueryListener: () => void;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private api: LoginService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  public async SignOut() {

    let opResult = false;

    opResult = await this.api.Logout(true);

    if (opResult) {
      // Send the user to the User login
      this.router.navigate([`/${ROUTE_LOGIN}`]);
    }

  }

}
