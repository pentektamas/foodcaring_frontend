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

@Component({
  selector: 'app-menu-table',
  templateUrl: './menu-table.component.html',
  styleUrls: ['./menu-table.component.scss']
})
export class MenuTableComponent implements OnInit, AfterViewInit {

  public dataSource: MatTableDataSource<Menu>;
  public columnsToDisplay = ['name', 'itemList', 'options'];

  public restaurant: Restaurant;
  public menus = [] as Menu[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, public menuService: MenuService, public restaurantService: RestaurantService) {
    this.restaurantService.getRestaurantForResponsible(localStorage.getItem('username')).subscribe(
      (restaurant) => {
        this.restaurant = restaurant;
        this.getAll();
      },
      () => console.log("No restaurants available")
    );
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Menu>(this.menus);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public getAll(): void {
    // this.menus = this.createMockMenus();
    this.menus = this.restaurant.menus;
    // this.menuService.getAll(this.restaurantId).subscribe(
    //   (menus) => this.menus = menus,
    //   () => console.log('open error modal')
    // );
  }

  public add(): void {
    console.log('add menu');
    // this.dialog.open(CreateMenuComponent, {data: this.restaurantId}).afterClosed().subscribe(
    //   () => this.ngOnInit()
    // );
  }

  public edit($event: MouseEvent, menu: Menu): void {
    console.log('edit menu');
    // this.dialog.open(EditMenuComponent, {data: menu}).afterClosed().subscribe(
    //   () => this.ngOnInit()
    // );
  }

  public delete($event: MouseEvent, menu: Menu): void {
    console.log('delete menu');
    this.menuService.delete(menu.id).subscribe(
      () => {
        console.log('open success modal');
        // .afterClosed().subscribe(
        //     //   () => this.ngOnInit()
        //     // );
      },
      () => console.log('open error dialog')
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
