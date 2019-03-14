/**
 * Created by hevan on 2019/1/25.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Keys } from '../../common/keys';
import { AuthService } from '../user/auth.service';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class GroupDistributService {

    constructor(private http:HttpClient, private _authService:AuthService) {
    }


    public find(id:any):Observable<any> {
        return this.http.get(Keys.SERVER_URL + '/merch/v2/secure/groupDistribut/find/'+id, { headers: this._authService.getRequestHeaders(Keys.HTTP_FORM,true)})
            .pipe(

            );
    }


    public pageQuery(params:any):Observable<any> {
        return this.http.get(Keys.SERVER_URL + '/merch/v2/secure/groupDistribut/pageQuery', {params:params, headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
            .pipe(

            );
    }

}
