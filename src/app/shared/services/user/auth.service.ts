import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';

import { Keys } from '../../common/keys';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http:HttpClient) {
  }


  public getUserId = (): string => {
    let currentUser = localStorage.getItem(Keys.KEY_USER_INFO);
    if(currentUser) {
      let userToken = JSON.parse(currentUser);

       return userToken.id;
    }

    return '1';
  }

  public getUserInfo = (): any => {
    let currentUser = localStorage.getItem(Keys.KEY_USER_INFO);
    if(currentUser) {
      return JSON.parse(currentUser);
    }

    return null;
  }

  public getManagerInfo = (): any => {
    const currentManager = localStorage.getItem(Keys.KEY_MANGER_INFO);
    if(currentManager) {
      return JSON.parse(currentManager);
    }

    return null;
  }

  public getCorpInfo = (): any => {
    const currentCorp = localStorage.getItem(Keys.KEY_CORP_INFO);
    if(currentCorp) {
      return JSON.parse(currentCorp);
    }

    return null;
  }

  public getCorpInfoId = (): any => {
    const currentCorp = localStorage.getItem(Keys.KEY_CORP_INFO);
    if(currentCorp) {
      let data =  JSON.parse(currentCorp);
      return data.id;
    }

    return '';
  }

  public logout = (): void => {

    //登出
    let currentUser = localStorage.getItem(Keys.KEY_USER_INFO);
    if(currentUser !== null) {
      let userToken = JSON.parse(currentUser);

      let requestParam = new HttpParams();
      requestParam.set('id', userToken.id);

      let headersP = new HttpHeaders({ 'Authorization': 'Bearer '+userToken.access_token, 'Accept': 'application/json'});


      this.http.post(Keys.SERVER_URL+'/auth/oauth/logout','' ,{params:requestParam, headers:headersP})
        .subscribe((response: HttpResponse<any>) => {

        });

    }

    //清空缓存
    localStorage.removeItem(Keys.KEY_TOKEN);
    localStorage.removeItem(Keys.KEY_USER_INFO);
  }
z

  public login(mobile, password):Observable<any>{

    let loginRequest = 'username='+mobile+'&password='+password;

    let requestParam = new HttpParams().set('username', mobile).set('password',password);

    let headersParam = new HttpHeaders({ 'Content-Type':'application/x-www-form-urlencoded',  'Accept': 'application/json'});


    return this.http.post(Keys.SERVER_URL+'/auth/open/user/login',null,  { params:requestParam, headers: headersParam } )
      .pipe();
   }

    public register(params:any):Observable<any> {
        return this.http.post(Keys.SERVER_URL + '/auth/open/user/register',  params, {headers: this.getPostHeaders(Keys.HTTP_BODY,false)})
            .pipe(

            );
    }

  public add(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/auth/open/user/add',  params, {headers: this.getPostHeaders(Keys.HTTP_BODY,false)})
        .pipe(

        );
  }


  public sendMobileCode(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/auth/open/veryCode/mobile',  null, {params:params,headers: this.getPostHeaders(Keys.HTTP_BODY,false)})
        .pipe(

        );
  }

  public getRequestHeaders(httpType:string, isAuth: boolean){


    if(isAuth){
       let token =  localStorage.getItem(Keys.KEY_TOKEN);
        console.log('--2--2' + token);
      return new HttpHeaders({ 'Content-Type': httpType,'Accept': 'application/json','Authorization': 'Bearer ' +token });
    }else{
        console.log('--2--2');
      return new HttpHeaders({'Content-Type': httpType, 'Accept': 'application/json'});
    }

    //return new HttpHeaders({'Accept': 'application/json'});
  }


  public getPostHeaders(httpType:string, isAuth: boolean){

    if(isAuth){
      let token =  localStorage.getItem(Keys.KEY_TOKEN);
      console.log('token' + token);
      return new HttpHeaders({'Content-Type': httpType,'Accept': 'application/json','Authorization': 'Bearer ' +token});
    }else{
      return new HttpHeaders({'Content-Type': httpType,'Accept': 'application/json'});
    }

  }
}
