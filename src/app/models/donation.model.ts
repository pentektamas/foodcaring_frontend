import {Menu} from './menu.model';
import {Restaurant} from './restaurant.model';
import {DisadvantagedPerson} from './disadvantaged-person.model';

export class Donation{
  id: String;
  menu: Menu;
  restaurant: Restaurant;
  disadvantagedPersons: DisadvantagedPerson[] = [];
}
