import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from './auth-guard';
import { DityPawsHttpInterceptor } from './http-interceptor';

// Customizable UI Loader
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';

// Material Components
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Screens and Components below
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custom configuration for the Ngx UI Loader
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#ff3333',
  bgsColor: '#ff3333',
  fgsPosition: POSITION.centerCenter,
  bgsPosition: POSITION.centerCenter,
  fgsSize: 80,
  bgsSize: 60,
  fgsType: SPINNER.squareJellyBox,
  bgsType: SPINNER.ballSpinClockwise,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,
  blur: 3,
  overlayColor: 'rgba(40, 40, 40, 0.8)',
  hasProgressBar: false,
  text: 'Loading...',
  textPosition: POSITION.centerCenter,
  textColor: '#ffffff'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    NavbarComponent,
    HomeScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DityPawsHttpInterceptor,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
