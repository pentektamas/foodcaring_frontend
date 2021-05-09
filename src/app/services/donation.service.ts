import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL, REQUEST_HEADERS} from '../utils/http-constants';
import {Observable} from 'rxjs';
import {DisadvantagedPerson} from '../models/disadvantaged-person.model';
import {Donation} from "../models/donation.model";

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(public http: HttpClient) {
  }

  public getAll(): Observable<Donation> {
    return this.http.get<Donation>(BASE_URL + '/donation', REQUEST_HEADERS);
  }

 public createDonation(donation: Donation): Observable<Donation> {
   return this.http.post<Donation>(BASE_URL + '/donation', donation, REQUEST_HEADERS);
 }
}
