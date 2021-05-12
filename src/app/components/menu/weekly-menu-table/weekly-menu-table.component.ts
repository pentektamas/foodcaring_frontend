
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {Restaurant} from '../../../models/restaurant.model';
import {SuccessModalComponent} from "../../modals/success-modal/success-modal.component";
import {ErrorModalComponent} from "../../modals/error-modal/error-modal.component";
import { CreateItemComponent } from '../create-item/create-item.component';
import { WeeklyMenu } from 'src/app/models/weeklyMenu.model';
import { WeeklyMenuService } from 'src/app/services/weeklyMenu.service';

@Component({
  selector: 'app-weekly-menu-table',
  templateUrl: './weekly-menu-table.component.html',
  styleUrls: ['./weekly-menu-table.component.scss']
})
export class WeeklyMenuTableComponent implements OnInit {

  public columnsToDisplay = ['name', 'itemList','startDate', 'endDate','discountPercent','options'];


  public restaurant: Restaurant;
  public weeklyMenu = [] as WeeklyMenu[];
  public dataSource: MatTableDataSource<WeeklyMenu>;

  public noRestaurants = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, public weeklyMenuService: WeeklyMenuService) {
  }

  ngOnInit(): void {
    this.weeklyMenuService.getAll().subscribe(
      (item) => {
        this.weeklyMenu = item;
        this.dataSource = new MatTableDataSource<WeeklyMenu>(this.weeklyMenu);
      },
      () => this.noRestaurants = 'It seems like this restaurant has no weekly menus... Add some!'
    );
  }

  ngAfterViewInit(): void {

  }

  public add(): void {
    this.dialog.open(CreateItemComponent).afterClosed().subscribe(
      () => this.ngOnInit()
    );
  }

  public delete($event: MouseEvent, id:any): void {
    console.log(id);
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
