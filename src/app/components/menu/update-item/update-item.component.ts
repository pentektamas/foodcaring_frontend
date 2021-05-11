import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../../../models/item.model';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MenuValidator} from '../../../validators/menu.validator';
import {map, startWith} from 'rxjs/operators';
import {Menu} from '../../../models/menu.model';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MenuService} from '../../../services/menu.service';
import {ItemService} from '../../../services/item.service';
import {SuccessModalComponent} from "../../modals/success-modal/success-modal.component";
import {ErrorModalComponent} from "../../modals/error-modal/error-modal.component";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {
  public updateForm: FormGroup;
  public imageSrc: string;

  constructor(@Inject(MAT_DIALOG_DATA) public item: Item, public dialog: MatDialog,private formBuilder: FormBuilder,public itemService: ItemService) {
    this.updateForm = new FormGroup({
      id:new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      image: this.formBuilder.array([]),
  });
   }

  ngOnInit(): void {

  }


  public updateItem(value){
      
    let product:Item={
      id:this.item.id,
      name:value.name,
      description:value.description,
      price:value.price,
      image:this.imageSrc
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
