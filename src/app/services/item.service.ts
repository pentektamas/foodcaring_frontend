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

   public create(item:Item): Observable<Item> {
      return this.http.post<Item>(BASE_URL + '/item', item, REQUEST_HEADERS);
   }

   public deleteItem(itemId: String): Observable<any> {
     return this.http.delete<any>(BASE_URL + '/item/' + itemId, REQUEST_HEADERS);
   }

   public update(item: Item): Observable<Item> {
    return this.http.put<Item>(BASE_URL + '/item', item, REQUEST_HEADERS);
  }


}
