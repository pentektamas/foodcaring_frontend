import {Component, OnInit, ViewChild} from '@angular/core';
import {CreateMenuComponent} from '../../menu/create-menu/create-menu.component';
import {Menu} from '../../../models/menu.model';
import {UpdateMenuComponent} from '../../menu/update-menu/update-menu.component';
import {SuccessModalComponent} from '../../modals/success-modal/success-modal.component';
import {ErrorModalComponent} from '../../modals/error-modal/error-modal.component';
import {RestaurantResponsibleService} from '../../../services/restaurant-responsible.service';
import {MatDialog} from '@angular/material/dialog';
import {CreateRestaurantResponsibleComponent} from '../create-restaurant-responsible/create-restaurant-responsible.component';
import {UpdateRestaurantResponsibleComponent} from '../update-restaurant-responsible/update-restaurant-responsible.component';
import {RestaurantResponsible} from '../../../models/restaurant-responsible.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-restaurant-responsible-table',
  templateUrl: './restaurant-responsible-table.component.html',
  styleUrls: ['./restaurant-responsible-table.component.scss']
})
export class RestaurantResponsibleTableComponent implements OnInit {

  public dataSource: MatTableDataSource<RestaurantResponsible>;
  public columnsToDisplay = ['firstName', 'lastName', 'location', 'phoneNumber', 'restaurantName','options'];

  public responsibles = [] as RestaurantResponsible[];

  public noResponsibles = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public restaurantResponsibleService: RestaurantResponsibleService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.restaurantResponsibleService.getAll().subscribe(
      (data) => {
        this.responsibles = data;
        this.dataSource = new MatTableDataSource<RestaurantResponsible>(this.responsibles);
        this.dataSource.paginator = this.paginator;
        this.noResponsibles = '';
      },
      () => {
        this.noResponsibles = 'It seems like we don\'t have any restaurant responsibles at the moment!';
      }
    );
  }

  public add(): void {
    this.dialog.open(CreateRestaurantResponsibleComponent).afterClosed().subscribe(
      () => this.ngOnInit()
    );
  }

  public edit($event: MouseEvent, restaurantResponsible: RestaurantResponsible): void {
    this.dialog.open(UpdateRestaurantResponsibleComponent, {data: restaurantResponsible}).afterClosed().subscribe(
      () => this.ngOnInit()
    );
  }

  public delete($event: MouseEvent, restaurantResponsible: RestaurantResponsible): void {
    this.restaurantResponsibleService.delete(restaurantResponsible).subscribe(
      () => {
        this.dialog.open(SuccessModalComponent, {data: `The restaurant responsible was deleted!`});
        this.ngOnInit();
      },
      () =>
        this.dialog.open(ErrorModalComponent, {data: `The restaurant responsible could not be deleted!`})
    );
  }


}
