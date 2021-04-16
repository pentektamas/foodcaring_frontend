import {Injectable} from '@angular/core';
import {User} from '../interfaces/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL, REQUEST_HEADERS} from '../utils/http-constants';
import {UserCredentials} from '../models/user-credentials.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;

  constructor(private http: HttpClient) {

  }




  public login(userCredentials: UserCredentials): Observable<any> {
    return this.http.get<any>(BASE_URL + '/login', {headers: this.createLoginHeader(userCredentials)});
  }

  public readUser(): Observable<any> {
    return this.http.get<any>(BASE_URL + '/login', REQUEST_HEADERS);
  }

  public saveUserDetails(user: User): void {
    this.user = user;
  }

  public logout(): Observable<any> {
    return this.http.get<any>(BASE_URL + '/logout', REQUEST_HEADERS);
  }

  private createLoginHeader(userCredentials: UserCredentials): HttpHeaders {
    const authorizationValue = userCredentials ?
      ({authorization: 'Basic ' + btoa(userCredentials.username + ':' + userCredentials.password)}) : ({});
    return new HttpHeaders(authorizationValue);
  }
}
