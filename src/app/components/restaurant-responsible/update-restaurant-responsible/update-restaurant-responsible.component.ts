import {Component, Inject, Input, OnInit} from '@angular/core';
import {Restaurant} from '../../../models/restaurant.model';
import {RestaurantResponsibleValidator} from '../../../validators/restaurant-responsible.validator';
import {RestaurantResponsible} from '../../../models/restaurant-responsible.model';
import {RestaurantResponsibleService} from '../../../services/restaurant-responsible.service';
import {RestaurantService} from '../../../services/restaurant.service';
import {SuccessModalComponent} from "../../modals/success-modal/success-modal.component";
import {ErrorModalComponent} from "../../modals/error-modal/error-modal.component";
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-update-restaurant-responsible',
  templateUrl: './update-restaurant-responsible.component.html',
  styleUrls: ['./update-restaurant-responsible.component.scss']
})
export class UpdateRestaurantResponsibleComponent implements OnInit {

  public restaurants: Restaurant[] = [];

  public restaurantResponsibleValidator: RestaurantResponsibleValidator;

  constructor(@Inject(MAT_DIALOG_DATA) public restaurantResponsible: RestaurantResponsible, public restaurantResponsibleService: RestaurantResponsibleService, public restaurantService: RestaurantService,
              public dialog: MatDialog) {
    this.restaurantResponsibleValidator = new RestaurantResponsibleValidator();
  }

  ngOnInit(): void {
    this.restaurantResponsibleValidator.init(this.restaurantResponsible);
    this.restaurantService.getAll().subscribe(
      (data) => this.restaurants = data
    );
  }


  public updateRestaurantResponsible(): void {
    const restaurantResponsible = this.restaurantResponsibleValidator.getRestaurantResponsibleWithId(this.restaurantResponsible.id);
    this.restaurantResponsibleService.update(restaurantResponsible).subscribe(
      () => {
        this.dialog.closeAll();
        this.dialog.open(SuccessModalComponent, {data: `The restaurant responsible was updated!`});
      }
      , () => {
        this.dialog.open(ErrorModalComponent, {data: `The restaurant responsible could not be updated!`});
      });
  }
}
