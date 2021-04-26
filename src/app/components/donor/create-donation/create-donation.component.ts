import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Restaurant} from '../../../models/restaurant.model';
import {DonationValidator} from '../../../validators/donation.validator';
import {MatDialog} from '@angular/material/dialog';
import {RestaurantService} from '../../../services/restaurant.service';
import {MenuService} from '../../../services/menu.service';
import {DisadvantagedPersonService} from '../../../services/disadvantaged-person.service';
import {Menu} from '../../../models/menu.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DisadvantagedPerson} from '../../../models/disadvantaged-person.model';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-create-donation',
  templateUrl: './create-donation.component.html',
  styleUrls: ['./create-donation.component.scss']
})
export class CreateDonationComponent implements OnInit {

  public restaurants: Restaurant[] = [];
  public menus: Menu[] = [];
  public disadvantagedPersons: DisadvantagedPerson[] = [];

  public firstStep: FormGroup;
  public secondStep: FormGroup;
  public thirdStep: FormGroup;

  public donationValidator: DonationValidator;

  public  filteredDisadvantagedPersons: Observable<DisadvantagedPerson[]>;
  public selectedDisadvantagedPersons: DisadvantagedPerson[] = [];

  public numberOfPersons = 0;
  public selectRandom: boolean;

  @ViewChild('disadvantagedPersonsInput') disadvantagedPersonsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(public dialog: MatDialog, public restaurantService: RestaurantService, public menuService: MenuService, public disadvantagedPersonService: DisadvantagedPersonService) {
    this.donationValidator = new DonationValidator();
    console.log(this.selectRandom);
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
  }

  ngOnInit(): void {

  }

  getMenus(): void {
    this.menus = this.donationValidator.restaurantForm.value.menus;
  }

  createDonation(): void {
    const donation = this.donationValidator.getDonation();
    donation.disadvantagedPersons = this.selectedDisadvantagedPersons;
    console.log(donation);
  }

  getRandomDisadvantagedPerson(): void {
    this.disadvantagedPersonService.getUnHelpedDisadvantagedPersons(this.numberOfPersons).subscribe(
      (data) => this.selectedDisadvantagedPersons = data
    );
  }

  remove(disadvantagedPerson: DisadvantagedPerson): void {
    const index = this.selectedDisadvantagedPersons.indexOf(disadvantagedPerson);

    if (index >= 0) {
      this.selectedDisadvantagedPersons.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let found: boolean;
    for (const disadvantagedPerson of this.selectedDisadvantagedPersons){
      if (disadvantagedPerson.id === event.option.value.id){
        found = true;
      }
    }
    if (!found){
      this.selectedDisadvantagedPersons.push(event.option.value);
    }
    this.disadvantagedPersonsInput.nativeElement.value = '';
    this.donationValidator.disadvantagedPersonForm.setValue(null);
  }

  private filterDisadvantagedPersons(value: string): DisadvantagedPerson[] {
    if (value !== null){
      const filterValue = value.toLowerCase();
      return this.disadvantagedPersons.filter(disadvantagedPerson =>
        (disadvantagedPerson.firstName + ' ' + disadvantagedPerson.lastName).toLowerCase().indexOf(filterValue) === 0);
    }
    return this.disadvantagedPersons;
  }

  initNonRandom(): void{
    this.selectedDisadvantagedPersons = [];
    this.selectRandom = false;
  }

  initRandom(): void{
    this.selectedDisadvantagedPersons = [];
    this.selectRandom = true;
  }
}

