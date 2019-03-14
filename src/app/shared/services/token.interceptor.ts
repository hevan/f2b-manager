/**
 * Created by hevan on 2018/6/10.
 */
import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,BehaviorSubject,throwError } from 'rxjs';
import { Keys } from '../common/keys';

import { catchError,filter, take, switchMap, finalize } from "rxjs/operators";
import {AuthService} from "./user/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private injector: Injector,public authService: AuthService) { }

    private setAuthHeader(request) {
        const token = localStorage.getItem(Keys.KEY_TOKEN);
        if(token){
            return request.clone({ url: Keys.SERVER_URL + request.url, setHeaders: { Authorization: 'Bearer '+ token} });
        }else{
            return request;
        }

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(this.setAuthHeader(request))
            .pipe(
                catchError((error, ca) => {
                    if (error instanceof HttpErrorResponse) {
                        switch ((<HttpErrorResponse>error).status) {
                            case 401:
                                return this.handle401Error(request, next)
                            default:
                                return throwError(error);
                        }
                    } else {
                        return throwError(error);
                    }
                })
            )
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);

            const http = this.injector.get(HttpClient);
            const token = localStorage.getItem(Keys.KEY_TOKEN);
            return http.get('/auth/oauth/refreshToken', { headers: new HttpHeaders().set('Authorization', 'Bearer ' +token ) })
                .pipe(
                    switchMap((newToken: string) => {
                        if (newToken) {
                            localStorage.setItem(Keys.KEY_TOKEN,newToken);
                            this.tokenSubject.next(newToken)
                            return next.handle(this.setAuthHeader(req));
                        }

                        // If we don't get a new token, we are in trouble so logout.
                        this.authService.logout();
                        console.log('Could not refresh token 1')
                        let errorUser = {'name':'token','message':'Could not refresh token 1','stack':''};
                        return throwError(errorUser);
                    }),
                    catchError(error => {
                        // If there is an exception calling 'refreshToken', bad news so logout.
                        this.authService.logout();
                        console.log('Could not refresh token 2')

                        return throwError(error);
                    }),
                    finalize(() => {
                        this.isRefreshingToken = false;
                    })
                )
        } else {
            return this.tokenSubject
                .pipe(
                    filter(token => token != null),
                    take(1),
                    switchMap(token => {
                        return next.handle(this.setAuthHeader(req));
                    })
                )
        }
    }
}
