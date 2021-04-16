import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL, REQUEST_HEADERS} from '../utils/http-constants';
import { Restaurant } from '../models/restaurant.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(public http: HttpClient) {}

  public getRestaurantForResponsible(username: String): Observable<Restaurant> {
    return this.http.get<Restaurant>(BASE_URL + '/restaurant-responsible/' + username, REQUEST_HEADERS);
  }
}
