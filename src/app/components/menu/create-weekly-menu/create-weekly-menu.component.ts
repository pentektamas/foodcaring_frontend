import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu.service';
import { WeeklyMenu } from 'src/app/models/weeklyMenu.model';
import { Menu } from 'src/app/models/menu.model';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Restaurant } from 'src/app/models/restaurant.model';
import { WeeklyMenuService } from 'src/app/services/weeklyMenu.service';
import { SuccessModalComponent } from '../../modals/success-modal/success-modal.component';
import { ErrorModalComponent } from '../../modals/error-modal/error-modal.component';
@Component({
  selector: 'app-create-weekly-menu',
  templateUrl: './create-weekly-menu.component.html',
  styleUrls: ['./create-weekly-menu.component.scss']
})
export class CreateWeeklyMenuComponent implements OnInit {

  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  public addForm: FormGroup;
  public menus = [] as Menu[];
  public restaurants = [] as Restaurant[];
  constructor(public dialog: MatDialog,public week: MenuService,public restaurantService:RestaurantService,
    public weeklyMenuService:WeeklyMenuService) {
    this.addForm = new FormGroup({
      startDate: new FormControl('',[Validators.required]),
      endDate: new FormControl('',[Validators.required]),
      discountPercent: new FormControl('',[Validators.required]),
      id: new FormControl('',[Validators.required]),
      restaurantMenu:new FormControl('',[Validators.required]),
  });
}


get startDate(){
  return this.addForm.get('startDate')
}

get endDate(){
  return this.addForm.get('endDate')
}

get discountPercent(){
  return this.addForm.get('discountPercent')
}

get id(){
  return this.addForm.get('id')
}

get restaurantMenu(){
  return this.addForm.get('restaurantMenu')
}





get getIdRestaurant() {
  return this.addForm.get('id');
}

getItemFromRestaurant(){
  let idRestaurant=this.getIdRestaurant.value.id;
    for (let i = 0; i < this.restaurants.length ; i++) {
      if(idRestaurant===this.restaurants[i].id){
         this.menus=this.restaurants[i].menus;
         break;
      }
    }
}

  ngOnInit(): void {
    this.restaurantService.getAll().subscribe(
      (restaurants) => {
        this.restaurants = restaurants;
      },
      () =>{console.log("EROARE!")}
    );


  }


  addWeeklyMenu(value){

    let weeklyMenu:WeeklyMenu={
      name:value.restaurantMenu.name,
      startDate:value.startDate,
      endDate:value.endDate,
      discountPercent:value.discountPercent,
      itemList:value.restaurantMenu.itemList
    }
    let idRestaurant=this.getIdRestaurant.value.id;
    this.weeklyMenuService.create(idRestaurant,weeklyMenu).subscribe(
      () => {
        this.dialog.open(SuccessModalComponent, {data: `The weekly menu was created!`});
        this.ngOnInit();
      },
      () =>
        this.dialog.open(ErrorModalComponent, {data: `The weekly menu could not be created!`})
    ); 
  }

}




