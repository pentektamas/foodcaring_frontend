import {Observable} from 'rxjs';
import {Donation} from '../models/donation.model';
import {BASE_URL, REQUEST_HEADERS} from '../utils/http-constants';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Donor} from '../models/donor.model';

@Injectable(
  {providedIn: 'root'}
)
export class DonorService {

  constructor(public http: HttpClient) {
  }

  public getByUsername(username: String): Observable<Donor> {
    return this.http.get<Donor>(BASE_URL + '/donor/' + username, REQUEST_HEADERS);
  }
}
