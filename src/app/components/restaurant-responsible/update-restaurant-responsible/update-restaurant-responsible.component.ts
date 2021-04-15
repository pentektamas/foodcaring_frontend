import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Restaurant} from "../../../models/restaurant.model";
import {RestaurantResponsibleValidator} from "../../../validators/restaurant-responsible.validator";
import {RestaurantResponsible} from "../../../models/restaurant-responsible.model";
import {RestaurantResponsibleService} from "../../../services/restaurant-responsible.service";

@Component({
  selector: 'app-update-restaurant-responsible',
  templateUrl: './update-restaurant-responsible.component.html',
  styleUrls: ['./update-restaurant-responsible.component.scss']
})
export class UpdateRestaurantResponsibleComponent implements OnInit {

  public restaurants: Restaurant[] = [];

  @Input() public restaurantResponsible: RestaurantResponsible;
  @Output() public refresh = new EventEmitter<any>();

  public restaurantResponsibleValidator: RestaurantResponsibleValidator;

  constructor(public restaurantResponsibleService: RestaurantResponsibleService) {
    this.restaurantResponsibleValidator = new RestaurantResponsibleValidator();
  }

  ngOnInit(): void {
    this.restaurantResponsibleValidator.init(this.restaurantResponsible);
    //TODO getAllRestaurants;
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
    const restaurantResponsible = this.restaurantResponsibleValidator.getRestaurantResponsibleWithId(this.restaurantResponsible.id);
    console.log(restaurantResponsible);
    this.restaurantResponsibleService.update(restaurantResponsible).subscribe();
  }

  public reload(): void {
    this.refresh.next();
  }
}
