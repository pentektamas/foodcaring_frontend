import {Item} from './item.model';
import { Menu } from './menu.model';

export class WeeklyMenu{
  id?: String;
  name: String;
  itemList: Item[] = [];
  startDate:Date;
  endDate:Date;
  discountPercent:number;
  price?:number;
}
