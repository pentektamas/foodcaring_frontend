import {Component, OnInit} from '@angular/core';
import {RestaurantResponsibleValidator} from '../../../validators/restaurant-responsible.validator';
import {Restaurant} from '../../../models/restaurant.model';
import {RestaurantResponsibleService} from '../../../services/restaurant-responsible.service';
import {RestaurantService} from '../../../services/restaurant.service';
import {SuccessModalComponent} from '../../modals/success-modal/success-modal.component';
import {ErrorModalComponent} from '../../modals/error-modal/error-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-create-restaurant-responsible',
  templateUrl: './create-restaurant-responsible.component.html',
  styleUrls: ['./create-restaurant-responsible.component.scss']
})
export class CreateRestaurantResponsibleComponent implements OnInit {

  public restaurants: Restaurant[] = [];

  public restaurantResponsibleValidator: RestaurantResponsibleValidator;

  constructor(public restaurantResponsibleService: RestaurantResponsibleService, public dialog: MatDialog, public restaurantService: RestaurantService) {
    this.restaurantResponsibleValidator = new RestaurantResponsibleValidator();
  }

  ngOnInit(): void {
    this.restaurantService.getAll().subscribe(
      (data) => this.restaurants = data
    );
  }


  public addRestaurantResponsible(): void {
    const restaurantResponsible = this.restaurantResponsibleValidator.getRestaurantResponsible();
    this.restaurantResponsibleService.create(restaurantResponsible).subscribe(
      () => {
        this.dialog.closeAll();
        this.dialog.open(SuccessModalComponent, {data: `The restaurant responsible was created!`});
      }
      , () => {
        this.dialog.open(ErrorModalComponent, {data: `The restaurant responsible could not be created!`});
      });
  }
}
