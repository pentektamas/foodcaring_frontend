import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {Restaurant} from '../../../models/restaurant.model';
import {SuccessModalComponent} from "../../modals/success-modal/success-modal.component";
import {ErrorModalComponent} from "../../modals/error-modal/error-modal.component";
import {WeeklyMenu} from 'src/app/models/weeklyMenu.model';
import {WeeklyMenuService} from 'src/app/services/weeklyMenu.service';
import {CreateWeeklyMenuComponent} from '../create-weekly-menu/create-weekly-menu.component';
import {RestaurantService} from "../../../services/restaurant.service";

@Component({
  selector: 'app-weekly-menu-table',
  templateUrl: './weekly-menu-table.component.html',
  styleUrls: ['./weekly-menu-table.component.scss']
})
export class WeeklyMenuTableComponent implements OnInit {

  public columnsToDisplay = ['name', 'itemList', 'startDate', 'endDate', 'discountPercent', 'price', 'options'];


  public restaurant: Restaurant;
  public weeklyMenu = [] as WeeklyMenu[];
  public dataSource: MatTableDataSource<WeeklyMenu>;

  public noRestaurants = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, public weeklyMenuService: WeeklyMenuService, public restaurantService: RestaurantService) {
  }

  ngOnInit(): void {
    this.restaurantService.getRestaurantForResponsible(localStorage.getItem('username')).subscribe(
      (restaurant) => {
        this.weeklyMenuService.getAllByRestaurant(restaurant.id).subscribe(
          (item) => {
            this.weeklyMenu = item;
            for (const menu of this.weeklyMenu) {
              menu.price = Math.round((menu.price + Number.EPSILON) * 100) / 100;
            }
            this.dataSource = new MatTableDataSource<WeeklyMenu>(this.weeklyMenu);
          },
          () => this.noRestaurants = 'It seems like this restaurant has no weekly menus... Add some!'
        );
      });
  }

  ngAfterViewInit(): void {

  }

  public add(): void {
    this.dialog.open(CreateWeeklyMenuComponent).afterClosed().subscribe(
      () => this.ngOnInit()
    );
  }

  public delete($event: MouseEvent, id: any): void {
    this.weeklyMenuService.deleteWeeklyMenu(id).subscribe(
      () => {
        this.dialog.open(SuccessModalComponent, {data: `The weekly menu was deleted!`});
        this.ngOnInit();
      },
      () =>
        this.dialog.open(ErrorModalComponent, {data: `The weekly menu could not be deleted!`})
    );
  }
}
