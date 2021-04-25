
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Menu} from '../../../models/menu.model';
import {Item} from '../../../models/item.model';
import {IMG1, IMG2} from '../../../utils/image-samples.utils';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MenuService} from '../../../services/menu.service';
import {RestaurantService} from '../../../services/restaurant.service';
import {Restaurant} from '../../../models/restaurant.model';
import {CreateMenuComponent} from '../create-menu/create-menu.component';
import {UpdateMenuComponent} from '../update-menu/update-menu.component';
import {SuccessModalComponent} from "../../modals/success-modal/success-modal.component";
import {ErrorModalComponent} from "../../modals/error-modal/error-modal.component";
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-menu-item-table',
  templateUrl: './menu-item-table.component.html',
  styleUrls: ['./menu-item-table.component.scss']
})
export class MenuItemTableComponent implements OnInit {

  public dataSource: MatTableDataSource<Item>;
  public columnsToDisplay = ['image','name', 'description','price', 'options'];

  public restaurant: Restaurant;
  public items = [] as Item[];

  public noRestaurants = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, public itemService: ItemService) {
  }

  ngOnInit(): void {
    this.itemService.getAll().subscribe(
      (item) => {
        this.items = item;
        this.dataSource = new MatTableDataSource<Item>(this.items);
        this.dataSource.paginator = this.paginator;
      },
      () => this.noRestaurants = 'It seems like this restaurant has no menus... Add some!'
    );
  }

  ngAfterViewInit(): void {

  }

  public add(): void {
  }

  public delete($event: MouseEvent, id:any): void {
     this.itemService.deleteItem(id).subscribe(
      () => {
        this.dialog.open(SuccessModalComponent, {data: `The item was deleted!`});
        this.ngOnInit();
      },
      () =>
        this.dialog.open(ErrorModalComponent, {data: `The item could not be deleted!`})
    ); 
  }
}
