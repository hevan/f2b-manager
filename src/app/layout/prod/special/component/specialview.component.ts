/**
 * Created by hevan on 2018/6/4.
 */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { routerTransition } from '../../../../router.animations';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../../../shared/services/user/auth.service';
import {CorpService} from '../../../../shared/services/corp/corp.service';
import { Keys   }    from '../../../../shared/common/keys';
import {SpecialProductService} from "../../../../shared/services/prod/specialProduct.service";

@Component({
    selector: 'app-prod-specialview',
    templateUrl: './specialview.component.html',
    animations: [routerTransition()]
})
export class SpecialProductViewComponent implements OnInit {


    public curId;//当前数据ID
    public productData:any;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private specialProductService: SpecialProductService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');

        this.loadData();
    }

    loadData(){
        if(this.curId){
            this.specialProductService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.productData = res.data;
                }

            });
        }
    }


    //编辑
    toEdit(){
        this.router.navigate(['/prod/special/specialedit',{id:this.curId}]);
    }

    goBack(){
        this.location.back();
    }
}
