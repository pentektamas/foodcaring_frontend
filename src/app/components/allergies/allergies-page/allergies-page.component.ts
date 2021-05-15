import {Component, OnInit} from '@angular/core';
import {DisadvantagedPerson} from '../../../models/disadvantaged-person.model';
import {MatDialog} from '@angular/material/dialog';
import {DisadvantagedPersonService} from '../../../services/disadvantaged-person.service';
import {Form, FormControl, Validators} from '@angular/forms';
import {SuccessModalComponent} from '../../modals/success-modal/success-modal.component';
import {ErrorPageComponent} from '../../error-page/error-page.component';
import {ErrorModalComponent} from '../../modals/error-modal/error-modal.component';

@Component({
  selector: 'app-allergies-page',
  templateUrl: './allergies-page.component.html',
  styleUrls: ['./allergies-page.component.scss']
})
export class AllergiesPageComponent implements OnInit {

  public noAllergies = '';
  public allergies = [] as String[];

  public open = false;

  public allergyForm: FormControl;

  public disadvantagedPerson: DisadvantagedPerson;

  constructor(public dialog: MatDialog, public disadvantagedPersonService: DisadvantagedPersonService) {
    this.allergyForm = new FormControl('',[Validators.required]);
    this.allergies = [] as String[];
  }

  ngOnInit(): void {
    this.disadvantagedPersonService.getByUsername(localStorage.getItem('username')).subscribe(
      (data) => {
        this.disadvantagedPerson = data;
        if (this.disadvantagedPerson.allergies == undefined) {
          this.disadvantagedPerson.allergies = '';
        } else {
          this.allergies = this.stringToList(this.disadvantagedPerson.allergies);
        }
      }
    );
  }

  public listToString(allergies: String[]): String  {
    let field = '';
    for (const allergy of allergies) {
      field += allergy + ';';
    }
    return field;
  }

  public stringToList(field: String): String[] {
    if (field === '') {
      return [] as String[];
    }
    let list = field.split(';');
    list.splice(list.length - 1, 1);
    return list;
  }

  public add(value: String): void {
    if (value === '') {
      return;
    }
    this.toggleAdd();
    this.allergies.push(value);
    this.allergyForm = new FormControl('', [Validators.required]);
    this.updatePerson();
  }

  public delete(index: number): void {
    this.allergies.splice(index, 1);
    this.updatePerson();
  }

  public toggleAdd(): void {
    this.open = !this.open;
  }

  public updatePerson(): void {
    this.disadvantagedPerson.allergies = this.listToString(this.allergies);
    this.disadvantagedPersonService.updateDisadvantagedPerson(this.disadvantagedPerson).subscribe(
      () => this.dialog.open(SuccessModalComponent, {data: 'The allergy list was updated'}).afterClosed().subscribe(
        () => this.ngOnInit()
      ),
      () => this.dialog.open(ErrorModalComponent, {data: 'Could not update the allergy list'})
    );
  }


}
