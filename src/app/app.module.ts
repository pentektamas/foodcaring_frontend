import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule, routes} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './components/layout-components/navbar/navbar.component';
import {GeneralLayoutComponent} from './components/layout-components/general-layout/general-layout.component';
import {LoginPageComponent} from './components/account-components/login-page/login-page.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {MainPageComponent} from './components/main-page/main-page.component';
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterPageComponent} from './components/register-page/register-page.component';
import {MatSelectModule} from '@angular/material/select';
import {MenuTableComponent} from './components/menu/menu-table/menu-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {AuthenticationInterceptor} from './interceptors/http-request.interceptor';
import {CreateRestaurantResponsibleComponent} from './components/restaurant-responsible/create-restaurant-responsible/create-restaurant-responsible.component';
import {UpdateRestaurantResponsibleComponent} from './components/restaurant-responsible/update-restaurant-responsible/update-restaurant-responsible.component';
import {CreateMenuComponent} from './components/menu/create-menu/create-menu.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {UpdateMenuComponent} from './components/menu/update-menu/update-menu.component';
import {SuccessModalComponent} from './components/modals/success-modal/success-modal.component';
import {ErrorModalComponent} from './components/modals/error-modal/error-modal.component';
import {DisadvantagedPeopleTableComponent} from './components/disadvantaged-persons/disadvantaged-persons-table/disadvantaged-persons-table.component';
import {UpdatePriorityDisadvantagedPersonComponent} from './components/disadvantaged-persons/update-priority-disadvantaged-person/update-priority-disadvantaged-person.component';
import {DisadvantagedPersonsTableSortedComponent} from './components/disadvantaged-persons/disadvantaged-persons-table-sorted/disadvantaged-persons-table-sorted.component';
import {RestaurantResponsibleTableComponent} from './components/restaurant-responsible/restaurant-responsible-table/restaurant-responsible-table.component';
import {CreateDonationComponent} from './components/donor/create-donation/create-donation.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSliderModule} from '@angular/material/slider';
import {AllergiesPageComponent} from './components/allergies/allergies-page/allergies-page.component';
import {MenuItemTableComponent} from './components/menu/menu-item-table/menu-item-table.component';
import {UpdateDisadvantagedPersonComponent} from './components/disadvantaged-persons/update-disadvantaged-person/update-disadvantaged-person.component';
import {CreateDisadvantagedPersonComponent} from './components/disadvantaged-persons/create-disadvantaged-person/create-disadvantaged-person.component';
import {DonationsChartComponent} from './components/donations-chart/donations-chart.component';
import {CreateItemComponent} from './components/menu/create-item/create-item.component';
import {UpdateItemComponent} from './components/menu/update-item/update-item.component';
import {WishlistTableComponent} from './components/wishlist/wishlist-table/wishlist-table.component';
import {WeeklyMenuTableComponent} from './components/menu/weekly-menu-table/weekly-menu-table.component';
import {DonationsTableComponent} from './components/donations/donations-table/donations-table.component';
import {CreateWeeklyMenuComponent} from './components/menu/create-weekly-menu/create-weekly-menu.component';


import {
  CategoryService,
  ChartModule,
  ColumnSeriesService,
  DataLabelService,
  LegendService,
  LineSeriesService,
  TooltipService
} from '@syncfusion/ej2-angular-charts';
import {DonorDonationsTableComponent} from "./components/donor/donor-donations-table/donor-donations-table.component";
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GeneralLayoutComponent,
    LoginPageComponent,
    ErrorPageComponent,
    MainPageComponent,
    CreateRestaurantResponsibleComponent,
    UpdateRestaurantResponsibleComponent,
    MenuTableComponent,
    RegisterPageComponent,
    CreateMenuComponent,
    UpdateMenuComponent,
    SuccessModalComponent,
    ErrorModalComponent,
    RestaurantResponsibleTableComponent,
    DisadvantagedPeopleTableComponent,
    UpdatePriorityDisadvantagedPersonComponent,
    DisadvantagedPersonsTableSortedComponent,
    MenuItemTableComponent,
    UpdateDisadvantagedPersonComponent,
    CreateDisadvantagedPersonComponent,
    AllergiesPageComponent,
    CreateItemComponent,
    WishlistTableComponent,
    UpdateItemComponent,
    WeeklyMenuTableComponent,
    DonationsTableComponent,
    CreateWeeklyMenuComponent,
    DonationsChartComponent,
    CreateDonationComponent,
    DonorDonationsTableComponent,
    ProfilePageComponent
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
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatAutocompleteModule,
    ChartModule,
    MatStepperModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  },
    CategoryService, ColumnSeriesService, LineSeriesService, DataLabelService, LegendService, TooltipService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
