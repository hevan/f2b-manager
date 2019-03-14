import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {AuthService} from "../shared/services/user/auth.service";
import {Keys} from "../shared/common/keys";
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';

import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';

import {CorpManagerService} from "../shared/services/corp/corpManager.service";

import {CorpService} from "../shared/services/corp/corp.service";



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    public loginForm:FormGroup;
    public password:string;

    public submitted =false;

    constructor(private fb:FormBuilder,public router: Router, private authService:AuthService, private corpManagerService:CorpManagerService,private corpService:CorpService,) {
        this.createForm();
    }

    ngOnInit() {}

    createForm(){
        this.loginForm = this.fb.group({
            mobile: ['', [Validators.required, Validators.minLength(11),Validators.maxLength(11)]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {

        this.submitted = true;
        const login = this.loginForm.value;


        this.authService.login(login.mobile,login.password).subscribe(res=>{
            if(res.code == 0){
                localStorage.setItem(Keys.KEY_TOKEN,res.data.access_token);
                localStorage.setItem(Keys.KEY_USER_INFO,JSON.stringify(res.data));

                this.checkCorp();
            }
        });


    }

    checkCorp(){
        let corpData = this.authService.getCorpInfo();

        console.log(corpData);

        if(null == corpData){

            let userMobile = localStorage.getItem(Keys.KEY_USER_INFO);
            if(null != userMobile){
                let userMobileData = JSON.parse(userMobile);
                let params = new HttpParams().set('mobile',userMobileData.mobile);

                this.corpManagerService.findByMobile(params).subscribe(res=>{
                    if(res.code == 0){

                        console.log(res.data);

                        if(res.data && res.data.length > 0){
                            let curManager = res.data[0];

                            localStorage.setItem(Keys.KEY_MANGER_INFO, JSON.stringify(res.data[0]));

                            this.loadCorp(curManager.corpId);

                        }else {
                            this.router.navigate([ '/dashboard']);
                        }

                    }
                });
            }
        }
    }

    loadCorp(id){

        this.corpService.find(id).subscribe(res=>{
            if(res.code == 0){
                if(res.data){
                    localStorage.setItem(Keys.KEY_CORP_INFO, JSON.stringify(res.data));

                    this.router.navigate([ '/dashboard']);
                }

            }
        });
    }
}
