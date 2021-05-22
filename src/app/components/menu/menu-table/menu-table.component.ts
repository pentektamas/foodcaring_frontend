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
import {SuccessModalComponent} from '../../modals/success-modal/success-modal.component';
import {ErrorModalComponent} from '../../modals/error-modal/error-modal.component';

@Component({
  selector: 'app-menu-table',
  templateUrl: './menu-table.component.html',
  styleUrls: ['./menu-table.component.scss']
})
export class MenuTableComponent implements OnInit, AfterViewInit {

  public dataSource: MatTableDataSource<Menu>;
  public columnsToDisplay = ['name', 'itemList', 'price', 'options'];

  public restaurant: Restaurant;
  public menus = [] as Menu[];

  public noRestaurants = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, public menuService: MenuService, public restaurantService: RestaurantService) {
  }

  ngOnInit(): void {
    this.restaurantService.getRestaurantForResponsible(localStorage.getItem('username')).subscribe(
      (restaurant) => {
        this.restaurant = restaurant;
        this.menuService.getAll(restaurant.id).subscribe(
          (data) => {
            this.menus = data;
            for (const menu of data){
              menu.price = 0;
              for (const item of menu.itemList){
                menu.price += item.price;
              }
              menu.price = Math.round((menu.price + Number.EPSILON) * 100) / 100;
            }
            this.dataSource = new MatTableDataSource<Menu>(this.menus);
            this.dataSource.paginator = this.paginator;
          }
        );
        this.noRestaurants = '';
      },
      () => this.noRestaurants = 'It seems like this restaurant has no menus... Add some!'
    );
  }

  ngAfterViewInit(): void {

  }

  public add(): void {
    this.dialog.open(CreateMenuComponent, {data: this.restaurant.id}).afterClosed().subscribe(
      () => this.ngOnInit()
    );
  }

  public edit($event: MouseEvent, menu: Menu): void {
    this.dialog.open(UpdateMenuComponent, {data: menu}).afterClosed().subscribe(
      () => this.ngOnInit()
    );
  }

  public delete($event: MouseEvent, menu: Menu): void {
    this.restaurantService.deleteMenu(menu, this.restaurant).subscribe(
      () => {
        this.dialog.open(SuccessModalComponent, {data: `The menu was deleted!`});
        this.ngOnInit();
      },
      () =>
        this.dialog.open(ErrorModalComponent, {data: `The menu could not be deleted!`})
    );
  }

  private createMockMenus(): Menu[] {
    const menu1 = new Menu();
    menu1.name = 'Meniul Zilei';

    const item1 = new Item();
    item1.name = 'Ciorba de burta';
    item1.description = 'Ciorba facuta din burta si chestii si morcovi blaaaab blahsuudhskad sdqwidyqwdk wdqwudoqwuod wqydiqwydihqw qwouoqwuo';
    item1.price = 7.00;
    item1.image = IMG1;

    const item2 = new Item();
    item2.name = 'Schnitzel Vienez';
    item2.description = 'Din carne de porc';
    item2.price = 8.0;
    item2.image = IMG2;

    menu1.itemList.push(item1);
    menu1.itemList.push(item2);

    const menus = [] as Menu[];
    menus.push(menu1);
    menus.push(menu1);
    menus.push(menu1);

    return menus;
  }

}
