import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RestaurantResponsibleValidator} from '../../../validators/restaurant-responsible.validator';
import {Restaurant} from '../../../models/restaurant.model';
import {RestaurantResponsibleService} from '../../../services/restaurant-responsible.service';
import {RestaurantService} from '../../../services/restaurant.service';

@Component({
  selector: 'app-create-restaurant-responsible',
  templateUrl: './create-restaurant-responsible.component.html',
  styleUrls: ['./create-restaurant-responsible.component.scss']
})
export class CreateRestaurantResponsibleComponent implements OnInit {

  public restaurants: Restaurant[] = [];

  @Output() public refresh = new EventEmitter<any>();

  public restaurantResponsibleValidator: RestaurantResponsibleValidator;

  constructor(public restaurantResponsibleService: RestaurantResponsibleService, public restaurantService: RestaurantService) {
    this.restaurantResponsibleValidator = new RestaurantResponsibleValidator();
  }

  ngOnInit(): void {
    this.restaurantService.getAll().subscribe(
      (data) => this.restaurants = data
    );
  }


  public addRestaurantResponsible(): void {
    const restaurantResponsible = this.restaurantResponsibleValidator.getRestaurantResponsible();
    console.log(restaurantResponsible);
    this.restaurantResponsibleService.create(restaurantResponsible).subscribe(
      () => console.log('SUCCESS'),
      () => console.log('ERROR'),
    );
  }

  public reload(): void {
    this.refresh.next();
  }
}
