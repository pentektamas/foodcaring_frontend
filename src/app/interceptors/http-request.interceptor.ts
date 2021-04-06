import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Router} from "@angular/router";
import {UserService} from "../../../../../Facultate/an4sem1/ds2020_30642_ilies_andreea_1_frontend/src/app/services/security-services/user.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  public constructor(private router: Router, private userService: UserService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const clonedRequest =
      request.clone(
        {
          withCredentials: true,
          headers: request.headers.set('X-Requested-With', 'XMLHttpRequest')
        }
      );

    return next.handle(clonedRequest)
      .pipe(
        map((event: HttpEvent<any>) => {
          return event;
        }),
        catchError(error => {
          if (error.status === 401) {
             this.router.navigateByUrl('/forbidden');
          }
          return throwError(error);
        }));

  }
}
