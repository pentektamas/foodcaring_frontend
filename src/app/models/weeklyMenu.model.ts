import {Item} from './item.model';

export class WeeklyMenu{
  id?: String;
  name: String;
  itemList: Item[] = [];
  startDate:Date;
  endDate:Date;
  discountPercent:number;
}
