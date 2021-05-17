import {FormControl, Validators} from '@angular/forms';
import {Donation} from '../models/donation.model';
import {MessageErrorConstructorUtils} from '../utils/message-error-constructor.utils';
import {Menu} from '../models/menu.model';
import {Restaurant} from '../models/restaurant.model';
import {DisadvantagedPerson} from '../models/disadvantaged-person.model';

export class DonationValidator {
  public menuForm: FormControl;
  public restaurantForm: FormControl;
  public disadvantagedPersonForm: FormControl;

  constructor() {
    this.init(null);
  }

  public getDonation(): Donation {
    const donation: Donation = new Donation();
    donation.menu = this.menuForm.value as Menu;
    donation.restaurant = this.restaurantForm.value as Restaurant;
    donation.disadvantagedPersons = this.disadvantagedPersonForm.value as DisadvantagedPerson[];
    return donation;
  }


  public getDonationWithId(id: String): Donation {
    const donation: Donation = new Donation();
    donation.id = id;
    donation.menu = this.menuForm.value;
    donation.restaurant = this.restaurantForm.value;
    donation.disadvantagedPersons = this.disadvantagedPersonForm.value as DisadvantagedPerson[];
    return donation;
  }

  public getMenuFormErrors(): string {
    if (this.menuForm.hasError('required')) {
      return MessageErrorConstructorUtils.constructRequiredFieldError('menu');
    }
  }

  public getRestaurantFormErrors(): string {
    if (this.restaurantForm.hasError('required')) {
      return MessageErrorConstructorUtils.constructRequiredFieldError('restaurant');
    }
  }

  public getDisadvantagedPersonFormErrors(): string {
    if (this.disadvantagedPersonForm.hasError('required')) {
      return MessageErrorConstructorUtils.constructRequiredFieldError('disadvantaged person');
    }
  }

  public isValid(): boolean {
    return !this.menuForm.errors && !this.restaurantForm.errors;
  }

  public init(donation: Donation): void {
    this.menuForm = new FormControl(donation?.menu, [Validators.required]);
    this.restaurantForm = new FormControl(donation?.restaurant, [Validators.required]);
    this.disadvantagedPersonForm = new FormControl(donation?.disadvantagedPersons, [Validators.required]);
  }
}
