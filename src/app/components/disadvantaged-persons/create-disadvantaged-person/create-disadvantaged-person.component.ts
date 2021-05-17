import {Component, OnInit} from '@angular/core';
import {Restaurant} from '../../../models/restaurant.model';
import {DisadvantagedPersonValidator} from '../../../validators/disadvantaged-person.validator';
import {DisadvantagedPersonService} from '../../../services/disadvantaged-person.service';
import {MatDialog} from '@angular/material/dialog';
import {RestaurantService} from '../../../services/restaurant.service';
import {SuccessModalComponent} from '../../modals/success-modal/success-modal.component';
import {ErrorModalComponent} from '../../modals/error-modal/error-modal.component';
import {Role} from "../../../models/enums/role.enum";

@Component({
  selector: 'app-create-disadvantaged-person',
  templateUrl: './create-disadvantaged-person.component.html',
  styleUrls: ['./create-disadvantaged-person.component.scss']
})
export class CreateDisadvantagedPersonComponent implements OnInit {
  public restaurants: Restaurant[] = [];

  public disadvantagedPersonValidator: DisadvantagedPersonValidator;

  constructor(public disadvantagedPersonService: DisadvantagedPersonService, public dialog: MatDialog, public restaurantService: RestaurantService) {
    this.disadvantagedPersonValidator = new DisadvantagedPersonValidator();
  }

  ngOnInit(): void {
    this.restaurantService.getAll().subscribe(
      (data) => this.restaurants = data
    );
  }


  public addDisadvantagedPerson(): void {
    const disadvantagedPerson = this.disadvantagedPersonValidator.getDisadvantagedPerson();
    disadvantagedPerson.role = Role.DISADVANTAGED_PERSON;
    console.log(disadvantagedPerson)
    this.disadvantagedPersonService.createDisadvantagedPerson(disadvantagedPerson).subscribe(
      () => {
        this.dialog.closeAll();
        this.dialog.open(SuccessModalComponent, {data: `The disadvantaged person was created!`});
      }
      , () => {
        this.dialog.open(ErrorModalComponent, {data: `The disadvantaged person could not be created!`});
      });
  }
}
