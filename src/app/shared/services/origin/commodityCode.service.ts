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
export class CommodityCodeService {

  constructor(private http:HttpClient, private _authService:AuthService) {
  }

  public pageQuery(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/origin/v2/secure/commodityCode/pageQuery', {params: params, headers: this._authService.getRequestHeaders(Keys.HTTP_FORM,true)})
      .pipe(

      );
  }

  public findManageByCorpId(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/origin/v2/secure/commodityCode/findManageByCorpId', {params: params, headers: this._authService.getRequestHeaders(Keys.HTTP_FORM,true)})
        .pipe(

        );
  }

  public find(id:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/origin/v2/secure/commodityCode/find/'+id, { headers: this._authService.getRequestHeaders(Keys.HTTP_FORM,true)})
      .pipe(

      );
  }

  public save(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/origin/v2/secure/commodityCode/add',  params, {headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
      .pipe(

      );
  }

  public updateStatus(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/origin/v2/secure/commodityCode/updateStatus',  null, {params:params,headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
      .pipe(

      );
  }

  public delete(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/origin/v2/secure/commodityCode/delete/'+params,null, {headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
      .pipe(

      );
  }

  public addCorp(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/origin/v2/secure/commodityCode/addCorp',null, {params:params,headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
        .pipe(

        );
  }

  public deleteByCorpId(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/origin/v2/secure/commodityCode/deleteByCorpId',null, {params:params,headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
        .pipe(

        );
  }
}
