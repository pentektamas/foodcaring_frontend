import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL, REQUEST_HEADERS} from '../utils/http-constants';
import {Observable} from 'rxjs';
import {DisadvantagedPerson} from "../models/disadvantaged-person.model";

@Injectable({
  providedIn: 'root'
})
export class DisadvantagedPersonService {

  constructor(public http: HttpClient) {
  }

  public getAll(): Observable<DisadvantagedPerson[]> {
    return this.http.get<DisadvantagedPerson[]>(BASE_URL + '/disadvantagedPerson', REQUEST_HEADERS);
  }

  public getAllSorted(): Observable<DisadvantagedPerson[]> {
    return this.http.get<DisadvantagedPerson[]>(BASE_URL + '/disadvantagedPerson/sorted', REQUEST_HEADERS);
  }

  public updatePriorityOfDisadvantagedPerson(disadvantagedPersonID: String, priority: number): Observable<DisadvantagedPerson[]> {
    return this.http.put<DisadvantagedPerson[]>(BASE_URL + '/disadvantagedPerson/priority/' + disadvantagedPersonID + '/' + priority, REQUEST_HEADERS);
  }

  public updateDisadvantagedPerson(disadvantagedPerson: DisadvantagedPerson): Observable<DisadvantagedPerson> {
    return this.http.put<DisadvantagedPerson>(BASE_URL + '/disadvantagedPerson',disadvantagedPerson, REQUEST_HEADERS);
  }

  public deleteDisadvantagedPerson( disadvantagedPersonID: String): Observable<any> {
    return this.http.delete<any>(BASE_URL + '/disadvantagedPerson/' + disadvantagedPersonID, REQUEST_HEADERS);
  }

  public createDisadvantagedPerson(disadvantagedPerson: DisadvantagedPerson): Observable<any> {
    return this.http.post<any>(BASE_URL + '/disadvantagedPerson',disadvantagedPerson, REQUEST_HEADERS);
  }
}
