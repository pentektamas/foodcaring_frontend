import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Restaurant} from '../../../models/restaurant.model';
import {RestaurantResponsibleValidator} from '../../../validators/restaurant-responsible.validator';
import {RestaurantResponsible} from '../../../models/restaurant-responsible.model';
import {RestaurantResponsibleService} from '../../../services/restaurant-responsible.service';
import {RestaurantService} from '../../../services/restaurant.service';

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

  constructor(public restaurantResponsibleService: RestaurantResponsibleService, public restaurantService: RestaurantService) {
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
    console.log(restaurantResponsible);
    this.restaurantResponsibleService.update(restaurantResponsible).subscribe(
      () => console.log('SUCCES'),
      () => console.log('ERROR')
    );
  }

  public reload(): void {
    this.refresh.next();
  }
}
