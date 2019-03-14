/**
 * Created by hevan on 2018/6/4.
 */
/**
 * Created by hevan on 2018/6/4.
 */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { routerTransition } from '../../../../router.animations';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { Keys   }    from '../../../../shared/common/keys';
import {UserProfileService} from "../../../../shared/services/user/profile.service";
import {AuthService} from "../../../../shared/services/user/auth.service";

@Component({
    selector: 'app-profile-profilew',
    templateUrl: './profileview.component.html',
    animations: [routerTransition()]
})
export class ProfileViewComponent implements OnInit {


    public userToken;//当前数据ID
    public userProfile:any;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private authService:AuthService, private userProfileService: UserProfileService) {

    }

    //页面初始化
    ngOnInit() {
        this.userToken = this.authService.getUserInfo();

        this.loadData();
    }

    loadData(){
        let params = new HttpParams().set('userId', this.userToken.user_id);

        this.userProfileService.findByUserId(params).subscribe(res=>{
            if(res.code == 0){

                this.userProfile = res.data;
            }

        });

    }


    goBack(){
        this.location.back();
    }
}
