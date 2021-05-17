import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {DisadvantagedPerson} from '../../../models/disadvantaged-person.model';
import {DisadvantagedPersonService} from '../../../services/disadvantaged-person.service';
import {Observable} from 'rxjs';
import {Menu} from "../../../models/menu.model";
import {SuccessModalComponent} from "../../modals/success-modal/success-modal.component";
import {ErrorModalComponent} from "../../modals/error-modal/error-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateMenuComponent} from "../../menu/create-menu/create-menu.component";
import {UpdateMenuComponent} from "../../menu/update-menu/update-menu.component";
import {UpdateDisadvantagedPersonComponent} from "../update-disadvantaged-person/update-disadvantaged-person.component";
import {CreateDisadvantagedPersonComponent} from "../create-disadvantaged-person/create-disadvantaged-person.component";

@Component({
  selector: 'app-disadvantaged-people-table',
  templateUrl: './disadvantaged-persons-table.component.html',
  styleUrls: ['./disadvantaged-persons-table.component.scss']
})
export class DisadvantagedPeopleTableComponent implements OnInit {

  public noDisadvantagedPersons = '';
  disadvantagedPersons: Set<DisadvantagedPerson>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<DisadvantagedPerson>;

  constructor(public dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef, private disadvantagedPersonService: DisadvantagedPersonService) {
  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();

    this.disadvantagedPersonService.getAll().subscribe(
      (data) => {
        this.disadvantagedPersons = new Set(data);
        this.dataSource = new MatTableDataSource<DisadvantagedPerson>(data);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        this.noDisadvantagedPersons = '';
      },
      () => this.noDisadvantagedPersons = 'It seems like there are no disadvantaged persons...'
    );
  }

  public add(): void {
    this.dialog.open(CreateDisadvantagedPersonComponent).afterClosed().subscribe(
      () => this.ngOnInit()
    );
  }

  public edit($event: MouseEvent, disadvantagedPerson: DisadvantagedPerson): void {
    this.dialog.open(UpdateDisadvantagedPersonComponent, {data: disadvantagedPerson}).afterClosed().subscribe(
      () => this.ngOnInit()
    );
  }

  public delete($event: MouseEvent, disadvantagedPerson: DisadvantagedPerson): void {
    this.disadvantagedPersonService.deleteDisadvantagedPerson(disadvantagedPerson.id).subscribe(
      () => {
        this.dialog.open(SuccessModalComponent, {data: `The disadvantaged person was deleted!`});
        this.ngOnInit();
      },
      () =>
        this.dialog.open(ErrorModalComponent, {data: `The disadvantaged person could not be deleted!`})
    );
  }

  refresh(): void {
    this.ngOnInit();
  }
}
