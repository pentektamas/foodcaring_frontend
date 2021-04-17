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

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.scss']
})
export class UpdateMenuComponent implements OnInit {

  filteredItems: Observable<Item[]>;
  allItems: Set<Item> = new Set<Item>();
  selectedItems: Set<Item> = new Set<Item>();

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  public menuValidator: MenuValidator;

  constructor(@Inject(MAT_DIALOG_DATA) public menu: Menu, public dialog: MatDialog, public menuService: MenuService,
              public itemService: ItemService) {
    this.menuValidator = new MenuValidator();
    this.itemService.getAll().subscribe((data) => {
      this.allItems = new Set(data);
      this.filteredItems = this.menuValidator.itemsForm.valueChanges.pipe(
        startWith(null),
        map((item: string | null) => item ? this.filterItems(item) :
          Array.from(this.allItems.values()).slice()));
    });
  }

  ngOnInit(): void {
    this.menuValidator.init(this.menu);
    this.selectedItems = new Set(this.menu.itemList);
    this.filteredItems = this.menuValidator.itemsForm.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => item ? this.filterItems(item) :
        Array.from(this.allItems.values()).slice()));
  }

  remove(sideEffect: Item): void {
    this.selectedItems.delete(sideEffect);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let found = false;
    for (const item of this.selectedItems){
      if (item.id === event.option.value.id){
        found = true;
      }
    }
    if (found === false){
      this.selectedItems.add(event.option.value);
    }
    this.itemInput.nativeElement.value = '';
    this.menuValidator.itemsForm.setValue(null);
  }

  private filterItems(value: string): Item[] {
    const filterValue = value.toString().toLowerCase();
    return Array.from(this.allItems).filter(sideEffect => sideEffect.name.toLowerCase().indexOf(filterValue) === 0);
  }

  public updateMenu(): void{
    const menu = this.menuValidator.getMenuWithId(this.menu.id);
    menu.itemList = Array.from(this.selectedItems);
    this.menuService.update(menu).subscribe(
      () => {
        this.dialog.closeAll();
        this.dialog.open(SuccessModalComponent, {data: `The menu was updated!`});
      },
    () => this.dialog.open(ErrorModalComponent, {data: `The menu could not be updated!`})
    );
  }
}
