import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL, REQUEST_HEADERS} from '../utils/http-constants';
import {Observable} from 'rxjs';
import {DisadvantagedPerson} from '../models/disadvantaged-person.model';
import {Menu} from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class DisadvantagedPersonService {

  constructor(public http: HttpClient) {
  }

  public getAll(): Observable<DisadvantagedPerson[]> {
    return this.http.get<DisadvantagedPerson[]>(BASE_URL + '/disadvantagedPerson', REQUEST_HEADERS);
  }

  public getByUsername(username: String): Observable<DisadvantagedPerson> {
    return this.http.get<DisadvantagedPerson>(BASE_URL + '/disadvantagedPerson/username/' + username, REQUEST_HEADERS);
  }

  public getAllSorted(): Observable<DisadvantagedPerson[]> {
    return this.http.get<DisadvantagedPerson[]>(BASE_URL + '/disadvantagedPerson/sorted', REQUEST_HEADERS);
  }

  public updatePriorityOfDisadvantagedPerson(disadvantagedPersonID: String, priority: number): Observable<DisadvantagedPerson[]> {
    return this.http.put<DisadvantagedPerson[]>(BASE_URL + '/disadvantagedPerson/priority/' + disadvantagedPersonID + '/' + priority, REQUEST_HEADERS);
  }

  public updateDisadvantagedPerson(disadvantagedPerson: DisadvantagedPerson): Observable<DisadvantagedPerson> {
    return this.http.put<DisadvantagedPerson>(BASE_URL + '/disadvantagedPerson', disadvantagedPerson, REQUEST_HEADERS);
  }

  public deleteDisadvantagedPerson(disadvantagedPersonID: String): Observable<any> {
    return this.http.delete<any>(BASE_URL + '/disadvantagedPerson/' + disadvantagedPersonID, REQUEST_HEADERS);
  }

  public createDisadvantagedPerson(disadvantagedPerson: DisadvantagedPerson): Observable<any> {
    return this.http.post<any>(BASE_URL + '/disadvantagedPerson', disadvantagedPerson, REQUEST_HEADERS);
  }

  public addWishlistItem(menu: Menu, username: String): Observable<Menu[]> {
    return this.http.put<Menu[]>(BASE_URL + '/disadvantagedPerson/wishlist/append/' + username, menu, REQUEST_HEADERS);
  }

  public removeWishlistItem(menu: Menu, username: String): Observable<Menu[]> {
    return this.http.put<Menu[]>(BASE_URL + '/disadvantagedPerson/wishlist/remove/' + username, menu, REQUEST_HEADERS);
  }

  public getWishlist(username: String): Observable<Menu[]> {
    return this.http.get<Menu[]>(BASE_URL + '/disadvantagedPerson/wishlist/' + username, REQUEST_HEADERS);
  }

  public getUnHelpedDisadvantagedPersons(numberOfPersons: number): Observable<DisadvantagedPerson[]> {
    return this.http.get<DisadvantagedPerson[]>(BASE_URL + '/disadvantagedPerson/unhelped/' + numberOfPersons, REQUEST_HEADERS);
  }
}
