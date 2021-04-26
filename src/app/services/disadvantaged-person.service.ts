import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL, REQUEST_HEADERS} from '../utils/http-constants';
import {Observable} from 'rxjs';
import {DisadvantagedPerson} from '../models/disadvantaged-person.model';

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

  public update(disadvantagedPerson: DisadvantagedPerson): Observable<DisadvantagedPerson> {
    return this.http.put<DisadvantagedPerson>(BASE_URL + '/disadvantagedPerson', disadvantagedPerson, REQUEST_HEADERS);
  }
}
