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
export class ProductSkuService {

  constructor(private http:HttpClient, private _authService:AuthService) {
  }

  public findAllByProductId(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/merch/v2/secure/productSku/findAllByProductId', {params: params, headers: this._authService.getRequestHeaders(Keys.HTTP_FORM,true)})
      .pipe(

      );
  }

  public find(id:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/merch/v2/secure/productSku/find/'+id, { headers: this._authService.getRequestHeaders(Keys.HTTP_FORM,true)})
      .pipe(

      );
  }

  public save(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/merch/v2/secure/productSku/add',  params, {headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
      .pipe(

      );
  }

  public saveList(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/merch/v2/secure/productSku/saveList',  params, {headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
        .pipe(

        );
  }


  public delete(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/merch/v2/secure/productSku/delete/'+params,null, {headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
      .pipe(

      );
  }
}
