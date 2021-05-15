import {Menu} from './menu.model';
import {Restaurant} from './restaurant.model';
import {DisadvantagedPerson} from './disadvantaged-person.model';
import {Donor} from './donor.model';

export class Donation {
  public id: String;
  public menu: Menu;
  public restaurant: Restaurant;
  public disadvantagedPersons = [] as DisadvantagedPerson[];
  public donor: Donor;
  public date: String;
}
