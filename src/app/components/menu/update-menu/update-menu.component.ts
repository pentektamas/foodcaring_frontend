import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../../../models/item.model';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MenuValidator} from '../../../validators/menu.validator';
import {map, startWith} from 'rxjs/operators';
import {Menu} from '../../../models/menu.model';

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
  @Input() public menu: Menu;
  @Output() public refresh = new EventEmitter<any>();

  public menuValidator: MenuValidator;

  constructor() {
    this.menuValidator = new MenuValidator();
    const item1 = new Item();
    item1.name = 'A';
    item1.description = 'desc1';
    item1.price = 1;
    const item2 = new Item();
    item2.name = 'B';
    item2.description = 'desc2';
    item2.price = 2;
    const item3 = new Item();
    item3.name = 'C';
    item3.description = 'desc3';
    item3.price = 3;
    this.allItems.add(item1);
    this.allItems.add(item2);
    this.allItems.add(item3);

  }

  ngOnInit(): void {
    this.menuValidator.init(this.menu);
    this.filteredItems = this.menuValidator.itemsForm.valueChanges.pipe(
      startWith(null),
      map((sideEffect: string | null) => sideEffect ? this.filterItems(sideEffect) :
        Array.from(this.allItems.values()).slice()));
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

  public updateMenu(): void{
    const menu = this.menuValidator.getMenu();
    menu.itemList = Array.from(this.selectedItems);
    console.log(menu);
    return;
  }

  public reload(): void {
    this.refresh.next();
  }
}
