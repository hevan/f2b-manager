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
export class AfterSaleService {

    constructor(private http:HttpClient, private _authService:AuthService) {
    }

    public pageQueryEx(params:any):Observable<any> {
        return this.http.get(Keys.SERVER_URL + '/finance/v2/secure/afterSale/pageQueryEx', {params: params, headers: this._authService.getRequestHeaders(Keys.HTTP_FORM,true)})
            .pipe(

            );
    }

    public pageQuery(params:any):Observable<any> {
        return this.http.get(Keys.SERVER_URL + '/finance/v2/secure/afterSale/pageQuery', {params: params, headers: this._authService.getRequestHeaders(Keys.HTTP_FORM,true)})
            .pipe(

            );
    }

    public find(id:any):Observable<any> {
        return this.http.get(Keys.SERVER_URL + '/finance/v2/secure/afterSale/find/'+id, { headers: this._authService.getRequestHeaders(Keys.HTTP_FORM,true)})
            .pipe(

            );
    }


    public updateStatus(params:any):Observable<any> {
        return this.http.post(Keys.SERVER_URL + '/finance/v2/secure/afterSale/updateStatus',  null, {params:params,headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
            .pipe(

            );
    }

    public save(params:any):Observable<any> {
        return this.http.post(Keys.SERVER_URL + '/finance/v2/secure/afterSale/add',  params, {headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
            .pipe(

            );
    }

    public refund(params:any):Observable<any> {
        return this.http.post(Keys.SERVER_URL + '/finance/v2/secure/afterSale/refundAndDeal',  null, {params:params,headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
            .pipe(

            );
    }

    public delete(params:any):Observable<any> {
        return this.http.post(Keys.SERVER_URL + '/finance/v2/secure/afterSale/delete/'+params,null, {headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
            .pipe(

            );
    }


}
