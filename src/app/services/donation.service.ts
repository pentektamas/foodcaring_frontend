import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Donation} from '../models/donation.model';
import {BASE_URL, REQUEST_HEADERS} from '../utils/http-constants';

@Injectable(
  {providedIn: 'root'}
)
export class DonationService {

  constructor(public http: HttpClient) {
  }

  public getAll(): Observable<Donation[]> {
    return this.http.get<Donation[]>(BASE_URL + '/donation', REQUEST_HEADERS);
  }

  public getAllDisadvantaged(username: String): Observable<Donation[]> {
    return this.http.get<Donation[]>(BASE_URL + '/donation/disadvantaged/' + username, REQUEST_HEADERS);
  }

  public getAllDonor(username: String): Observable<Donation[]> {
    return this.http.get<Donation[]>(BASE_URL + '/donation/donor/' + username, REQUEST_HEADERS);
  }

  public getById(donationId: String): Observable<Donation> {
    return this.http.get<Donation>(BASE_URL + '/donation/' + donationId, REQUEST_HEADERS);
  }

  public create(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(BASE_URL + '/donation', donation, REQUEST_HEADERS);
  }

  public update(donation: Donation): Observable<Donation> {
    return this.http.put<Donation>(BASE_URL + '/donation', donation, REQUEST_HEADERS);
  }

  public delete(donationId: String): Observable<any> {
    return this.http.delete<any>(BASE_URL + '/donation/' + donationId, REQUEST_HEADERS);
  }

  public cancel(donationId: String, username: String): Observable<any> {
    return this.http.delete<Donation>(BASE_URL + '/donation/cancel/' + username + '/' + donationId, REQUEST_HEADERS);
  }
}
