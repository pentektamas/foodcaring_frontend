import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BASE_URL, REQUEST_HEADERS} from '../utils/http-constants';
import {Item} from '../models/item.model';

@Injectable(
  {providedIn: 'root'}
)
export class ItemService {

  constructor(public http: HttpClient) {
  }

  public getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(BASE_URL + '/item', REQUEST_HEADERS);
  }
  //
  // public getById(menuId: String): Observable<Menu> {
  //   return this.http.get<Menu>(BASE_URL + '/menu/' + menuId, REQUEST_HEADERS);
  // }
  //
  // public create(restaurantId: String, menu: Menu): Observable<Menu> {
  //   return this.http.post<Menu>(BASE_URL + '/menu/' + restaurantId, menu, REQUEST_HEADERS);
  // }
  //
  // public update(menu: Menu): Observable<Menu> {
  //   return this.http.put<Menu>(BASE_URL + '/menu', menu, REQUEST_HEADERS);
  // }
  //
   public deleteItem(itemId: String): Observable<any> {
     return this.http.delete<any>(BASE_URL + '/item/' + itemId, REQUEST_HEADERS);
   }
}
