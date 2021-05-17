import {Item} from './item.model';

export class Menu{
  id: String;
  name: String;
  itemList: Item[] = [];
  price: number;
  weekly: string;
}
