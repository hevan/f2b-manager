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
export class OriginCheckItemService {

  constructor(private http:HttpClient, private _authService:AuthService) {
  }



  public findAllByEntity(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/origin/v2/secure/originCheckItem/findAllByEntity', {params: params, headers: this._authService.getRequestHeaders(Keys.HTTP_FORM,true)})
        .pipe(

        );
  }

  public findAllCheck(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/origin/v2/secure/originCheckItem/findAllCheck', {params: params, headers: this._authService.getRequestHeaders(Keys.HTTP_FORM,true)})
        .pipe(

        );
  }

  public find(id:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/origin/v2/secure/originCheckItem/find/'+id, { headers: this._authService.getRequestHeaders(Keys.HTTP_FORM,true)})
      .pipe(

      );
  }

  public save(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/origin/v2/secure/originCheckItem/add',  params, {headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
      .pipe(

      );
  }

  public updateStatus(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/origin/v2/secure/originCheckItem/updateStatus','', {params:params,headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
        .pipe(

        );
  }

  public delete(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/origin/v2/secure/originCheckItem/delete/'+params,'', {headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
      .pipe(

      );
  }
}
