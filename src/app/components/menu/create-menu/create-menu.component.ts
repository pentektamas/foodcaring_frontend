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

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.scss']
})
export class CreateMenuComponent implements OnInit {

  filteredItems: Observable<Item[]>;
  allItems: Set<Item> = new Set<Item>();
  selectedItems: Set<Item> = new Set<Item>();

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  public menuValidator: MenuValidator;

  constructor(@Inject(MAT_DIALOG_DATA) public restaurantId: string, public dialog: MatDialog, public menuService: MenuService,
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

  }

  remove(sideEffect: Item): void {
    this.selectedItems.delete(sideEffect);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedItems.add(event.option.value);
    this.itemInput.nativeElement.value = '';
    this.menuValidator.itemsForm.setValue(null);
  }

  private filterItems(value: string): Item[] {
    const filterValue = value.toString().toLowerCase();

    return Array.from(this.allItems).filter(sideEffect => sideEffect.name.toLowerCase().indexOf(filterValue) === 0);
  }

  public addMenu(): void {
    const menu = this.menuValidator.getMenu();
    menu.itemList = Array.from(this.selectedItems);
    this.menuService.create(this.restaurantId, menu).subscribe(
      () => {
        this.dialog.closeAll();
        this.dialog.open(SuccessModalComponent, {data: `The menu was created!`});
      }
      , () => {
        this.dialog.open(ErrorModalComponent, {data: `The menu could not be created!`});
      });
  }
}
