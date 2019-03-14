import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';

import { Keys } from '../../common/keys';
import { AuthService } from '../user/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {

  constructor(private http:HttpClient,private _authService:AuthService) {
  }

  public findByUserId(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/auth/v2/secure/userProfile/findByUserId', {params:params, headers: this._authService.getRequestHeaders(Keys.HTTP_FORM,true)})
        .pipe(

        );
  }

  public save(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/auth/v2/secure/userProfile/save',  params, {headers: this._authService.getPostHeaders(Keys.HTTP_BODY,true)})
        .pipe(

        );
  }

}
