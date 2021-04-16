import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../interfaces/user.model';
import {EnvironmentUrlService} from './environment-url.service';
import {REQUEST_HEADERS} from '../utils/http-constants'

@Injectable({
    providedIn: 'root',
})
export class RepositoryService{
    removeLoggedUser(user: User): void {
      throw new Error('Method not implemented.');
    }


    constructor(public httpClient: HttpClient, public environmentUrlService: EnvironmentUrlService){
    }




    public login(body: any){
        return this.httpClient.post('http://localhost:8080/login', body,{observe:'response'});
    }

    public logout() {
        return this.httpClient.post("http://localhost:8080/logout", null);
    }

    public isLoggedIn(){
        if(localStorage.getItem('user') != null)
            return true;
        return false;
    }

    public register(route:string, body:any){
        let headers = new HttpHeaders();
        headers = headers.append('Cache-Control','no-cache',);
        headers = headers.append('Type','application/json',);
        headers = headers.append('Accept','application/json',);
        headers = headers.append('Access-Control-Allow-Origin','*',);
        return this.httpClient.post<any>(this.createCompleteRoute(route,this.environmentUrlService.urlAddress),body,{headers});
    }

    public getData(route: string, headers?: HttpHeaders){
        return this.httpClient.get(this.createCompleteRoute(route,this.environmentUrlService.urlAddress));
    }

    public create(route:string, body:any, headers?: HttpHeaders){

        return this.httpClient.post(this.createCompleteRoute(route,this.environmentUrlService.urlAddress),body);
    }

    public update(route:string, body:any,headers?:HttpHeaders){
        return this.httpClient.put(this.createCompleteRoute(route,this.environmentUrlService.urlAddress),body);
    }

    public delete(route:string,body?:any,headers?:HttpHeaders){
        if(body===undefined){
            return this.httpClient.delete(this.createCompleteRoute(route,this.environmentUrlService.urlAddress));

        }
        else
        {
            let token=localStorage.getItem('token');
            let headers = new HttpHeaders();
            //headers = headers.set('Authorization', token);
            return this.httpClient.request('delete',this.createCompleteRoute(route,this.environmentUrlService.urlAddress),{body:body, headers:headers},);
        }
    }


    public createCompleteRoute(route: string, envAddress: string) {
        return `${envAddress}/${route}`;
    }

}
