import { Component, ChangeDetectorRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { LoginService } from '../../services/login-service';
import { Router } from '@angular/router';
import { ROUTE_LOGIN, MAIN_APP_ROUTE, ROUTE_RECIPES, WORKFLOW_ROUTE_ADD_RECIPE, WORKFLOW_ROUTE_ADD_RECIPE_OCR } from '../../classes/ui-constants';
import { ThemeService } from '../../services/theme-service';
import { MatSidenav } from '@angular/material/sidenav';
import { CreateRecipeAuthGuard } from '../../workflows/create-recipe/create-recipe-auth-guard';
import { SessionService } from '../../services/session-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  mobileQuery: MediaQueryList;
  isDarkTheme: boolean = false;

  fillerNav = Array.from({ length: 3 }, (_, i) => `Nav Item ${i + 1}`);

  private mobileQueryListener: () => void;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private api: LoginService,
    private router: Router,
    private themeService: ThemeService,
    private sessionService: SessionService
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

  public RouteOcr() {

    this.router.navigate([`/${MAIN_APP_ROUTE}/${WORKFLOW_ROUTE_ADD_RECIPE}/${WORKFLOW_ROUTE_ADD_RECIPE_OCR}`], { state: { workflow: new CreateRecipeAuthGuard(this.router, this.sessionService) } });

    this.sidenav.close();

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
