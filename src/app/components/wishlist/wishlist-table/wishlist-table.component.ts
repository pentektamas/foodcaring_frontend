import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Item} from '../../../models/item.model';
import {Restaurant} from '../../../models/restaurant.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {MenuService} from '../../../services/menu.service';
import {Menu} from '../../../models/menu.model';
import {DisadvantagedPerson} from '../../../models/disadvantaged-person.model';
import {DisadvantagedPersonService} from '../../../services/disadvantaged-person.service';
import {ErrorModalComponent} from '../../modals/error-modal/error-modal.component';

@Component({
  selector: 'app-wishlist-table',
  templateUrl: './wishlist-table.component.html',
  styleUrls: ['./wishlist-table.component.scss']
})
export class WishlistTableComponent implements OnInit {

  public dataSource: MatTableDataSource<Menu>;
  public columnsToDisplay = ['name', 'itemList', 'wishlist'];


  public menus = [] as Menu[];

  public allMenus = [] as Menu[];
  public wishlist = [] as Menu[];
  public nonWishlist = [] as Menu[];

  public noMenus = '';

  public showWishlist = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public dialog: MatDialog, public menuService: MenuService, public disadvantagedPersonService: DisadvantagedPersonService) {
  }

  ngOnInit(): void {

    this.disadvantagedPersonService.getWishlist(localStorage.getItem('username')).subscribe(
      (menus) => {
        this.wishlist = menus;
        this.menuService.getAllNoRestaurant().subscribe(
          (all) => {
            this.allMenus = all;
            this.findNonWishlist();
            this.loadRightMenus();
          }
        );
      },
      () => this.noMenus = 'It seems like we have no items... '
    );
  }

  public changeShownMenus(): void {
    this.showWishlist = !this.showWishlist;
    this.loadRightMenus();
  }

  public loadRightMenus(): void {
    if (this.showWishlist) {
      this.dataSource = new MatTableDataSource<Menu>(this.wishlist);
    } else {
      this.dataSource = new MatTableDataSource<Menu>(this.nonWishlist);
    }
    this.dataSource.paginator = this.paginator;
  }

  public add($event: MouseEvent, element: Menu): void {
    this.disadvantagedPersonService.addWishlistItem(element, localStorage['username']).subscribe(
      (menus) => {
        this.wishlist = menus;
        this.ngOnInit();
      },
      () => this.dialog.open(ErrorModalComponent, {data: 'Could not add the menu to your wishlist!'})
    )
  }

  public remove($event: MouseEvent, element: Menu): void {
    this.disadvantagedPersonService.removeWishlistItem(element, localStorage['username']).subscribe(
      (menus) => {
        this.wishlist = menus;
        this.ngOnInit();
      },
      () => this.dialog.open(ErrorModalComponent, {data: 'Could not remove the menu from your wishlist!'})
    );
  }

  public findNonWishlist(): void {
      this.nonWishlist = [] as Menu[];
      for (const menu of this.allMenus) {
        let contained = false;
        for (const wished of this.wishlist) {
          if (wished.id === menu.id) {
            contained = true;
            break;
          }
        }
        if (contained === false) {
          this.nonWishlist.push(menu);
        }
      }
  }

}
