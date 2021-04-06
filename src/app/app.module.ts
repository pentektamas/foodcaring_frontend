import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule, routes} from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './components/layout-components/navbar/navbar.component';
import { GeneralLayoutComponent } from './components/layout-components/general-layout/general-layout.component';
import { LoginPageComponent } from './components/account-components/login-page/login-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GeneralLayoutComponent,
    LoginPageComponent,
    ErrorPageComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
