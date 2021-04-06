import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {
  public urlAddress = 'http://localhost:8080';
}
