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
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {CreateRestaurantResponsibleComponent} from "./components/restaurant-responsible/create-restaurant-responsible/create-restaurant-responsible.component";
import {UpdateRestaurantResponsibleComponent} from "./components/restaurant-responsible/update-restaurant-responsible/update-restaurant-responsible.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GeneralLayoutComponent,
    LoginPageComponent,
    ErrorPageComponent,
    MainPageComponent,
    CreateRestaurantResponsibleComponent,
    UpdateRestaurantResponsibleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
