import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Restaurant} from '../../../models/restaurant.model';
import {DonationValidator} from '../../../validators/donation.validator';
import {MatDialog} from '@angular/material/dialog';
import {RestaurantService} from '../../../services/restaurant.service';
import {MenuService} from '../../../services/menu.service';
import {DisadvantagedPersonService} from '../../../services/disadvantaged-person.service';
import {Menu} from '../../../models/menu.model';
import {FormGroup} from '@angular/forms';
import {DisadvantagedPerson} from '../../../models/disadvantaged-person.model';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DonationService} from '../../../services/donation.service';
import {SuccessModalComponent} from '../../modals/success-modal/success-modal.component';
import {ErrorModalComponent} from '../../modals/error-modal/error-modal.component';
import {DonorService} from "../../../services/donor.service";
import {Donor} from "../../../models/donor.model";

@Component({
  selector: 'app-create-donation',
  templateUrl: './create-donation.component.html',
  styleUrls: ['./create-donation.component.scss']
})
export class CreateDonationComponent implements OnInit {

  public restaurants: Restaurant[] = [];
  public menus: Menu[] = [];
  public donor: Donor;
  public disadvantagedPersons: DisadvantagedPerson[] = [];

  public firstStep: FormGroup;
  public secondStep: FormGroup;
  public thirdStep: FormGroup;

  public donationValidator: DonationValidator;

  public filteredDisadvantagedPersons: Observable<DisadvantagedPerson[]>;
  public selectedDisadvantagedPersons: DisadvantagedPerson[] = [];

  public numberOfPersons = 0;
  public selectRandom: boolean;
  public total = 0;

  @ViewChild('disadvantagedPersonsInput') disadvantagedPersonsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(public dialog: MatDialog, public restaurantService: RestaurantService, public menuService: MenuService,
              public disadvantagedPersonService: DisadvantagedPersonService, public donationService: DonationService,
              public donorService: DonorService) {
    this.donationValidator = new DonationValidator();
    this.firstStep = new FormGroup({
        menuForm: this.donationValidator.menuForm,
        restaurantForm: this.donationValidator.restaurantForm
      }
    );

    this.thirdStep = new FormGroup({
        disadvantagedPersonForm: this.donationValidator.disadvantagedPersonForm
      }
    );

    this.restaurantService.getAll().subscribe(
      (data) => this.restaurants = data
    );
    this.disadvantagedPersonService.getAll().subscribe(
      (data) => {
        this.disadvantagedPersons = data;
        this.filteredDisadvantagedPersons = this.donationValidator.disadvantagedPersonForm.valueChanges.pipe(
          startWith(null),
          map((disadvantagedPerson: string | null) => disadvantagedPerson ? this.filterDisadvantagedPersons(disadvantagedPerson) :
            this.disadvantagedPersons.slice()));
      }
    );
    this.donorService.getByUsername(localStorage.getItem('username')).subscribe(
      data => this.donor = data
    );
  }

  ngOnInit(): void {
    this.total = 0;
  }

  getMenus(): void {
    this.menuService.getAllMenusWithDiscounts(this.donationValidator.restaurantForm.value.id).subscribe(
      (data) => {
        this.menus = data;
        for (const menu of this.menus) {
          if (menu.price === null || menu.price === undefined) {
            menu.price = 0;
            for (const item of menu.itemList) {
              menu.price += item.price;
            }
            menu.price = Math.round((menu.price + Number.EPSILON) * 100) / 100;
          }
          else{
            menu.weekly = '!Discount! ';
            menu.price = Math.round((menu.price + Number.EPSILON) * 100) / 100;
          }
        }
      }
    );
  }

  createDonation(): void {
    const donation = this.donationValidator.getDonation();
    donation.disadvantagedPersons = this.selectedDisadvantagedPersons;
    donation.donor = this.donor;
    this.donationService.create(donation).subscribe(
      () => {
        this.dialog.closeAll();
        this.dialog.open(SuccessModalComponent, {data: `The donation was sent!`});
      }
      , () => {
        this.dialog.open(ErrorModalComponent, {data: `The donation could not be sent!`});
      });
  }

  getRandomDisadvantagedPerson(): void {
    this.disadvantagedPersonService.getUnHelpedDisadvantagedPersons(this.numberOfPersons).subscribe(
      (data) => {
        this.selectedDisadvantagedPersons = data;
        this.total = data.length * this.donationValidator.menuForm.value.price;
      }
    );
  }

  remove(disadvantagedPerson: DisadvantagedPerson): void {
    const index = this.selectedDisadvantagedPersons.indexOf(disadvantagedPerson);

    if (index >= 0) {
      this.selectedDisadvantagedPersons.splice(index, 1);
      this.total -= this.donationValidator.menuForm.value.price;
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let found: boolean;
    for (const disadvantagedPerson of this.selectedDisadvantagedPersons) {
      if (disadvantagedPerson.id === event.option.value.id) {
        found = true;
      }
    }
    if (!found) {
      this.selectedDisadvantagedPersons.push(event.option.value);
      this.total += this.donationValidator.menuForm.value.price;
    }
    this.disadvantagedPersonsInput.nativeElement.value = '';
    this.donationValidator.disadvantagedPersonForm.setValue(null);
  }

  private filterDisadvantagedPersons(value: string): DisadvantagedPerson[] {
    if (value !== null) {
      const filterValue = value.toLowerCase();
      return this.disadvantagedPersons.filter(disadvantagedPerson =>
        (disadvantagedPerson.firstName + ' ' + disadvantagedPerson.lastName).toLowerCase().indexOf(filterValue) === 0);
    }
    return this.disadvantagedPersons;
  }

  initNonRandom(): void {
    this.total = 0;
    this.selectedDisadvantagedPersons = [];
    this.selectRandom = false;
  }

  initRandom(): void {
    this.total = 0;
    this.selectedDisadvantagedPersons = [];
    this.selectRandom = true;
  }
}

