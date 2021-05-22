import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MenuService} from 'src/app/services/menu.service';
import {WeeklyMenu} from 'src/app/models/weeklyMenu.model';
import {Menu} from 'src/app/models/menu.model';
import {RestaurantService} from 'src/app/services/restaurant.service';
import {WeeklyMenuService} from 'src/app/services/weeklyMenu.service';
import {SuccessModalComponent} from '../../modals/success-modal/success-modal.component';
import {ErrorModalComponent} from '../../modals/error-modal/error-modal.component';

@Component({
  selector: 'app-create-weekly-menu',
  templateUrl: './create-weekly-menu.component.html',
  styleUrls: ['./create-weekly-menu.component.scss']
})
export class CreateWeeklyMenuComponent implements OnInit {

  public addForm: FormGroup;
  public menus = [] as Menu[];

  constructor(public dialog: MatDialog, public week: MenuService, public restaurantService: RestaurantService,
              public weeklyMenuService: WeeklyMenuService, public menuService: MenuService) {
    this.addForm = new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      discountPercent: new FormControl('', [Validators.required, Validators.min(0)]),
      id: new FormControl('', [Validators.required]),
      restaurantMenu: new FormControl('', [Validators.required]),
    });
    this.restaurantService.getRestaurantForResponsible(localStorage.getItem('username')).subscribe(
      (data) => {
        this.addForm.get('id').setValue(data.id);
        this.getMenusFromRestaurant();
      }
    );
  }


  get startDate() {
    return this.addForm.get('startDate');
  }

  get endDate() {
    return this.addForm.get('endDate');
  }

  get discountPercent() {
    return this.addForm.get('discountPercent');
  }

  get restaurantMenu() {
    return this.addForm.get('restaurantMenu');
  }

  get restaurantId() {
    return this.addForm.get('id');
  }

  getMenusFromRestaurant() {
    this.menuService.getAll(this.restaurantId.value).subscribe(
      (data) => {
        this.menus = data;
      },
      () => {
        this.dialog.open(ErrorModalComponent, {data: `The menus could not be displayed!`});
      }
    );
  }

  ngOnInit(): void {
  }


  addWeeklyMenu(value) {
    const weeklyMenu: WeeklyMenu = {
      name: value.restaurantMenu.name,
      startDate: value.startDate,
      endDate: value.endDate,
      discountPercent: value.discountPercent,
      itemList: value.restaurantMenu.itemList
    };
    this.weeklyMenuService.create(this.restaurantId.value, weeklyMenu).subscribe(
      () => {
        this.dialog.open(SuccessModalComponent, {data: `The weekly menu was created!`});
        this.ngOnInit();
      },
      () =>
        this.dialog.open(ErrorModalComponent, {data: `The weekly menu could not be created!`})
    );
  }

  public close(): void {
    this.dialog.closeAll();
  }
}




