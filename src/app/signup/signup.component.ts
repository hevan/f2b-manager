import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import { routerTransition } from '../router.animations';
import {AuthService} from "../shared/services/user/auth.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    public registerForm: FormGroup;

    submitted = false;
    message = '';

    public tips = '获取验证码';
    public disabled = false;


    constructor(private fb: FormBuilder,private router: Router,private authService: AuthService) {
        this.createForm();
    }

    ngOnInit() {

    }

    createForm(){
        this.registerForm = this.fb.group({
            mobile: ['', [Validators.required, Validators.minLength(11),Validators.maxLength(11)]],
            veryCode: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        });
    }

    onSubmit() {
        this.message = '';
        this.submitted = true;
        const registerValue = this.registerForm.value;

        if(registerValue.password != registerValue.confirmPassword){
            this.message="前后密码不一致";
            return;
        }

        registerValue.registerChannel = 'f2b_manager';

        this.authService.register(JSON.stringify(registerValue)).subscribe(res=>{

            this.submitted = false;

            if(res.code == 0){
                this.router.navigate([ '/login']);
            }else{
                this.message = '注册失败，或用户已经存在';
            }
        });
    }

    getCode(event: any) {
        let number = 120;
        this.disabled = true;
        const that = this;
        that.tips = number + 's后重新获取';

        const registerValue = this.registerForm.value;

        if(registerValue.mobile){
            const params = new HttpParams().set('mobile', registerValue.mobile).set('templateCode','tmp_register');

           this.authService.sendMobileCode(params).subscribe(res=>{

           });
        }

        const timer = setInterval(function () {
            number --;
            if (number === 0) {
                that.disabled = false;
                that.tips = '获取验证码';
                clearInterval(timer);
            } else {
                that.tips = number + 's后重新获取';
            }
        }, 1000);

    }
}
