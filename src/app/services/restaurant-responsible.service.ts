import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BASE_URL, REQUEST_HEADERS} from '../utils/http-constants';
import {RestaurantResponsible} from '../models/restaurant-responsible.model';

@Injectable(
  {providedIn: 'root'}
)
export class RestaurantResponsibleService {

  constructor(public http: HttpClient) {
  }

  public create(restaurantResponsible: RestaurantResponsible): Observable<RestaurantResponsible> {
    return this.http.post<RestaurantResponsible>(BASE_URL + '/admin/responsible/insert', restaurantResponsible, REQUEST_HEADERS);
  }

  public update(restaurantResponsible: RestaurantResponsible): Observable<RestaurantResponsible> {
    return this.http.put<RestaurantResponsible>(BASE_URL + '/admin/responsible/update/' + restaurantResponsible.id,
      restaurantResponsible, REQUEST_HEADERS);
  }
}
