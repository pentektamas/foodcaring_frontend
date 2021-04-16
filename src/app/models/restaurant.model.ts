import {Menu} from './menu.model';

export class Restaurant {
  public id: String;
  public name: String;
  public location: String;
  public menus = [] as Menu[];
}
