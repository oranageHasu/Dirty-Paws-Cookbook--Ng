import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { LoginService } from '../../services/login-service';
import { Router } from '@angular/router';
import { ROUTE_LOGIN, MAIN_APP_ROUTE, ROUTE_RECIPES } from '../../classes/ui-constants';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  isDarkTheme: boolean = false;

  fillerNav = Array.from({ length: 3 }, (_, i) => `Nav Item ${i + 1}`);

  private mobileQueryListener: () => void;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private api: LoginService,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.IsDarkTheme();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  public GoHome() {

    // Send the user to the User home
    this.router.navigate([`/${MAIN_APP_ROUTE}/${ROUTE_RECIPES}`]);

  }

  public ToggleDarkTheme(checked: boolean) {

    this.themeService.SetDarkTheme(checked);
    this.isDarkTheme = this.themeService.IsDarkTheme();

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
