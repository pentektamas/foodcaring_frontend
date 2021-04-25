import {Component, Inject, OnInit} from '@angular/core';
import {Restaurant} from '../../../models/restaurant.model';
import {DisadvantagedPersonValidator} from '../../../validators/disadvantaged-person.validator';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DisadvantagedPerson} from '../../../models/disadvantaged-person.model';
import {DisadvantagedPersonService} from '../../../services/disadvantaged-person.service';
import {RestaurantService} from '../../../services/restaurant.service';
import {SuccessModalComponent} from '../../modals/success-modal/success-modal.component';
import {ErrorModalComponent} from '../../modals/error-modal/error-modal.component';
import {Role} from '../../../models/enums/role.enum';

@Component({
  selector: 'app-update-disadvantaged-person',
  templateUrl: './update-disadvantaged-person.component.html',
  styleUrls: ['./update-disadvantaged-person.component.scss']
})
export class UpdateDisadvantagedPersonComponent implements OnInit {

  public restaurants: Restaurant[] = [];

  public disadvantagedPersonValidator: DisadvantagedPersonValidator;

  constructor(@Inject(MAT_DIALOG_DATA) public disadvantagedPerson: DisadvantagedPerson, public disadvantagedPersonService: DisadvantagedPersonService, public restaurantService: RestaurantService,
              public dialog: MatDialog) {
    this.disadvantagedPersonValidator = new DisadvantagedPersonValidator();
  }

  ngOnInit(): void {
    this.disadvantagedPersonValidator.init(this.disadvantagedPerson);
    this.restaurantService.getAll().subscribe(
      (data) => this.restaurants = data
    );
  }


  public updateDisadvantagedPerson(): void {
    const disadvantagedPerson = this.disadvantagedPersonValidator.getDisadvantagedPersonWithId(this.disadvantagedPerson.id);
    disadvantagedPerson.password = '';
    disadvantagedPerson.role = Role.DISADVANTAGED_PERSON;
    this.disadvantagedPersonService.updateDisadvantagedPerson(disadvantagedPerson).subscribe(
      () => {
        this.dialog.closeAll();
        this.dialog.open(SuccessModalComponent, {data: `The disadvantaged person was updated!`});
      }
      , () => {
        this.dialog.open(ErrorModalComponent, {data: `The disadvantaged person could not be updated!`});
      });
  }
}
