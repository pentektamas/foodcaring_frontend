import {Component, OnInit} from '@angular/core';
import {Restaurant} from '../../../models/restaurant.model';
import {DonationValidator} from '../../../validators/donation.validator';
import {MatDialog} from '@angular/material/dialog';
import {RestaurantService} from '../../../services/restaurant.service';
import {MenuService} from '../../../services/menu.service';
import {DisadvantagedPersonService} from '../../../services/disadvantaged-person.service';
import {Menu} from '../../../models/menu.model';
import {FormGroup} from "@angular/forms";
import {DisadvantagedPerson} from "../../../models/disadvantaged-person.model";

@Component({
  selector: 'app-create-donation',
  templateUrl: './create-donation.component.html',
  styleUrls: ['./create-donation.component.scss']
})
export class CreateDonationComponent implements OnInit {

  public restaurants: Restaurant[] = [];
  public menus: Menu[] = [];
  public disadvantagedPersons: DisadvantagedPerson[] = [];

  firstStep: FormGroup;
  secondStep: FormGroup;

  public donationValidator: DonationValidator;

  constructor(public dialog: MatDialog, public restaurantService: RestaurantService, public menuService: MenuService, public disadvantagedPersonService: DisadvantagedPersonService) {
    this.donationValidator = new DonationValidator();
    this.firstStep = new FormGroup({
      menuForm: this.donationValidator.menuForm,
      restaurantForm: this.donationValidator.restaurantForm
    }
  );
    this.secondStep = new FormGroup({
        disadvantagedPersonForm: this.donationValidator.disadvantagedPersonForm
      }
    );
  }

  ngOnInit(): void {
    this.restaurantService.getAll().subscribe(
      (data) => this.restaurants = data
    );
    this.disadvantagedPersonService.getAll().subscribe(
      (data) => this.disadvantagedPersons = data
    );
  }

  getMenus(): void{
    this.menus = this.donationValidator.restaurantForm.value.menus;
  }

  createDonation(): void{
    const donation = this.donationValidator.getDonation();
    console.log(donation);
  }

  getRandomDisadvantagedPerson(): void{
    //TODO
  }
}

