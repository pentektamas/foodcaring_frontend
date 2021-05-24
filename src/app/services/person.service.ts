import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BASE_URL, REQUEST_HEADERS} from '../utils/http-constants';
import {User} from "../models/user.model";

@Injectable(
  {providedIn: 'root'}
)
export class PersonService {

  constructor(public http: HttpClient) {
  }

  public getInformation(role: String, username: String): Observable<User> {
    return this.http.get<User>(BASE_URL + '/person/' + role + '/' + username, REQUEST_HEADERS);
  }
}
