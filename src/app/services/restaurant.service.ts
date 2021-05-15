import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL, REQUEST_HEADERS} from '../utils/http-constants';
import { Restaurant } from '../models/restaurant.model';
import {Observable} from 'rxjs';
import {Menu} from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(public http: HttpClient) {}

  public getAll(): Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>(BASE_URL + '/restaurant', REQUEST_HEADERS);
  }

  
  public getRestaurantWithId(id:String): Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>(BASE_URL + '/restaurant/'+id, REQUEST_HEADERS);
  }

  public getRestaurantForResponsible(username: String): Observable<Restaurant> {
    return this.http.get<Restaurant>(BASE_URL + '/restaurant-responsible/' + username, REQUEST_HEADERS);
  }

  public deleteMenu(menu: Menu, restaurant: Restaurant): Observable<Restaurant> {
    const index = restaurant.menus.indexOf(menu, 0);
    if (index > -1) {
      restaurant.menus.splice(index, 1);
    }
    return this.http.put<Restaurant>(BASE_URL + '/restaurant', restaurant, REQUEST_HEADERS);
  }
}
