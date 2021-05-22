import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Item} from '../../../models/item.model';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import {MenuValidator} from '../../../validators/menu.validator';
import {MenuService} from '../../../services/menu.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ItemService} from '../../../services/item.service';
import {SuccessModalComponent} from '../../modals/success-modal/success-modal.component';
import {ErrorModalComponent} from '../../modals/error-modal/error-modal.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  public addForm: FormGroup;
  public imageSrc: string;
  constructor(public dialog: MatDialog,public itemService: ItemService,private formBuilder: FormBuilder) {
    this.addForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      image: this.formBuilder.array([]),
  });

}

  ngOnInit(): void {
  }

  public addItem(value){

    let product:Item={
      name:value.name,
      description:value.description,
      price:value.price,
      image:this.imageSrc
    }

    if (product.price < 0){
      this.dialog.open(ErrorModalComponent, {data: `The price of the item should be positive!`});
      return;
    }

    this.itemService.create(product).subscribe(
      () => {
        this.dialog.closeAll();
        this.dialog.open(SuccessModalComponent, {data: `The item was created!`});
      }
      , () => {
        this.dialog.open(ErrorModalComponent, {data: `The item could not be created!`});
      });

  }



  public detectFiles(event:any) {
    let me = this;
   let file = event.target.files[0];
   let reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = (e: any) => {
    this.imageSrc = e.target.result;
  };
}

}
