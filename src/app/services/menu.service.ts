import {Injectable} from '@angular/core';
import {Menu} from '../models/menu.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BASE_URL, REQUEST_HEADERS} from '../utils/http-constants';
import {Restaurant} from "../models/restaurant.model";

@Injectable(
  {providedIn: 'root'}
)
export class MenuService {

  constructor(public http: HttpClient) {
  }

  public getAll(restaurantId: String): Observable<Menu[]> {
    return this.http.get<Menu[]>(BASE_URL + '/menu/restaurant/' + restaurantId, REQUEST_HEADERS);
  }

  public getAllMenusWithDiscounts(restaurantId: String): Observable<Menu[]> {
    return this.http.get<Menu[]>(BASE_URL + '/menu/all/'+restaurantId, REQUEST_HEADERS);
  }

  public getAllNoRestaurant(): Observable<Menu[]> {
    return this.http.get<Menu[]>(BASE_URL + '/menu', REQUEST_HEADERS);
  }

  public getById(menuId: String): Observable<Menu> {
    return this.http.get<Menu>(BASE_URL + '/menu/' + menuId, REQUEST_HEADERS);
  }

  public create(restaurantId: String, menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(BASE_URL + '/menu/' + restaurantId, menu, REQUEST_HEADERS);
  }

  public update(menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(BASE_URL + '/menu', menu, REQUEST_HEADERS);
  }

  public delete(menuId: String): Observable<any> {
    return this.http.delete<any>(BASE_URL + '/menu/' + menuId, REQUEST_HEADERS);
  }
}
