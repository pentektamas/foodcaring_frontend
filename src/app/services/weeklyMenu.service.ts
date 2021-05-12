import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BASE_URL, REQUEST_HEADERS} from '../utils/http-constants';
import {Item} from '../models/item.model';
import { WeeklyMenu } from '../models/weeklyMenu.model';

@Injectable(
  {providedIn: 'root'}
)
export class WeeklyMenuService {

  constructor(public http: HttpClient) {
  }

  public getAll(): Observable<WeeklyMenu[]> {
    return this.http.get<WeeklyMenu[]>(BASE_URL + '/weeklyMenu', REQUEST_HEADERS);
  }

/*    public create(item:WeeklyMenu): Observable<WeeklyMenu> {
      return this.http.post<WeeklyMenu>(BASE_URL + '/weeklyMenu', item, REQUEST_HEADERS);
   } */

   public deleteWeeklyMenu(weeklyMenuId: String): Observable<any> {
     return this.http.delete<any>(BASE_URL + '/weeklyMenu/' + weeklyMenuId, REQUEST_HEADERS);
   }
}
