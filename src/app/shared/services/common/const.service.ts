/**
 * Created by hevan on 2018/5/21.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';

import { Keys } from '../../common/keys';
import { AuthService } from '../user/auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ConstService {

  constructor(private http:HttpClient, private _authService:AuthService) {
  }

  public genBillNo(billType):Observable<any> {

      const params = new HttpParams().set("billType", billType);

    return this.http.get(Keys.SERVER_URL + '/auth/v2/open/const/genBillNo', {params: params, headers: this._authService.getRequestHeaders(Keys.HTTP_FORM,false)})
      .pipe(

      );
  }

}
