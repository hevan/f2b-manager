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
export class CorpManageStoreService {

    constructor(private http:HttpClient, private _authService:AuthService) {
    }

    public findAllByManageCorp(params:any):Observable<any> {
        return this.http.get(Keys.SERVER_URL + '/merch/v2/secure/corpManageStore/findAllByManageCorpId', {params: params, headers: this._authService.getRequestHeaders(Keys.HTTP_FORM,true)})
            .pipe(

            );
    }


    public save(params:any):Observable<any> {
        return this.http.post(Keys.SERVER_URL + '/merch/v2/secure/corpManageStore/add',  params, {headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
            .pipe(

            );
    }

    public delete(params:any):Observable<any> {
        return this.http.get(Keys.SERVER_URL + '/merch/v2/secure/corpManageStore/deleteByCorpId', {params:params,headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
            .pipe(

            );
    }

}
