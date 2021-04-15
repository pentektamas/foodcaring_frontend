import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RestaurantResponsibleValidator} from '../../../validators/restaurant-responsible.validator';
import {Restaurant} from '../../../models/restaurant.model';
import {RestaurantResponsibleService} from '../../../services/restaurant-responsible.service';

@Component({
  selector: 'app-create-restaurant-responsible',
  templateUrl: './create-restaurant-responsible.component.html',
  styleUrls: ['./create-restaurant-responsible.component.scss']
})
export class CreateRestaurantResponsibleComponent implements OnInit {

  public restaurants: Restaurant[] = [];

  @Output() public refresh = new EventEmitter<any>();

  public restaurantResponsibleValidator: RestaurantResponsibleValidator;

  constructor(public restaurantResponsibleService: RestaurantResponsibleService) {
    this.restaurantResponsibleValidator = new RestaurantResponsibleValidator();
  }

  ngOnInit(): void {
    // TODO getAllRestaurants;
    const r1 = new Restaurant();
    r1.name = 'A1';
    this.restaurants.push(r1);

    const r2 = new Restaurant();
    r2.name = 'A2';
    this.restaurants.push(r2);

    const r3 = new Restaurant();
    r3.name = 'A3';
    this.restaurants.push(r3);

    const r4 = new Restaurant();
    r4.name = 'A4';
    this.restaurants.push(r4);

    const r5 = new Restaurant();
    r5.name = 'A5';
    this.restaurants.push(r5);
  }


  public addRestaurantResponsible(): void {
    const restaurantResponsible = this.restaurantResponsibleValidator.getRestaurantResponsible();
    console.log(restaurantResponsible);
    this.restaurantResponsibleService.create(restaurantResponsible).subscribe(
    );
  }

  public reload(): void {
    this.refresh.next();
  }
}
