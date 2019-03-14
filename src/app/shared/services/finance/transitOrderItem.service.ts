/**
 * Created by hevan on 2018/5/21.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Keys } from '../../common/keys';
import { AuthService } from '../user/auth.service';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class TransitOrderItemService {

    constructor(private http:HttpClient, private _authService:AuthService) {
    }

    public pageQuery(params:any):Observable<any> {
        return this.http.get(Keys.SERVER_URL + '/finance/v2/secure/transitOrderItem/pageQuery', {params: params, headers: this._authService.getRequestHeaders(Keys.HTTP_FORM,true)})
            .pipe(

            );
    }



}
